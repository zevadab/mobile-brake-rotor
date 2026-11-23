const t = text => (window.SITE_MESSAGES || {})[text] || text;
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menu.addEventListener('click', () => {
 const open = nav.classList.toggle('open');
 menu.setAttribute('aria-expanded', String(open));
 menu.setAttribute('aria-label', open ? t('Close menu') : t('Open menu'));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
 nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('keydown', event => {
 if (event.key === 'Escape') { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); }
});

// Restrained section reveals; content stays visible without JavaScript.
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const reveals = [...document.querySelectorAll('.section-heading,.price-card,.steps article,.personal-layout,.area-layout')];
let observer;
function configureMotion() {
 observer?.disconnect();
 reveals.forEach(element => element.classList.remove('reveal-pending'));
 if (motion.matches || !('IntersectionObserver' in window)) return;
 observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if (entry.isIntersecting) { entry.target.classList.remove('reveal-pending'); observer.unobserve(entry.target); }
  });
 }, {threshold: .08});
 reveals.forEach((element, index) => {
  if (element.getBoundingClientRect().top >= innerHeight) {
   element.style.setProperty('--reveal-delay', (index % 3) * 70 + 'ms');
   element.classList.add('reveal-pending'); observer.observe(element);
  }
 });
}
configureMotion();
motion.addEventListener('change', configureMotion);
const config = window.SITE_CONFIG || {};
const validPhone = value => /^\+[1-9]\d{7,14}$/.test(value || '');


const booking = document.querySelector('#booking-dialog');
const contact = document.querySelector('#contact-dialog');
document.querySelectorAll('[data-open-booking]').forEach(button => button.addEventListener('click', () => booking.showModal()));
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
 if (validPhone(config.phone)) location.href = (button.dataset.contact === 'Call' ? 'tel:' : 'sms:') + config.phone;
 else contact.showModal();
}));
if (validPhone(config.whatsapp)) {
 document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.hidden = false;
  link.href = 'https://wa.me/' + config.whatsapp.slice(1);
  link.target = '_blank'; link.rel = 'noopener noreferrer';
 });
}
if (config.email || config.phone) {
 document.querySelector('#business-contact').textContent = [config.phone, config.email].filter(Boolean).join(' · ');
}
document.querySelectorAll('dialog').forEach(dialog => {
 dialog.querySelectorAll('.dialog-close,.dialog-dismiss').forEach(button => button.addEventListener('click', () => dialog.close()));
 dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
 });
});
document.querySelector('#dialog-quote').addEventListener('click', () => {
 booking.close();
 requestAnimationFrame(() => document.querySelector('[name=year]').focus({preventScroll:true}));
});
const form = document.querySelector('#quote-form');
const status = document.querySelector('.form-status');
// Keep browser validation understandable even if the device UI is in English.
form.addEventListener('input', event => event.target.setCustomValidity?.(''));
form.addEventListener('change', event => event.target.setCustomValidity?.(''));
function localizeValidity() {
 for (const field of form.elements) {
  if (!field.setCustomValidity) continue;
  field.setCustomValidity('');
  if (document.documentElement.lang !== 'es' || field.validity.valid) continue;
  const invalid = field.validity;
  field.setCustomValidity(
   invalid.valueMissing ? (field.type === 'checkbox' ? 'Acepta las condiciones para continuar.' : 'Completa este campo.') :
   invalid.typeMismatch ? 'Ingresa un correo electrónico válido.' :
   invalid.rangeUnderflow ? 'Elige una fecha de hoy en adelante.' :
   'Revisa el formato de este campo.'
  );
 }
}
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
 form.elements.service.value = link.dataset.service;
}));
const pacificToday = () => new Intl.DateTimeFormat('en-CA', {timeZone:'America/Los_Angeles', year:'numeric', month:'2-digit', day:'2-digit'}).format(new Date());
form.elements.date.min = pacificToday();
const liveEndpoint = typeof config.requestEndpoint === 'string' && /^https:\/\//.test(config.requestEndpoint) ? config.requestEndpoint : null;
const submitButton = form.querySelector('[type=submit]');
if (liveEndpoint) {
 submitButton.textContent = t('Request my quote');
 document.querySelector('.preview-notice').textContent = t('Choose a preferred day. I’ll review your request and follow up by message. An appointment is confirmed only after we agree on a time.');
 document.querySelector('#booking-dialog .field-note').textContent = t('A preferred date is a request, not a confirmed appointment.');
}

form.elements.vehicleType.addEventListener('change', () => {
 document.querySelector('#fit-note').textContent = form.elements.vehicleType.value === 'Other'
 ? t('You can submit for review. Service for this vehicle is not guaranteed.')
 : t('Domestic vehicles are our focus. All vehicles are reviewed for service fit.');
});
let busy = false;
let lastSubmit = 0;
try { lastSubmit = Number(sessionStorage.getItem('quote-preview-time')) || 0; } catch {}
function error(message) { status.className = 'form-status error'; status.textContent = message; }
form.addEventListener('submit', async event => {
 event.preventDefault();
 if (busy) return;
 status.className = 'form-status'; status.textContent = '';
 if (form.elements.website.value) return;
 if (Date.now() - lastSubmit < 60000) return error(t('Please wait one minute before submitting another request.'));
 for (const input of form.querySelectorAll('input[type=text],input:not([type]),textarea')) {
  if (input.name !== 'website') input.value = input.value.trim();
 }
 const photo = form.elements.photo.files[0];
 if (photo && (!['image/jpeg','image/png','image/webp'].includes(photo.type) || photo.size > 5*1024*1024)) {
  return error(t('Choose one JPG, PNG or WebP photo no larger than 5 MB.'));
 }
 form.elements.date.min = pacificToday();
 localizeValidity();
 if (!form.checkValidity()) { error(t('Check the required fields and acknowledgement.')); form.reportValidity(); return; }
 const year = Number(form.elements.year.value);
 if (year < 1900 || year > new Date().getFullYear()+1) return error(t('Enter a valid vehicle year.'));
 const digits = form.elements.phone.value.replace(/\D/g,'');
 if (digits.length < 10 || digits.length > 15) return error(t('Enter a phone number with 10 to 15 digits.'));
 busy = true;
 submitButton.disabled = true;
 submitButton.textContent = liveEndpoint ? t('Sending request…') : t('Checking details…');
 try {
  if (liveEndpoint) {
   const payload = new FormData(form);
   payload.set('timeZone', 'America/Los_Angeles');
   payload.set('siteLanguage', document.documentElement.lang);
   const controller = new AbortController();
   const timeout = setTimeout(() => controller.abort(), 15000);
   let response;
   try {
    response = await fetch(liveEndpoint, {method:'POST', body:payload, signal:controller.signal, credentials:'omit'});
   } finally { clearTimeout(timeout); }
   if (!response.ok) throw new Error(response.status === 429 ? t('Too many requests. Please wait a few minutes and try again.') : t('Your request could not be confirmed. Your details are still here; please try again.'));
   const receipt = await response.json();
   if (receipt.received !== true) throw new Error(t('Delivery could not be confirmed. Please try again.'));
   status.textContent = t('Request received. I’ll review your details and message you about your quote and available times. Your appointment is not yet confirmed.');
   form.reset();
  } else {
   status.textContent = t('Preview complete. Your details are valid, but nothing was emailed or booked. Once online requests are connected, I’ll review each request and follow up by text.');
  }
  lastSubmit = Date.now();
  try { sessionStorage.setItem('quote-preview-time', String(lastSubmit)); } catch {}
 } catch (failure) {
  error(failure.name === 'AbortError' ? t('Confirmation timed out. Delivery is uncertain; please avoid immediately sending a duplicate.') :
   failure.name === 'TypeError' ? t('Unable to connect. Your details are still here. Please check your connection.') :
   failure.name === 'SyntaxError' ? t('Delivery could not be confirmed. Please try again.') : failure.message);
 } finally {
  submitButton.disabled = false;
  submitButton.textContent = liveEndpoint ? t('Request my quote') : t('Preview my request');
  busy = false;
 }
});
