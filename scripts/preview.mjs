import {createServer} from "node:http";
import {readFile, stat} from "node:fs/promises";
import {resolve, extname} from "node:path";
import {fileURLToPath} from "node:url";

try {process.loadEnvFile(".env.local")} catch(error) {if(error.code !== "ENOENT") throw error}
const output = fileURLToPath(new URL("../out/", import.meta.url));
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const portArg = process.argv.indexOf("--port");
const port = Number(portArg >= 0 ? process.argv[portArg + 1] : 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Choose a valid --port.");
const types = {".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".json":"application/json", ".txt":"text/plain; charset=utf-8", ".svg":"image/svg+xml", ".webp":"image/webp", ".woff2":"font/woff2", ".png":"image/png", ".ico":"image/x-icon"};
await stat(output).catch(() => {throw new Error("Run pnpm build before pnpm preview.")});
createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {response.writeHead(405); response.end(); return}
  try {
    let pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (base) {
      if (pathname !== base && !pathname.startsWith(base + "/")) {response.writeHead(404); response.end(); return}
      pathname = pathname.slice(base.length) || "/";
    }
    let target = resolve(output, "." + pathname);
    if (target !== output.slice(0, -1) && !target.startsWith(output)) throw new Error("Invalid path");
    if ((await stat(target)).isDirectory()) target = resolve(target, "index.html");
    const body = await readFile(target);
    response.writeHead(200, {"Content-Type":types[extname(target)] || "application/octet-stream", "Content-Length":body.length});
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    const body = await readFile(resolve(output, "404.html")).catch(() => Buffer.from("Not found"));
    response.writeHead(404, {"Content-Type":"text/html; charset=utf-8"}); response.end(request.method === "HEAD" ? undefined : body);
  }
}).listen(port, "127.0.0.1", () => console.log(`Oronix preview: http://127.0.0.1:${port}${base}/`));
