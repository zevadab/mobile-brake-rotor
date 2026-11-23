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
    status.textContent = 'Thanks — your request is ready for connection to the business inbox. This demo does not send data yet.';
    status.classList.add('success');
    button.disabled = false;
    button.innerHTML = 'Request My Quote <span>↗</span>';
    form.reset();
  }, 700);
});
