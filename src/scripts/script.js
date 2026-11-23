const t = text => (window.SITE_MESSAGES || {})[text] || text;
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
document.documentElement.classList.add('has-js');
menu.addEventListener('click', () => {
 const open = nav.classList.toggle('open');
 menu.setAttribute('aria-expanded', String(open));
 menu.setAttribute('aria-label', open ? t('Close menu') : t('Open menu'));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
 nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', t('Open menu'));
}));
document.addEventListener('keydown', event => {
 if (event.key === 'Escape' && nav.classList.contains('open')) {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', t('Open menu'));
  menu.focus();
 }
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
