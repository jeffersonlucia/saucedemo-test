import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const port = Number(process.env.PORT || 8080);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
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
    res.writeHead(200, {
      'content-type': types[extname(path)] ?? 'application/octet-stream',
      'cache-control': 'no-store',
    });
    res.end(body);
  } catch (error) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Arquivo nao encontrado');
  }
});

server.listen(port, () => {
  console.log(`Whiskey Club OS demo rodando em http://localhost:${port}`);
  console.log('Abra o navegador e teste Admin, Staff e Membro.');
});
