/**
 * Build script for dsh-sanrio-skin.
 *
 * - src/index.ts   -> lib/index.js    (host half, ESM, node platform)
 * - src/client.tsx -> lib/client.js   (browser half, wrapped in the
 *   window.__ModuleLoader__.load({ id, factory }) shape expected by
 *   dsh-client-modules at /plugins/<id>/client.js)
 *
 * The client bundle is CJS with react / @deepseek-ai/* left external —
 * those resolve at runtime against the DSH shell's module table.
 */
import { build } from "esbuild";
import { readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const id = pkg.name;

const common = {
  bundle: true,
  logLevel: "info",
  sourcemap: false
};

await build({
  ...common,
  entryPoints: [join(root, "src/index.ts")],
  format: "esm",
  platform: "node",
  outfile: join(root, "lib/index.js")
});

const tmpClient = join(root, "lib/client.bundle.cjs");
await build({
  ...common,
  entryPoints: [join(root, "src/client.tsx")],
  format: "cjs",
  platform: "browser",
  jsx: "automatic",
  external: ["react", "react/jsx-runtime", "@deepseek-ai/*"],
  outfile: tmpClient
});

const body = await readFile(tmpClient, "utf8");
const wrapped = `window.__ModuleLoader__.load({\n\tid: ${JSON.stringify(id)},\n\tfactory: (require) => {\n\t\tvar module = { exports: {} };\n\t\tvar exports = module.exports;\n\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });\n${body}\n\t\treturn module.exports;\n\t}\n});\n`;
await writeFile(join(root, "lib/client.js"), wrapped);
await rm(tmpClient);

console.log(`built ${id}: lib/index.js + lib/client.js`);
