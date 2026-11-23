import { createHash } from 'node:crypto';
import { cp, lstat, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderSpanish } from './render-spanish.mjs';
import { runInNewContext } from 'node:vm';
import { renderContactLinks } from './render-contact-links.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destination = resolve(root, 'dist');
let html = await readFile(resolve(root, 'src/index.html'), 'utf8');
const spanish = JSON.parse(await readFile(resolve(root, 'src/i18n/es.json'), 'utf8'));
// Evaluate only our trusted, repository-owned public configuration, never visitor input.
const settings = { window: {} };
runInNewContext(await readFile(resolve(root, 'src/scripts/site-config.js'), 'utf8'), settings, { timeout: 1000 });
html = renderContactLinks(html, settings.window.SITE_CONFIG);
let esHtml = renderSpanish(html, spanish);

// Only clear this project's generated dist directory; refuse links or other paths.
if (relative(root, destination) !== 'dist') throw new Error('Unexpected build directory.');
const existing = await lstat(destination).catch(error => {
 if (error.code !== 'ENOENT') throw error;
});
if (existing && (!existing.isDirectory() || existing.isSymbolicLink())) {
 throw new Error('Build directory must be a real directory inside the project.');
}
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });

// Changed content gets a new URL, even when a phone or CDN retains older CSS.
// Keep stable copies for compatibility with tabs opened before this deployment.
for (const [reference, name] of [
 ['styles/styles.css', 'styles.css'],
 ['scripts/script.js', 'script.js'],
 ['scripts/site-config.js', 'site-config.js']
]) {
 const content = await readFile(resolve(root, 'src', reference));
 const hash = createHash('sha256').update(content).digest('hex').slice(0, 16);
 const dot = name.lastIndexOf('.');
 const versioned = name.slice(0, dot) + '.' + hash + name.slice(dot);
 if (!html.includes('"' + reference + '"')) throw new Error('Missing HTML reference: ' + reference);
 html = html.replaceAll('"' + reference + '"', '"' + versioned + '"');
 esHtml = esHtml.replaceAll('"' + reference + '"', '"' + versioned + '"');
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
 await cp(resolve(root, 'public', name), resolve(destination, name));
}
await cp(resolve(root, 'public/assets'), resolve(destination, 'assets'), { recursive: true });
await writeFile(resolve(destination, 'index.html'), html);
console.log('Built English and Spanish pages with content-versioned CSS and JavaScript.');
