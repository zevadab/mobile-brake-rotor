import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';

test('deployed HTML pairs every stylesheet and script with its exact content', async () => {
 const html = await readFile('dist/index.html', 'utf8');
 const source = await readFile('index.html', 'utf8');
 for (const name of ['styles.css', 'script.js', 'site-config.js']) {
  const original = await readFile(name);
  const hash = createHash('sha256').update(original).digest('hex').slice(0, 16);
  const dot = name.lastIndexOf('.');
  const versioned = name.slice(0, dot) + '.' + hash + name.slice(dot);
  assert.ok(html.includes('"' + versioned + '"'));
  assert.ok(!html.includes('"' + name + '"'));
  assert.deepEqual(await readFile('dist/' + versioned), original);
  assert.ok(source.includes('"' + name + '"'), 'local source remains usable');
 }
 assert.match(html, /width=device-width, initial-scale=1/);
});

test('deployment includes only public website files', async () => {
 const permitted = /^(index\.html|es\.html|CNAME|robots\.txt|sitemap\.xml|assets|(?:styles|script|hero-motion|site-config|locale-es)(?:\.[a-f0-9]{16})?\.(?:css|js))$/;
 for (const name of await readdir('dist')) assert.match(name, permitted);
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
