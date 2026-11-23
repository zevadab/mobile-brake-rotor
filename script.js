const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const form = document.querySelector('#quote-form');
const status = document.querySelector('.form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  status.className = 'form-status';

  const honeypot = form.elements.namedItem('website');
  const photo = form.elements.namedItem('photo');
  const lastSubmit = Number(window.localStorage.getItem('quote-submit-time') || 0);
  const cooldownMs = 60 * 1000;

  if (honeypot?.value) return;
  if (Date.now() - lastSubmit < cooldownMs) {
    status.textContent = 'Please wait about one minute before submitting another request.';
    status.classList.add('error');
    return;
  }
  if (photo?.files?.[0] && photo.files[0].size > 5 * 1024 * 1024) {
    status.textContent = 'Please choose a photo smaller than 5 MB.';
    status.classList.add('error');
    return;
  }
  if (!form.checkValidity()) {
    status.textContent = 'Please complete the required fields and confirm the contact request acknowledgement.';
    status.classList.add('error');
    form.reportValidity();
    return;
  }

  const button = form.querySelector('button');
  button.disabled = true;
  button.textContent = 'Sending request…';
  window.setTimeout(() => {
    window.localStorage.setItem('quote-submit-time', String(Date.now()));
    status.textContent = 'Thanks — your request is ready for connection to the business inbox. This demo does not send data yet.';
    status.classList.add('success');
    button.disabled = false;
    button.innerHTML = 'Request My Quote <span>↗</span>';
    form.reset();
  }, 700);
});
