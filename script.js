const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menu.addEventListener('click', () => {
 const open = nav.classList.toggle('open');
 menu.setAttribute('aria-expanded', String(open));
 menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
 nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('keydown', event => {
 if (event.key === 'Escape') { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); }
});

// Scroll position controls the illustration. Native scrolling is never intercepted.
const story = document.querySelector('.drive-story');
const stage = document.querySelector('.drive-stage');
const body = document.querySelector('.truck-body');
const wheel = document.querySelector('.front-wheel');
const brake = document.querySelector('.brake-unit');
const art = document.querySelector('.truck-art');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = n => Math.min(1, Math.max(0, n));
const phases = [
 ['Your place. Our tools.', 'Home, work, or an approved location.'],
 ['A closer look.', 'Wheel off. Brake condition reviewed.'],
 ['Pads. Rotors. Sorted.', 'Service confirmed for your vehicle.']
];
let frame = null;
function paintScene() {
 frame = null;
 const distance = story.offsetHeight - stage.offsetHeight;
 const top = parseFloat(getComputedStyle(stage).top) || 0;
 const progress = motion.matches ? 0 : clamp((top - story.getBoundingClientRect().top) / Math.max(1, distance));
 const separate = clamp((progress - .16) / .55);
 const reveal = clamp((progress - .48) / .4);
 wheel.style.transform = 'translate(' + (separate * -300) + 'px,' + (separate * -25) + 'px) rotate(' + (separate * -110) + 'deg)';
 body.style.opacity = 1 - reveal * .85;
 brake.style.transform = 'translate(' + (reveal * -110) + 'px,' + (reveal * -90) + 'px) scale(' + (1 + reveal * .75) + ')';
 art.style.transform = 'translateY(' + (-separate * 10) + 'px)';
 const phase = progress < .3 ? 0 : progress < .7 ? 1 : 2;
 document.querySelector('.scene-count').textContent = '0' + (phase + 1) + ' / 03';
 document.querySelector('#scene-title').textContent = phases[phase][0];
 document.querySelector('#scene-detail').textContent = phases[phase][1];
 document.querySelector('.progress-track i').style.width = progress * 100 + '%';
}
function queueScene() { if (frame === null) frame = requestAnimationFrame(paintScene); }
addEventListener('scroll', queueScene, {passive:true});
addEventListener('resize', queueScene);
motion.addEventListener('change', queueScene);
paintScene();

const booking = document.querySelector('#booking-dialog');
const contact = document.querySelector('#contact-dialog');
document.querySelectorAll('[data-open-booking]').forEach(button => button.addEventListener('click', () => booking.showModal()));
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => contact.showModal()));
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
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
 form.elements.service.value = link.dataset.service;
}));
const date = new Date();
form.elements.date.min = [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
form.elements.vehicleType.addEventListener('change', () => {
 document.querySelector('#fit-note').textContent = form.elements.vehicleType.value === 'Other'
 ? 'You can submit for review. Service for this vehicle is not guaranteed.'
 : 'Domestic vehicles are our focus. All vehicles are reviewed for service fit.';
});
let busy = false;
let lastSubmit = 0;
try { lastSubmit = Number(sessionStorage.getItem('quote-preview-time')) || 0; } catch {}
function error(message) { status.className = 'form-status error'; status.textContent = message; }
form.addEventListener('submit', event => {
 event.preventDefault();
 if (busy) return;
 status.className = 'form-status'; status.textContent = '';
 if (form.elements.website.value) return;
 if (Date.now() - lastSubmit < 60000) return error('Please wait one minute before previewing another request.');
 for (const input of form.querySelectorAll('input[type=text],input:not([type]),textarea')) {
  if (input.name !== 'website') input.value = input.value.trim();
 }
 const photo = form.elements.photo.files[0];
 if (photo && (!['image/jpeg','image/png','image/webp'].includes(photo.type) || photo.size > 5*1024*1024)) {
  return error('Choose one JPG, PNG or WebP photo no larger than 5 MB.');
 }
 if (!form.checkValidity()) { error('Check the required fields and acknowledgement.'); form.reportValidity(); return; }
 const year = Number(form.elements.year.value);
 if (year < 1900 || year > new Date().getFullYear()+1) return error('Enter a valid vehicle year.');
 const digits = form.elements.phone.value.replace(/\D/g,'');
 if (digits.length < 10 || digits.length > 15) return error('Enter a phone number with 10 to 15 digits.');
 busy = true;
 const submit = form.querySelector('[type=submit]');
 submit.disabled = true; submit.textContent = 'Checking details…';
 // Placeholder adapter: no network call and no customer data stored.
 setTimeout(() => {
  lastSubmit = Date.now();
  try { sessionStorage.setItem('quote-preview-time', String(lastSubmit)); } catch {}
  status.textContent = 'Preview complete. Your details are valid, but nothing was sent and no appointment was booked. Online requests are coming soon.';
  submit.disabled = false; submit.textContent = 'Preview my request'; busy = false;
 }, 400);
});
