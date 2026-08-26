/**
 * dsh-sanrio-skin — host half.
 *
 * Host-side responsibilities:
 *  - register a loopback-guarded route serving the decor assets from
 *    ./assets (mascot/peek/brandlogo/avatar/friends) so the browser half
 *    does not have to embed ~2 MB of base64 in the client bundle;
 *  - everything else lives in the browser half (`./client`), picked up by
 *    dsh-client-modules through the package's `dsh.client` declaration.
 *
 * The skin preference is persisted in localStorage because the Host settings
 * wire only exposes an allowlisted set of namespaces to browser clients
 * (dsh-host-apiproxy's WEB_SETTINGS_NAMESPACES).
 */
import { readFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { IncomingMessage, ServerResponse } from "node:http";

const inject = ["webServer"];

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp"
};

/** Loopback trust fence (same judgment dsh-ssh applies to its host routes). */
function isLoopbackRequest(request: IncomingMessage): boolean {
  const address = request.socket.remoteAddress;
  if (address !== "127.0.0.1" && address !== "::1" && address !== "::ffff:127.0.0.1") return false;
  const host = request.headers.host;
  if (typeof host !== "string") return false;
  let hostUrl: URL;
  try {
    hostUrl = new URL(`http://${host}`);
  } catch {
    return false;
  }
  if (hostUrl.hostname !== "127.0.0.1" && hostUrl.hostname !== "localhost" && hostUrl.hostname !== "[::1]") return false;
  if (request.headers["sec-fetch-site"] === "cross-site") return false;
  const origin = request.headers.origin;
  if (origin === undefined) return true;
  try {
    return new URL(origin).host === hostUrl.host;
  } catch {
    return false;
  }
}

/** Package assets directory (lib/index.js -> ../assets). */
const assetsDir = join(dirname(fileURLToPath(import.meta.url)), "..", "assets");

/**
 * Serve one asset: GET /sanrio-skin-assets/<name>. Only flat file names are
 * accepted (no subpaths, no traversal).
 */
function assetHandler(req: IncomingMessage, res: ServerResponse): void {
  if (!isLoopbackRequest(req)) {
    res.writeHead(403);
    res.end();
    return;
  }
  if (req.method !== "GET") {
    res.writeHead(405);
    res.end();
    return;
  }
  const url = new URL(req.url ?? "/", "http://x");
  const name = decodeURIComponent(url.pathname.replace(/^\/sanrio-skin-assets\//, ""));
  if (name === "" || name.includes("/") || name.includes("\\") || name.includes("..")) {
    res.writeHead(404);
    res.end();
    return;
  }
  const abs = resolve(assetsDir, name);
  if (relative(assetsDir, abs).startsWith("..")) {
    res.writeHead(404);
    res.end();
    return;
  }
  void readFile(abs)
    .then((data) => {
      const ext = name.slice(name.lastIndexOf(".")).toLowerCase();
      res.writeHead(200, {
        "content-type": MIME[ext] ?? "application/octet-stream",
        "content-length": data.length,
        "cache-control": "no-cache",
        "x-content-type-options": "nosniff"
      });
      res.end(data);
    })
    .catch(() => {
      res.writeHead(404);
      res.end();
    });
}

/**
 * Host loader entry: register the asset route. The feature itself lives in
 * the browser implementation exported from `./client`.
 */
export function apply(ctx: {
  webServer: {
    register: (route: {
      kind: "prefix" | "exact";
      path: string;
      handler: (req: IncomingMessage, res: ServerResponse) => void;
    }) => () => void;
  };
  effect: (fn: () => unknown, label?: string) => void;
}): void {
  ctx.effect(
    () =>
      ctx.webServer.register({
        kind: "prefix",
        path: "/sanrio-skin-assets",
        handler: assetHandler
      }),
    "dsh-sanrio-skin: asset routes"
  );
}

export { inject };
