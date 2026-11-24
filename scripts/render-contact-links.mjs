const escapeAttribute = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');

// Public destinations are validated during the build, then emitted as native links.
// Blank channels stay native disabled buttons, including without JavaScript.
export function contactDestinations(config) {
 const whatsapp = config.whatsapp?.trim() || '';
 const messenger = config.messengerUrl?.trim() || '';
 const whatsappNumber = /^\+[1-9]\d{7,14}$/.test(whatsapp);
 const whatsappShortLink = /^https:\/\/wa\.me\/message\/[A-Za-z0-9]+\/?$/.test(whatsapp);
 if (whatsapp && !whatsappNumber && !whatsappShortLink) {
  throw new Error('WhatsApp must use +country code and digits, or https://wa.me/message/BusinessCode.');
 }
 if (messenger) {
  const url = new URL(messenger);
  if (url.protocol !== 'https:' || url.hostname !== 'm.me' || url.port ||
      url.username || url.password || url.search || url.hash ||
      !/^\/[A-Za-z0-9._-]+\/?$/.test(url.pathname)) {
   throw new Error('Messenger must be a business chat URL: https://m.me/PageUsernameOrId');
  }
 }
 return { whatsapp: whatsappNumber ? 'https://wa.me/' + whatsapp.slice(1) : whatsapp, messenger };
}

export function renderContactLinks(html, config) {
 const destinations = contactDestinations(config);
 let rendered = html.replace(/<button\b([^>]*\bdata-message-channel="(whatsapp|messenger)"[^>]*)>([\s\S]*?)<\/button>/g,
  (button, attributes, channel, content) => {
   const destination = destinations[channel];
   if (!destination) return button;
   const linkAttributes = attributes.replace(/\s+type="button"|\s+disabled(?=\s|$)/g, '');
   const label = content.replace('data-message-state>Coming soon', 'data-message-state>Open chat');
   return '<a' + linkAttributes + ' href="' + escapeAttribute(destination) + '" target="_blank" rel="noopener noreferrer">' +
    label + '<span class="sr-only">(opens in a new tab)</span></a>';
  });
 // Service and estimate actions go straight to the first available business chat.
 const direct = destinations.whatsapp || destinations.messenger;
 if (direct) {
  rendered = rendered.replace(/<a\b([^>]*\bdata-direct-contact\b[^>]*)>([\s\S]*?)<\/a>/g,
   (_, attributes, content) => '<a' + attributes.replace('href="#contact"', 'href="' + escapeAttribute(direct) + '"') +
    ' target="_blank" rel="noopener noreferrer">' + content + '<span class="sr-only">(opens in a new tab)</span></a>');
 }
 return rendered;
}

export function renderGoogleReviewLink(html, config) {
 const value = config.googleReviewsUrl?.trim() || '';
 if (!value) return html.replace('<!-- GOOGLE_REVIEW_LINK -->', '');
 const url = new URL(value);
 const shortLink = ['share.google', 'maps.app.goo.gl'].includes(url.hostname) && /^\/[A-Za-z0-9]+\/?$/.test(url.pathname);
 const mapsLink = ['www.google.com', 'google.com'].includes(url.hostname) && /^\/maps(?:\/|$)/.test(url.pathname);
 const businessLink = url.hostname === 'g.page' && /^\/[A-Za-z0-9_-]+(?:\/review)?\/?$/.test(url.pathname);
 if (url.protocol !== 'https:' || url.username || url.password || url.port || url.hash ||
     !(shortLink || mapsLink || businessLink) || (shortLink && url.search)) {
  throw new Error('Use a Google Maps or Business Profile HTTPS share link.');
 }
 return html.replace('<!-- GOOGLE_REVIEW_LINK -->', '<a class="review-link" href="' + escapeAttribute(value) +
  '" target="_blank" rel="noopener noreferrer">Read Google reviews<span class="sr-only">(opens in a new tab)</span></a>');
}
