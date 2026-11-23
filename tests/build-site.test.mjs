import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';

test('deployed HTML pairs every stylesheet and script with its exact content', async () => {
 const html = await readFile('dist/index.html', 'utf8');
 const source = await readFile('index.html', 'utf8');
 for (const name of ['styles.css', 'script.js', 'hero-motion.js', 'site-config.js']) {
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
 const permitted = /^(index\.html|CNAME|robots\.txt|sitemap\.xml|assets|(?:styles|script|hero-motion|site-config)(?:\.[a-f0-9]{16})?\.(?:css|js))$/;
 for (const name of await readdir('dist')) assert.match(name, permitted);
});
