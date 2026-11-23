// Native scrolling controls the scene. No scroll interception or autoplay loop.
(() => {
 const story = document.querySelector('.wheel-story');
 if (!story) return;
 const stage = story.querySelector('.wheel-stage');
 const wheel = story.querySelector('.wheel-object');
 const brake = story.querySelector('.story-brake');
 const driveway = story.querySelector('.story-driveway');
 const copy = [...story.querySelectorAll('.story-copy')];
 const progress = story.querySelector('.story-progress > span');
 const count = story.querySelector('.story-count');
 const header = document.querySelector('.site-header');
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 let frame = 0;
 let travel = 1;
 let top = 0;
 let headerHeight = 0;
 const clamp = value => Math.min(1, Math.max(0, value));
 const ease = (value, start, end) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
 };
 function draw() {
  frame = 0;
  if (reduced.matches) return;
  const p = clamp((scrollY - top + headerHeight) / travel);
  const reveal = ease(p, .12, .44);
  const arrive = ease(p, .60, .87);
  const exitWheel = ease(p, .22, .43);
  wheel.style.transform = `translate(-50%, -50%) translateX(${-reveal * 10}%) scale(${1 + reveal * 1.3})`;
  wheel.style.opacity = 1 - exitWheel;
  brake.style.clipPath = `circle(${reveal * 110}% at 57% 46%)`;
  brake.style.transform = `scale(${1.14 - reveal * .14})`;
  brake.style.opacity = 1 - ease(p, .85, .95);
  driveway.style.clipPath = `inset(0 0 0 ${(1 - arrive) * 100}%)`;
  driveway.style.transform = `scale(${1.06 - arrive * .06})`;
  const first = 1 - ease(p, .16, .29);
  const second = ease(p, .30, .43) * (1 - ease(p, .62, .72));
  const third = ease(p, .73, .87);
  [first, second, third].forEach((opacity, index) => {
   copy[index].style.opacity = opacity;
   copy[index].style.transform = `translateY(${(1 - opacity) * 20}px)`;
  });
  story.style.setProperty('--scene-progress', p);
  story.querySelector('.story-label').style.opacity = 1 - reveal;
  progress.style.transform = `scaleX(${p})`;
  count.textContent = `${p < .32 ? '01' : p < .73 ? '02' : '03'} — 03`;
 }
 function schedule() {
  if (!frame && !reduced.matches) frame = requestAnimationFrame(draw);
 }
 function measure() {
  headerHeight = header.getBoundingClientRect().height;
  story.style.setProperty('--story-header', `${headerHeight}px`);
  top = story.getBoundingClientRect().top + scrollY;
  travel = Math.max(1, story.offsetHeight - stage.offsetHeight);
  schedule();
 }
 function configure() {
  cancelAnimationFrame(frame); frame = 0;
  story.classList.toggle('motion-ready', !reduced.matches);
  if (reduced.matches) {
   [wheel, brake, driveway, ...copy, progress, story.querySelector('.story-label')].forEach(el => el.removeAttribute('style'));
  }
  measure();
 }
 addEventListener('scroll', schedule, {passive: true});
 addEventListener('resize', measure, {passive: true});
 addEventListener('pageshow', measure);
 reduced.addEventListener('change', configure);
 new ResizeObserver(measure).observe(header);
 configure();
})();
