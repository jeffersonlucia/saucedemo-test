import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8',
};

function safePath(urlPath) {
  const requested = urlPath === '/' ? '/index.html' : urlPath;
  const clean = normalize(decodeURIComponent(requested)).replace(/^(\.\.[/\\])+/, '');
  return join(root, clean);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://${req.headers.host}`);
    const path = safePath(url.pathname);
    const body = await readFile(path);
    res.writeHead(200, { 'content-type': types[extname(path)] ?? 'text/plain; charset=utf-8' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

try {
  const response = await fetch(`http://127.0.0.1:${port}/index.html`);
  const html = await response.text();
  const required = [
    'Whiskey Club OS - Demo Bar do Jao',
    'localStorage',
    'BDJ-R1-BRUNO',
    'mode === "staff"',
    'Produto Lab',
  ];
  const missing = required.filter((item) => !html.includes(item));
  if (!response.ok || missing.length > 0) {
    throw new Error(`Demo invalida. Missing: ${missing.join(', ')}`);
  }
  console.log('OK: demo browser servida e validada.');
} finally {
  server.close();
}
