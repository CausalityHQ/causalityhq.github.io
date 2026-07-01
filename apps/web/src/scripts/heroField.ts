/**
 * Hero moving-graph (INTERACTIVE.md §A). A lazy Canvas 2D overlay that hard-swaps
 * over the server-rendered HeroMotif SVG, replays the lime "line of reasoning"
 * draw-in once, then goes STILL — the only ongoing motion is a ≤6px pointer probe
 * on fine pointers. rAF parks itself when idle / off-screen / tab-hidden.
 * Under reduced motion it never mounts (the SVG is the whole experience).
 *
 * Coordinates are in the shipped 420×380 HeroMotif space.
 */
type Pt = [number, number];

// 18 ambient nodes + A at index 18 (A is a fixed lime endpoint of the web).
const AMBIENT: Pt[] = [
  [70, 82],
  [120, 58],
  [300, 68],
  [352, 120],
  [80, 150],
  [58, 250],
  [112, 300],
  [182, 332],
  [262, 320],
  [330, 282],
  [360, 200],
  [300, 252],
  [150, 110],
  [250, 118],
  [92, 210],
  [322, 150],
  [200, 300],
  [140, 175],
];
const A: Pt = [210, 116];
const B: Pt = [210, 190];
const C: Pt = [291, 190];
const D: Pt = [150, 252];
// Web edges as index pairs into positions (0..17 ambient, 18 = A).
const EDGES: [number, number][] = [
  [1, 12],
  [2, 15],
  [4, 14],
  [12, 18],
  [13, 18],
  [9, 11],
  [6, 16],
  [14, 17],
  [3, 15],
  [8, 16],
  [5, 14],
];
// Lime edges (from, to, start-delay ms); each draws over 700ms.
const LIME: [Pt, Pt, number][] = [
  [D, B, 180],
  [A, B, 440],
  [B, C, 700],
];
const VB = 420;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function mount(figure: HTMLElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = figure.querySelector<HTMLCanvasElement>('canvas.hero-canvas');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const base: Pt[] = [...AMBIENT.map((p) => [p[0], p[1]] as Pt), [A[0], A[1]]];
  const disp: Pt[] = base.map(() => [0, 0]); // probe displacement (lerped)
  const targ: Pt[] = base.map(() => [0, 0]);
  const drift: Pt[] = base.map(() => [0, 0]); // gentle perpetual float (ambient nodes)
  // deterministic per-node phase/amplitude so dots float out of sync
  const phase = AMBIENT.map((_, i) => i * 0.7);
  const amp = AMBIENT.map((_, i) => 1.5 + (i % 3) * 0.5);
  let scale = 1;

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    scale = w / VB;
  };
  resize();
  figure.classList.add('canvas-active'); // hard swap: hide SVG layers, show canvas

  const pos = (i: number): Pt => [
    base[i][0] + disp[i][0] + drift[i][0],
    base[i][1] + disp[i][1] + drift[i][1],
  ];
  const dot = (p: Pt, r: number) => {
    ctx.beginPath();
    ctx.arc(p[0] * scale, p[1] * scale, r * scale, 0, Math.PI * 2);
    ctx.fill();
  };

  const startTime = performance.now();
  let elapsed = 0;
  let pointer: Pt | null = null;
  let probeActive = false;
  let running = false;
  let visible = true;
  let raf = 0;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    // ambient web
    ctx.strokeStyle = '#E3E6DE';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const [a, b] of EDGES) {
      const pa = pos(a);
      const pb = pos(b);
      ctx.moveTo(pa[0] * scale, pa[1] * scale);
      ctx.lineTo(pb[0] * scale, pb[1] * scale);
    }
    ctx.stroke();
    // ambient dots
    ctx.fillStyle = '#C9CEC1';
    for (let i = 0; i < 18; i++) dot(pos(i), 2.4);
    // lime edges (drawn fraction)
    ctx.strokeStyle = '#95D600';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    for (const [p, q, delay] of LIME) {
      const f = easeOut(Math.max(0, Math.min(1, (elapsed - delay) / 700)));
      if (f <= 0) continue;
      ctx.beginPath();
      ctx.moveTo(p[0] * scale, p[1] * scale);
      ctx.lineTo((p[0] + (q[0] - p[0]) * f) * scale, (p[1] + (q[1] - p[1]) * f) * scale);
      ctx.stroke();
    }
    // lime nodes (C scales 0.85→1 as the single accent when B→C completes)
    const cs = 0.85 + 0.15 * easeOut(Math.max(0, Math.min(1, (elapsed - 1400) / 260)));
    ctx.fillStyle = '#95D600';
    dot(A, 3.4);
    dot(D, 3.4);
    dot(C, 3.4 * cs);
    dot(B, 4.6);
    ctx.strokeStyle = '#95D600';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(B[0] * scale, B[1] * scale, 8.5 * scale, 0, Math.PI * 2);
    ctx.stroke();
  };

  const computeTargets = () => {
    for (let i = 0; i < 19; i++) {
      targ[i][0] = 0;
      targ[i][1] = 0;
    }
    if (!probeActive || !pointer) return;
    // nearest 6 ambient nodes drift ≤6px toward the pointer
    const d = AMBIENT.map(
      (p, i) => [i, (p[0] - pointer![0]) ** 2 + (p[1] - pointer![1]) ** 2] as [number, number],
    ).sort((a, b) => a[1] - b[1]);
    for (let n = 0; n < 6; n++) {
      const i = d[n][0];
      const vx = pointer[0] - base[i][0];
      const vy = pointer[1] - base[i][1];
      const m = Math.hypot(vx, vy) || 1;
      const cap = Math.min(6, m);
      targ[i][0] = (vx / m) * cap;
      targ[i][1] = (vy / m) * cap;
    }
  };

  const loop = (now: number) => {
    elapsed = now - startTime;
    // gentle perpetual float for the ambient dots (the "floating dots")
    for (let i = 0; i < 18; i++) {
      drift[i][0] = Math.sin(now * 0.00042 + phase[i]) * amp[i];
      drift[i][1] = Math.cos(now * 0.00035 + phase[i] * 1.3) * amp[i] * 0.8;
    }
    if (fine) {
      computeTargets();
      for (let i = 0; i < 19; i++) {
        disp[i][0] += (targ[i][0] - disp[i][0]) * 0.08;
        disp[i][1] += (targ[i][1] - disp[i][1]) * 0.08;
      }
    }
    draw();
    // Perpetual while on-screen (user asked for floating motion); parks off-screen
    // and when the tab is hidden (perf/battery).
    if (visible && !document.hidden) {
      raf = requestAnimationFrame(loop);
    } else {
      running = false;
      raf = 0;
    }
  };
  const ensure = () => {
    if (running || !visible || document.hidden) return;
    running = true;
    raf = requestAnimationFrame(loop);
  };
  ensure(); // play the one-shot draw-in

  // --- pointer probe (fine pointers only) ---
  if (fine) {
    figure.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      pointer = [(e.clientX - r.left) / scale, (e.clientY - r.top) / scale];
      probeActive = true;
      ensure();
    });
    figure.addEventListener('pointerleave', () => {
      probeActive = false;
      ensure();
    });
  }

  // --- park when off-screen / tab hidden ---
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        visible = e.isIntersecting;
        if (!visible && raf) {
          cancelAnimationFrame(raf);
          running = false;
          raf = 0;
        } else if (visible) {
          ensure();
        }
      }
    },
    { threshold: 0 },
  );
  io.observe(figure);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && raf) {
      cancelAnimationFrame(raf);
      running = false;
      raf = 0;
    } else if (!document.hidden) {
      ensure();
    }
  });

  const ro = new ResizeObserver(() => {
    resize();
    if (!running) draw();
  });
  ro.observe(canvas);
}
