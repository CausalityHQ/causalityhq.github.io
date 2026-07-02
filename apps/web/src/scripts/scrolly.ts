/**
 * Scroll-driven demo ("scrollytelling"). As each `.scrolly-step` caption scrolls
 * into the centre band, the pinned visual advances to that step: elements marked
 * `.st-reveal` with `data-from="N"` appear once the active step ≥ N (or exactly
 * `data-only="N"`). CSS transitions do the animation; reduced-motion snaps.
 *
 * IntersectionObserver only — no scroll listeners — so it stays cheap and keeps
 * Lighthouse at 100. No-JS / no-IO keeps the resolved fallback fully visible
 * (hiding is gated on `.demo-mounted`, added here).
 */
export function mount(el: HTMLElement): void {
  const steps = [...el.querySelectorAll<HTMLElement>('.scrolly-step')];
  const reveals = [...el.querySelectorAll<HTMLElement>('.st-reveal')];
  if (!steps.length) return;

  el.classList.add('demo-mounted');

  let currentStep = 0;
  const render = (n: number) => {
    if (n === currentStep) return;
    currentStep = n;
    el.dataset.step = String(n);
    steps.forEach((s, i) => s.classList.toggle('is-active', i + 1 === n));
    for (const r of reveals) {
      const from = r.dataset.from;
      const only = r.dataset.only;
      const on = only != null ? n === Number(only) : n >= Number(from ?? '99');
      r.classList.toggle('is-on', on);
    }
  };

  if (!('IntersectionObserver' in window)) {
    render(steps.length); // no IO → show the resolved end state
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      // one step sits in the central band at a time; if several, the latest wins
      let active = -1;
      for (const e of entries) {
        if (e.isIntersecting) {
          const i = steps.indexOf(e.target as HTMLElement);
          if (i > active) active = i;
        }
      }
      if (active >= 0) render(active + 1);
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
  );
  steps.forEach((s) => io.observe(s));

  render(1);
}
