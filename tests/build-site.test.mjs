import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';
import { resolve, relative } from 'node:path';

test('deployed HTML pairs every stylesheet and script with its exact content', async () => {
 const html = await readFile('dist/index.html', 'utf8');
 const source = await readFile('src/index.html', 'utf8');
 for (const [reference, name] of [
  ['styles/styles.css', 'styles.css'],
  ['scripts/script.js', 'script.js'],
  ['scripts/site-config.js', 'site-config.js']
 ]) {
  const original = await readFile('src/' + reference);
  const hash = createHash('sha256').update(original).digest('hex').slice(0, 16);
  const dot = name.lastIndexOf('.');
  const versioned = name.slice(0, dot) + '.' + hash + name.slice(dot);
  assert.ok(html.includes('"' + versioned + '"'));
  assert.ok(!html.includes('"' + name + '"'));
  assert.deepEqual(await readFile('dist/' + versioned), original);
  assert.ok(source.includes('"' + reference + '"'), 'source asset reference is mapped by the build');
 }
 assert.match(html, /width=device-width, initial-scale=1/);
});

test('deployment includes only public website files', async () => {
 const permitted = /^(index\.html|es\.html|CNAME|robots\.txt|sitemap\.xml|assets|(?:styles|script|site-config|locale-es)(?:\.[a-f0-9]{16})?\.(?:css|js))$/;
 for (const name of await readdir('dist')) assert.match(name, permitted);
 assert.deepEqual((await readdir('dist/assets')).sort(), ['brand', 'photography']);
 assert.ok((await readdir('dist/assets/photography')).every(name => name.endsWith('.webp')));
});

test('Spanish page has translated content and stable request values', async () => {
 const es = await readFile('dist/es.html', 'utf8');
 const en = await readFile('dist/index.html', 'utf8');
 assert.match(es, /<html lang="es">/);
 assert.match(es, /canonical" href="https:\/\/themobilebrakerotorguy.com\/es.html"/);
 assert.match(en, /hreflang="es"/);
 assert.match(es, /hreflang="en"/);
 assert.match(es, /<option value="Pads and rotors">Balatas y discos<\/option>/);
 assert.match(es, /<option value="es" selected>Español<\/option>/);
 assert.match(es, /Las solicitudes en línea aún no están activas/);
 assert.match(es, /Esto no confirma una cita/);
 assert.match(es, /locale-es\.[a-f0-9]{16}\.js/);
 for (const match of es.matchAll(/<script src="([^"]+)"/g)) {
  await readFile('dist/' + match[1]);
 }
 const names = html => [...html.matchAll(/(?:input|select|textarea)\b[^>]*\bname="([^"]+)"/g)].map(m => m[1]);
 assert.deepEqual(names(es), names(en));
 assert.ok(es.indexOf('locale-es.') < es.indexOf('<script src="script.'));
});

test('both pages reference only available local files', async () => {
 const directory = resolve('dist');
 for (const page of ['index.html', 'es.html']) {
  const html = await readFile('dist/' + page, 'utf8');
  const links = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map(match => match[1]);
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
   links.push(...match[1].split(',').map(candidate => candidate.trim().split(/\s+/)[0]));
  }
  for (const link of new Set(links)) {
   if (/^(?:[a-z]+:|\/\/|#)/i.test(link)) continue;
   const path = link.split(/[?#]/)[0];
   const file = resolve(directory, path === './' ? 'index.html' : path);
   assert.ok(!relative(directory, file).startsWith('..'), 'asset stays in deployment directory');
   await readFile(file);
  }
  assert.doesNotMatch(html, /(?:src|href)="(?:src|public|design|docs)\//);
  assert.doesNotMatch(html, /wheel-front|hero-motion/);
 }
});
