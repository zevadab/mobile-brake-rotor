import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destination = resolve(root, 'dist');
await mkdir(destination, { recursive: true });
let html = await readFile(resolve(root, 'index.html'), 'utf8');

// Changed content gets a new URL, even when a phone or CDN retains older CSS.
// Keep stable copies for compatibility with tabs opened before this deployment.
for (const name of ['styles.css', 'script.js', 'hero-motion.js', 'site-config.js']) {
 const content = await readFile(resolve(root, name));
 const hash = createHash('sha256').update(content).digest('hex').slice(0, 16);
 const dot = name.lastIndexOf('.');
 const versioned = name.slice(0, dot) + '.' + hash + name.slice(dot);
 if (!html.includes('"' + name + '"')) throw new Error('Missing HTML reference: ' + name);
 html = html.replaceAll('"' + name + '"', '"' + versioned + '"');
 await writeFile(resolve(destination, versioned), content);
 await writeFile(resolve(destination, name), content);
}

// Explicit public-file allowlist: repository notes, tests and credentials stay out.
for (const name of ['CNAME', 'robots.txt', 'sitemap.xml']) {
 await cp(resolve(root, name), resolve(destination, name));
}
await cp(resolve(root, 'assets'), resolve(destination, 'assets'), { recursive: true });
await writeFile(resolve(destination, 'index.html'), html);
console.log('Built dist/index.html with content-versioned CSS and JavaScript.');
