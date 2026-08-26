/**
 * Smoke tests that run WITHOUT a live DSH process — verifying the built
 * artifacts register correctly, apply() wires everything without throwing,
 * and the host asset route serves real bytes.
 *
 *   node scripts/smoke.mjs
 */
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let failures = 0;
const ok = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"} ${name}${extra ? " — " + extra : ""}`);
  if (!cond) failures += 1;
};

/* ------------------------------------------------------------------ */
/* Minimal DOM stubs so the browser-half apply() can run in node        */
/* ------------------------------------------------------------------ */

function fakeElement() {
  const el = {
    id: "",
    className: "",
    textContent: "",
    innerHTML: "",
    style: {
      setProperty() {},
      removeProperty() {},
      cssText: ""
    },
    dataset: {},
    children: [],
    isConnected: false,
    setAttribute() {},
    appendChild(child) {
      el.children.push(child);
      return child;
    },
    remove() {
      el.isConnected = false;
    },
    querySelectorAll() {
      return [];
    },
    getBoundingClientRect() {
      return { bottom: 0 };
    },
    addEventListener() {},
    removeEventListener() {}
  };
  return el;
}

globalThis.document = {
  createElement: () => fakeElement(),
  createTextNode: () => fakeElement(),
  head: fakeElement(),
  body: fakeElement(),
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  readyState: "complete"
};
globalThis.window = {
  matchMedia: () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {}
  })
};

/* ------------------------------------------------------------------ */
/* 1. client bundle: load factory, check exports                       */
/* ------------------------------------------------------------------ */

const client = await readFile(join(root, "lib/client.js"), "utf8");
let factory;
{
  const loader = { load: (def) => { factory = def.factory; } };
  globalThis.window.__ModuleLoader__ = loader;
  // eslint-disable-next-line no-new-func
  new Function("window", client)(globalThis.window);
}
ok("client: factory captured", typeof factory === "function");
const fakeRequire = (id) => {
  if (id === "react" || id === "react/jsx-runtime") return {};
  if (id === "@deepseek-ai/dsh-client-runtime/client") {
    return { defineStore: (decl) => ({ init: decl.init, actions: decl.actions }) };
  }
  return {};
};
const mod = factory(fakeRequire);
ok("client: factory returns { apply, inject }", typeof mod.apply === "function" && Array.isArray(mod.inject));
ok("client: inject = [slots, locale, theme]", JSON.stringify(mod.inject) === JSON.stringify(["slots", "locale", "theme"]), JSON.stringify(mod.inject));

/* ------------------------------------------------------------------ */
/* 2. client: apply() registers 10 themes, slots row, locale, no throw */
/* ------------------------------------------------------------------ */

const registrations = [];
const slotDecls = [];
const localeNs = [];
const changeHandlers = [];
const mediaListeners = [];
const ctx = {
  theme: {
    register: (def) => {
      registrations.push(def);
      return () => {};
    },
    getTheme: () => ({ preference: "system", revision: 0 }),
    setTheme: () => {}
  },
  slots: {
    inject: (name, registrar) => {
      registrar();
    },
    register: (decl, comp) => {
      slotDecls.push({ decl, comp });
      return () => {};
    }
  },
  locale: {
    register: (ns) => {
      localeNs.push(ns);
      return () => {};
    }
  },
  effect: (fn) => {
    const disposer = fn();
    if (typeof disposer === "function") disposer();
  },
  on: (event, handler) => {
    changeHandlers.push({ event, handler });
    return () => {};
  }
};
globalThis.window.matchMedia = () => ({
  matches: false,
  addEventListener: (ev, fn) => mediaListeners.push(fn),
  removeEventListener: () => {}
});

try {
  mod.apply(ctx);
  ok("apply(): ran without throwing", true);
} catch (error) {
  ok("apply(): ran without throwing", false, String(error));
}

const themeIds = registrations.map((t) => t.id).sort();
ok("apply(): 10 themes registered", registrations.length === 10, `count=${registrations.length}`);
const expected = [];
for (const c of ["kitty", "kuromi", "cinna", "melody", "pudding"]) {
  for (const m of ["light", "dark"]) expected.push(`sanrio-${c}-${m}`);
}
ok("apply(): theme ids complete", JSON.stringify(themeIds) === JSON.stringify(expected.sort()), themeIds.join(","));
ok("apply(): colorScheme matches mode", registrations.every((t) => t.colorScheme === t.id.split("-").pop()));
ok("apply(): every theme has tokens", registrations.every((t) => Object.keys(t.tokens).length > 10));
ok("apply(): pudding tokens are the fullest", registrations.find((t) => t.id === "sanrio-pudding-light")?.tokens["--shiki-token-constant"] === "#8a5a3a");
ok("apply(): skin tab registered", slotDecls.length === 1 && slotDecls[0].decl.name === "settings.plugins.tab" && slotDecls[0].decl.id === "sanrio");
ok("apply(): tab decl has store + locale + inject + label", typeof slotDecls[0]?.decl?.store === "object" && slotDecls[0]?.decl?.locale === "settings.sanrio" && typeof slotDecls[0]?.decl?.inject === "function" && typeof slotDecls[0]?.decl?.label === "function");
ok("apply(): tab order 5", slotDecls[0]?.decl?.order === 5);
ok("apply(): locale registered", JSON.stringify(localeNs) === JSON.stringify(["settings.sanrio"]));
ok("apply(): theme/change subscribed", changeHandlers.some((h) => h.event === "theme/change"));
ok("apply(): media listener installed (auto mode)", mediaListeners.length === 1);

/* ------------------------------------------------------------------ */
/* 3. host: apply registers the asset route                            */
/* ------------------------------------------------------------------ */

const host = await import(pathToFileURL(join(root, "lib/index.js")).href);
ok("host: exports apply + inject", typeof host.apply === "function" && Array.isArray(host.inject));
ok("host: inject = [webServer]", JSON.stringify(host.inject) === JSON.stringify(["webServer"]), JSON.stringify(host.inject));

const routes = [];
host.apply({
  webServer: {
    register: (route) => {
      routes.push(route);
      return () => {};
    }
  },
  effect: (fn) => fn()
});
ok("host: route registered", routes.length === 1, `count=${routes.length}`);
ok("host: route is prefix /sanrio-skin-assets", routes[0]?.kind === "prefix" && routes[0]?.path === "/sanrio-skin-assets");

/* ------------------------------------------------------------------ */
/* 4. host: asset handler serves real bytes (loopback)                 */
/* ------------------------------------------------------------------ */

const handler = routes[0]?.handler;
function fakeRes() {
  const res = { status: 0, headers: {}, data: null };
  res.writeHead = (status, headers) => {
    res.status = status;
    res.headers = headers;
  };
  res.end = (data) => {
    res.data = data;
  };
  return res;
}
const req = (url, extra = {}) => ({
  method: "GET",
  url,
  socket: { remoteAddress: "127.0.0.1" },
  headers: { host: "127.0.0.1:3080" },
  ...extra
});
const settle = (res) =>
  new Promise((resolve) => {
    const t = setInterval(() => {
      if (res.data !== null || res.status === 404 || res.status === 405) {
        clearInterval(t);
        resolve();
      }
    }, 20);
  });

{
  const res = fakeRes();
  handler(req("/sanrio-skin-assets/peek.png"), res);
  await settle(res);
  ok("asset: peek.png served 200 image/png", res.status === 200 && res.headers["content-type"] === "image/png", `status=${res.status}`);
  ok("asset: peek.png has real bytes", Buffer.isBuffer(res.data) && res.data.length > 100000, `len=${res.data?.length}`);
  ok(
    "asset: png magic",
    Buffer.isBuffer(res.data) &&
      res.data.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  );
}
{
  const res = fakeRes();
  handler(req("/sanrio-skin-assets/../package.json"), res);
  await settle(res);
  ok("asset: ../ traversal rejected 404", res.status === 404, `status=${res.status}`);
}
{
  const res = fakeRes();
  handler(req("/sanrio-skin-assets/mascot.gif", { method: "POST" }), res);
  await settle(res);
  ok("asset: POST rejected 405", res.status === 405, `status=${res.status}`);
}
{
  const res = fakeRes();
  handler(req("/sanrio-skin-assets/missing.png"), res);
  await settle(res);
  ok("asset: missing file 404", res.status === 404, `status=${res.status}`);
}

console.log(failures === 0 ? "\nALL SMOKE TESTS PASSED" : `\n${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
