import { readFile } from 'node:fs/promises';

const html = await readFile('index.html', 'utf8');
const start = html.indexOf('<script>');
const end = html.indexOf('</script>', start);

if (start === -1 || end === -1) {
  throw new Error('Script inline nao encontrado em index.html');
}

const script = html.slice(start + '<script>'.length, end);
new Function(script);
console.log('OK: JavaScript inline do index.html parseia.');
