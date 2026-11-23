import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderSpanish } from './render-spanish.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destination = resolve(root, 'dist');
await mkdir(destination, { recursive: true });
let html = await readFile(resolve(root, 'index.html'), 'utf8');
const spanish = JSON.parse(await readFile(resolve(root, 'i18n/es.json'), 'utf8'));
let esHtml = renderSpanish(html, spanish);

// Changed content gets a new URL, even when a phone or CDN retains older CSS.
// Keep stable copies for compatibility with tabs opened before this deployment.
for (const name of ['styles.css', 'script.js', 'hero-motion.js', 'site-config.js']) {
 const content = await readFile(resolve(root, name));
 const hash = createHash('sha256').update(content).digest('hex').slice(0, 16);
 const dot = name.lastIndexOf('.');
 const versioned = name.slice(0, dot) + '.' + hash + name.slice(dot);
 if (!html.includes('"' + name + '"')) throw new Error('Missing HTML reference: ' + name);
 html = html.replaceAll('"' + name + '"', '"' + versioned + '"');
 esHtml = esHtml.replaceAll('"' + name + '"', '"' + versioned + '"');
 await writeFile(resolve(destination, versioned), content);
 await writeFile(resolve(destination, name), content);
}

const messages = 'window.SITE_MESSAGES = ' + JSON.stringify(spanish) + ';\n';
const localeHash = createHash('sha256').update(messages).digest('hex').slice(0, 16);
const localeFile = 'locale-es.' + localeHash + '.js';
await writeFile(resolve(destination, localeFile), messages);
// Deferred scripts execute in order, so translations are ready before script.js.
esHtml = esHtml.replace(/<script src="site-config\./, '<script src="' + localeFile + '" defer></script>\n<script src="site-config.');
await writeFile(resolve(destination, 'es.html'), esHtml);

// Explicit public-file allowlist: repository notes, tests and credentials stay out.
for (const name of ['CNAME', 'robots.txt', 'sitemap.xml']) {
 await cp(resolve(root, name), resolve(destination, name));
}
await cp(resolve(root, 'assets'), resolve(destination, 'assets'), { recursive: true });
await writeFile(resolve(destination, 'index.html'), html);
console.log('Built English and Spanish pages with content-versioned CSS and JavaScript.');
