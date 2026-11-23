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
 return html.replace(/<button\b([^>]*\bdata-message-channel="(whatsapp|messenger)"[^>]*)>([\s\S]*?)<\/button>/g,
  (button, attributes, channel, content) => {
   const destination = destinations[channel];
   if (!destination) return button;
   const linkAttributes = attributes.replace(/\s+type="button"|\s+disabled(?=\s|$)/g, '');
   const label = content.replace('data-message-state>Coming soon', 'data-message-state>Open chat');
   return '<a' + linkAttributes + ' href="' + escapeAttribute(destination) + '" target="_blank" rel="noopener noreferrer">' +
    label + '<span class="sr-only">(opens in a new tab)</span></a>';
  });
}
