const decode = text => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const unchanged = new Set([
 '/ INLAND EMPIRE', 'Se habla español.', 'Español', 'WhatsApp',
 'Riverside', 'San Bernardino', 'Rialto', 'Fontana', 'Ontario', 'Rancho Cucamonga',
 'Colton', 'Bloomington', 'Moreno Valley', 'Jurupa Valley', 'Corona', 'Redlands',
 '© 2026 The Mobile Brake & Rotor Guy'
]);

// Controlled static template: translate text and accessible labels, never IDs,
// service values, URLs or scripts. Fail a build when new prose lacks translation.
export function renderSpanish(english, translations) {
 let html = english.replace(/<option>([^<]+)<\/option>/g, (_, text) =>
  '<option value="' + escape(decode(text)) + '">' + text + '</option>');
 const missing = new Set();
 html = html.split(/(<script\b[^>]*>[\s\S]*?<\/script>|<[^>]+>)/gi).map(part => {
  if (part.startsWith('<')) return part;
  const text = decode(part.trim());
  if (!text) return part;
  if (Object.hasOwn(translations, text)) return part.replace(part.trim(), escape(translations[text]));
  if (/[a-zA-Z]/.test(text) && !unchanged.has(text)) missing.add(text);
  return part;
 }).join('');
 if (missing.size) throw new Error('Missing Spanish translations: ' + [...missing].join(' | '));
 html = html.replace(/\b(alt|aria-label|placeholder|content)="([^"]*)"/g, (match, name, value) =>
  Object.hasOwn(translations, decode(value)) ? name + '="' + escape(translations[decode(value)]) + '"' : match);
 html = html.replace('<html lang="en">', '<html lang="es">')
  .replace('<link rel="canonical" href="https://themobilebrakerotorguy.com/">', '<link rel="canonical" href="https://themobilebrakerotorguy.com/es.html">')
  .replace('<meta property="og:url" content="https://themobilebrakerotorguy.com/">', '<meta property="og:url" content="https://themobilebrakerotorguy.com/es.html">')
  .replace(/<a class="language-switch"[^>]*>[^<]*<\/a>/, '<a class="language-switch" href="./" lang="en" hreflang="en" aria-label="View this site in English">English</a>')
  .replace('<option value="es">', '<option value="es" selected>');
 html = html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/, (_, open, json, close) => {
  const data = JSON.parse(json);
  data.description = translations[data.description];
  return open + JSON.stringify(data) + close;
 });
 return html;
}
