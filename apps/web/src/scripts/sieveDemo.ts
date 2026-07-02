/**
 * SIEVE demo state machine (INTERACTIVE.md §B). Drives preset selection and the
 * search choreography over the server-rendered SVG. No canvas, no rAF — CSS
 * transitions + one cancellable setTimeout chain. Reduced motion → snaps.
 * Copy comes from an inline JSON island (locale-correct); structure/coords from
 * sieveData.ts.
 */
import { CORPUS, PRESETS, toSvg, QUERY_ORIGIN, scoreDot, scoreProse } from './sieveData';

interface Copy {
  locale: string;
  presets: string[];
  docs: string[];
  nearest: string;
  narrateIdle: string;
  liveSet: string;
  liveSearching: string;
  liveResult: string;
  figcaptionTpl: string;
}

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function mount(el: HTMLElement): void {
  const copyEl = el.querySelector('[data-sieve-copy]');
  if (!copyEl?.textContent) return;
  let copy: Copy;
  try {
    copy = JSON.parse(copyEl.textContent) as Copy;
  } catch {
    return;
  }

  const queryG = el.querySelector<SVGGElement>('[data-sieve-query]');
  const leaders = [...el.querySelectorAll<SVGLineElement>('[data-sieve-leaders] line')];
  const dots = [...el.querySelectorAll<SVGCircleElement>('[data-sieve-docs] circle')];
  const halos = [...el.querySelectorAll<SVGCircleElement>('[data-sieve-halos] circle')];
  const chips = [...el.querySelectorAll<SVGTextElement>('[data-sieve-chips] text')];
  const tokensUl = el.querySelector<HTMLElement>('[data-sieve-tokens]');
  const rows = [...el.querySelectorAll<HTMLElement>('[data-sieve-results] li')];
  const figcap = el.querySelector<HTMLElement>('[data-sieve-figcaption]');
  const live = el.querySelector<HTMLElement>('[data-sieve-live]');
  const presetBtns = [
    ...el.querySelectorAll<HTMLButtonElement>('[data-sieve-presets] [data-preset]'),
  ];
  const runBtn = el.querySelector<HTMLButtonElement>('#sieve-run');
  const resetBtn = el.querySelector<HTMLButtonElement>('#sieve-reset');
  if (!queryG || leaders.length < 3) return;

  let current = 0;
  let timers: number[] = [];
  const clearTimers = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };
  const fmtProse = (s: number) => scoreProse(s, copy.locale);
  const setLive = (msg: string) => {
    if (live) live.textContent = msg;
  };
  const snapQuery = (x: number, y: number) => {
    queryG.style.transition = 'none';
    queryG.style.transform = `translate(${x}px, ${y}px)`;
    void queryG.getBoundingClientRect();
    queryG.style.transition = '';
  };

  const setTokens = (idx: number) => {
    if (!tokensUl) return;
    tokensUl.textContent = '';
    for (const tok of copy.presets[idx].split(' ')) {
      const li = document.createElement('li');
      li.className =
        'rounded-sm border border-hairline bg-surface px-2 py-1 font-mono text-[0.75rem] text-ink';
      li.textContent = tok;
      tokensUl.appendChild(li);
    }
  };

  const setRadios = (idx: number) => {
    presetBtns.forEach((b, i) => {
      const on = i === idx;
      b.setAttribute('aria-checked', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      b.toggleAttribute('data-active', on);
    });
  };

  const retract = () => {
    for (const L of leaders) L.style.strokeDashoffset = '1';
    for (const h of halos) h.style.opacity = '0';
    for (const c of chips) c.style.opacity = '0';
    dots.forEach((c) => {
      c.setAttribute('fill', '#C9CEC1');
      c.setAttribute('r', '3.5');
    });
    snapQuery(QUERY_ORIGIN[0], QUERY_ORIGIN[1]);
  };

  // Idle state (no search yet) — invites the user to press Run.
  const reset = () => {
    clearTimers();
    queryG.style.opacity = '0';
    for (const L of leaders) L.style.strokeDashoffset = '1';
    for (const h of halos) h.style.opacity = '0';
    for (const c of chips) c.style.opacity = '0';
    dots.forEach((c) => {
      c.setAttribute('fill', '#C9CEC1');
      c.setAttribute('r', '3.5');
    });
    rows.forEach((row) => {
      const docCell = row.querySelector('[data-cell="doc"]');
      const scoreCell = row.querySelector('[data-cell="score"]');
      const nearCell = row.querySelector<HTMLElement>('[data-cell="nearest"]');
      if (docCell) docCell.textContent = '—';
      if (scoreCell) scoreCell.textContent = '';
      if (nearCell) nearCell.style.display = 'none';
    });
    setLive(copy.narrateIdle);
  };

  const resolve = (idx: number) => {
    const preset = PRESETS[idx];
    const q = toSvg(preset.qx, preset.qy);
    queryG.style.opacity = '1';
    queryG.style.transform = `translate(${q[0]}px, ${q[1]}px)`;
    const nn = preset.neighbours;
    const nnSet = new Set(nn.map((n) => n.doc));
    dots.forEach((c, i) => {
      const on = nnSet.has(i);
      c.setAttribute('fill', on ? '#95D600' : '#C9CEC1');
      c.setAttribute('r', on ? '4.5' : '3.5');
    });
    nn.forEach((n, k) => {
      const p = toSvg(CORPUS[n.doc].x, CORPUS[n.doc].y);
      const L = leaders[k];
      L.setAttribute('x1', String(q[0]));
      L.setAttribute('y1', String(q[1]));
      L.setAttribute('x2', String(p[0]));
      L.setAttribute('y2', String(p[1]));
      L.style.strokeDashoffset = '0';
      const h = halos[k];
      h.setAttribute('cx', String(p[0]));
      h.setAttribute('cy', String(p[1]));
      h.style.opacity = '1';
      const c = chips[k];
      c.setAttribute('x', String(p[0] + 11));
      c.setAttribute('y', String(p[1] + 4));
      c.textContent = scoreDot(n.score);
      c.style.opacity = '1';
      const row = rows[k];
      if (row) {
        const docCell = row.querySelector('[data-cell="doc"]');
        const scoreCell = row.querySelector('[data-cell="score"]');
        const nearCell = row.querySelector<HTMLElement>('[data-cell="nearest"]');
        if (docCell) docCell.textContent = copy.docs[n.doc];
        if (scoreCell) scoreCell.textContent = scoreDot(n.score);
        if (nearCell) nearCell.style.display = k === 0 ? '' : 'none';
      }
    });
    if (figcap) {
      figcap.textContent = copy.figcaptionTpl
        .replace('{q}', copy.presets[idx])
        .replace('{n1}', copy.docs[nn[0].doc])
        .replace('{s1}', fmtProse(nn[0].score))
        .replace('{n2}', copy.docs[nn[1].doc])
        .replace('{s2}', fmtProse(nn[1].score))
        .replace('{n3}', copy.docs[nn[2].doc])
        .replace('{s3}', fmtProse(nn[2].score));
    }
  };

  const resultMsg = (idx: number) => {
    const nn = PRESETS[idx].neighbours;
    return copy.liveResult
      .replace('{n1}', copy.docs[nn[0].doc])
      .replace('{s1}', fmtProse(nn[0].score));
  };

  const show = (idx: number) => {
    clearTimers();
    current = idx;
    setRadios(idx);
    setTokens(idx);
    if (reduceMotion()) {
      resolve(idx);
      setLive(resultMsg(idx));
      return;
    }
    retract();
    setLive(copy.liveSearching);
    timers.push(window.setTimeout(() => resolve(idx), 200));
    timers.push(window.setTimeout(() => setLive(resultMsg(idx)), 950));
  };

  // --- preset radiogroup: click + roving arrows ---
  presetBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      setLive(copy.liveSet.replace('{q}', copy.presets[i]));
      show(i);
    });
  });
  const group = el.querySelector<HTMLElement>('[data-sieve-presets]');
  group?.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = (current + dir + presetBtns.length) % presetBtns.length;
    presetBtns[next].focus();
    setLive(copy.liveSet.replace('{q}', copy.presets[next]));
    show(next);
  });

  runBtn?.addEventListener('click', () => show(current));
  resetBtn?.addEventListener('click', () => {
    current = 0;
    setRadios(0);
    setTokens(0);
    reset();
  });

  // Start idle on mount (the static/no-JS fallback shows the resolved P1 result).
  reset();
}
