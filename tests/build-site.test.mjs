import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';
import { contactDestinations, renderContactLinks } from '../scripts/render-contact-links.mjs';
import { renderSpanish } from '../scripts/render-spanish.mjs';
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

test('Spanish page has translated messaging and language metadata', async () => {
 const es = await readFile('dist/es.html', 'utf8');
 const en = await readFile('dist/index.html', 'utf8');
 assert.match(es, /<html lang="es">/);
 assert.match(es, /canonical" href="https:\/\/themobilebrakerotorguy.com\/es.html"/);
 assert.match(en, /hreflang="es"/);
 assert.match(es, /hreflang="en"/);
 assert.match(es, /Próximamente/);
 assert.match(es, /Escríbeme/);
 assert.match(es, /no confirma una cita/);
 assert.match(es, /locale-es\.[a-f0-9]{16}\.js/);
 for (const match of es.matchAll(/<script src="([^"]+)"/g)) {
  await readFile('dist/' + match[1]);
 }

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

test('both pages have chat actions and no remaining intake UI or endpoint', async () => {
 for (const page of ['index.html', 'es.html']) {
  const html = await readFile('dist/' + page, 'utf8');
  assert.doesNotMatch(html, /<(?:form|input|textarea|select|dialog)\b|href="#quote"|data-open-booking/);
  assert.equal([...html.matchAll(/data-message-channel=/g)].length, 6);
  const hero = html.slice(html.indexOf('<section class="owner-hero"'), html.indexOf('<section class="fit-strip"'));
  assert.match(hero, /data-message-channel="whatsapp"/);
  assert.match(hero, /data-message-channel="messenger"/);
 }
 const runtime = await readFile('src/scripts/script.js', 'utf8');
 assert.doesNotMatch(runtime, /fetch\(|localStorage|sessionStorage|requestEndpoint|quote-form/);
});

test('unconfigured channels are disabled, individually configured channels become native links', async () => {
 const template = await readFile('src/index.html', 'utf8');
 const empty = renderContactLinks(template, {whatsapp: '', messengerUrl: ''});
 assert.equal(empty, template);
 assert.equal([...empty.matchAll(/data-message-channel="(?:whatsapp|messenger)" type="button" disabled/g)].length, 6);
 for (const config of [
  {whatsapp: '+12025550123'},
  {whatsapp: 'https://wa.me/message/TLXNPSOKQA2ZN1'},
  {messengerUrl: 'https://m.me/ExampleBusiness'},
  {whatsapp: '+12025550123', messengerUrl: 'https://m.me/123456789'}
 ]) {
  const html = renderContactLinks(template, config);
  const links = [...html.matchAll(/<a([^>]*data-message-channel="([^"]+)"[^>]*)>/g)];
  assert.equal(links.length, (config.whatsapp && config.messengerUrl) ? 6 : 3);
  for (const [, attributes, channel] of links) {
   assert.doesNotMatch(attributes, /disabled|type=/);
   assert.match(attributes, /target="_blank" rel="noopener noreferrer"/);
   assert.ok(attributes.includes('href="' + contactDestinations(config)[channel] + '"'));
  }
  const translations = JSON.parse(await readFile('src/i18n/es.json', 'utf8'));
  const es = renderSpanish(html, translations);
  assert.match(es, /Abrir chat/);
  assert.match(es, /se abre en una pestaña nueva/);
  if (!(config.whatsapp && config.messengerUrl)) assert.match(es, /Próximamente/);
 }
});

test('configuration refuses malformed numbers and non-business-chat destinations', () => {
 assert.deepEqual(contactDestinations({whatsapp:' +12025550123 ',messengerUrl:' https://m.me/My.Business/ '}), {
  whatsapp:'https://wa.me/12025550123', messenger:'https://m.me/My.Business/'
 });
 for (const whatsapp of ['5551234', '+1 202 555 0123', '+02025550123', '+1202555012345678']) {
  assert.throws(() => contactDestinations({whatsapp}));
 }
 assert.equal(contactDestinations({whatsapp:'https://wa.me/message/TLXNPSOKQA2ZN1'}).whatsapp,
  'https://wa.me/message/TLXNPSOKQA2ZN1');
 for (const whatsapp of ['http://wa.me/message/CODE', 'https://wa.me.evil.com/message/CODE',
  'https://wa.me@evil.com/message/CODE', 'https://user:pass@wa.me/message/CODE',
  'https://wa.me/message/', 'https://wa.me/message/CODE/extra', 'https://wa.me/message/../evil',
  'https://wa.me/message/CODE?redirect=https://evil.com', 'https://wa.me/message/CODE#extra',
  'javascript:alert(1)']) {
  assert.throws(() => contactDestinations({whatsapp}));
 }
 for (const messengerUrl of ['javascript:alert(1)', 'http://m.me/example', 'https://m.me.evil.com/page',
  'https://m.me@evil.com/page', 'https://user:pass@m.me/page', 'https://m.me/', 'https://m.me/page/other',
  'https://m.me/page?redirect=https://evil.com', 'https://m.me/page#extra', 'https://m.me:444/page']) {
  assert.throws(() => contactDestinations({messengerUrl}));
 }
});
