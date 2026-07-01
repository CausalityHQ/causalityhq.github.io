/**
 * Tiny progressive-enhancement script (design.md §8). No framework, no runtime.
 *   - scroll-aware header hairline (data-scrolled after 80px)
 *   - one-shot reveal + SVG draw-in via IntersectionObserver
 * All motion is already gated in CSS behind `.js` + prefers-reduced-motion, so
 * this only adds classes; it never hides content.
 */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Scroll-aware header --------------------------------------------------
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => {
    if (window.scrollY > 80) header.setAttribute('data-scrolled', '');
    else header.removeAttribute('data-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// --- Reveal + draw-in -----------------------------------------------------
const targets = document.querySelectorAll('[data-reveal], [data-draw]');

const revealAll = () => targets.forEach((el) => el.classList.add('is-visible', 'is-drawn'));

if (reduceMotion || !('IntersectionObserver' in window)) {
  // No animation possible/wanted — show everything immediately (never leave
  // content hidden by the CSS gate).
  revealAll();
} else {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        if (el.hasAttribute('data-reveal')) el.classList.add('is-visible');
        if (el.hasAttribute('data-draw')) el.classList.add('is-drawn');
        obs.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  targets.forEach((el) => observer.observe(el));

  // Safety net: if anything is still hidden after 3s (edge cases / bfcache),
  // reveal it so content can never get stuck invisible.
  window.setTimeout(revealAll, 3000);
}
