// Loader
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  requestAnimationFrame(() => loader.classList.add('hidden'));
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Counter animation
const statObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const el = entry.target;
    const target = parseInt(el.dataset.target || '0', 10);
    let current = 0;
    const step = Math.max(1, Math.round(target / 60));
    const tick = () => {
      current = Math.min(target, current + step);
      el.textContent = current.toString();
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
    statObserver.unobserve(el);
  }
}, { threshold: 0.5 });
document.querySelectorAll('.num').forEach((el) => statObserver.observe(el));

// Simple carousel
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.slide'));
const prev = document.querySelector('.carousel-btn.prev');
const next = document.querySelector('.carousel-btn.next');
let index = 0;
function go(to) {
  index = (to + slides.length) % slides.length;
  if (track) track.style.transform = `translateX(-${index * 100}%)`;
}
prev?.addEventListener('click', () => go(index - 1));
next?.addEventListener('click', () => go(index + 1));
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') go(index - 1);
  if (e.key === 'ArrowRight') go(index + 1);
});


