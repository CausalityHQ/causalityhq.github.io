/**
 * Hero "semantic constellation" (INTERACTIVE.md §A, evolved).
 * A lazy Canvas 2D overlay over the server-rendered HeroMotif SVG:
 *   - ambient nodes drift perpetually and gently bounce inside the frame;
 *   - hairline links appear between nearby nodes (a living network);
 *   - four lime "mark" nodes stay fixed and their lime edges draw in once,
 *     evoking the brain-and-gear brand mark (the faint SVG mark shows through);
 *   - the pointer attracts nearby nodes and draws live lime connections to them.
 * Perpetual while on-screen; parks rAF off-screen / tab-hidden. Reduced-motion
 * never mounts → the static SVG (fully resolved) is the whole experience.
 */
const VBW = 420;
const VBH = 380;
const PAD = 16;
const N = 30; // ambient nodes
const LINK = 74; // link distance (VB units)
const MOUSE_R = 100; // pointer influence radius

type Pt = [number, number];
const A: Pt = [210, 116];
const B: Pt = [210, 190];
const C: Pt = [291, 190];
const D: Pt = [150, 252];
const MARK: Pt[] = [A, B, C, D];
const MARK_EDGES: [Pt, Pt, number][] = [
  [D, B, 0],
  [A, B, 220],
  [B, C, 440],
];
// deterministic-ish seed positions (some near the mark, rest scattered)
const SEED: Pt[] = [
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
  [40, 120],
  [390, 300],
  [250, 60],
  [180, 230],
  [330, 340],
  [60, 330],
  [280, 220],
  [110, 250],
  [230, 160],
  [360, 60],
  [90, 60],
  [200, 90],
];
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function mount(figure: HTMLElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = figure.querySelector<HTMLCanvasElement>('canvas.hero-canvas');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  const px = new Float32Array(N);
  const py = new Float32Array(N);
  const vx = new Float32Array(N);
  const vy = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const s = SEED[i % SEED.length];
    px[i] = s[0];
    py[i] = s[1];
    // small varied velocities (deterministic from index)
    vx[i] = Math.cos(i * 1.7) * 0.14;
    vy[i] = Math.sin(i * 2.3) * 0.14;
  }

  let scale = 1;
  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    scale = w / VBW;
  };
  resize();
  figure.classList.add('canvas-active');

  const t0 = performance.now();
  let pointer: Pt | null = null;
  let running = false;
  let visible = true;
  let raf = 0;

  const step = (elapsed: number) => {
    const mx = pointer ? pointer[0] : 0;
    const my = pointer ? pointer[1] : 0;
    for (let i = 0; i < N; i++) {
      // pointer attraction (gentle spring toward cursor within radius)
      if (pointer) {
        const dx = mx - px[i];
        const dy = my - py[i];
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_R && d > 0.5) {
          const f = (1 - d / MOUSE_R) * 0.06;
          vx[i] += (dx / d) * f;
          vy[i] += (dy / d) * f;
        }
      }
      // drift + damping (keeps a calm baseline speed)
      vx[i] *= 0.96;
      vy[i] *= 0.96;
      const sp = Math.hypot(vx[i], vy[i]);
      const min = 0.09;
      if (sp < min) {
        // nudge back toward a gentle wander
        vx[i] += Math.cos(elapsed * 0.0004 + i) * 0.02;
        vy[i] += Math.sin(elapsed * 0.0004 + i * 1.4) * 0.02;
      }
      px[i] += vx[i];
      py[i] += vy[i];
      // bounce inside the frame
      if (px[i] < PAD) {
        px[i] = PAD;
        vx[i] = Math.abs(vx[i]);
      } else if (px[i] > VBW - PAD) {
        px[i] = VBW - PAD;
        vx[i] = -Math.abs(vx[i]);
      }
      if (py[i] < PAD) {
        py[i] = PAD;
        vy[i] = Math.abs(vy[i]);
      } else if (py[i] > VBH - PAD) {
        py[i] = VBH - PAD;
        vy[i] = -Math.abs(vy[i]);
      }
    }
  };

  const draw = (elapsed: number) => {
    const S = scale;
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // constellation links between nearby ambient nodes
    ctx.lineWidth = 1;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = px[i] - px[j];
        const dy = py[i] - py[j];
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          const a = (1 - Math.sqrt(d2) / LINK) * 0.5;
          ctx.strokeStyle = `rgba(180,186,171,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(px[i] * S, py[i] * S);
          ctx.lineTo(px[j] * S, py[j] * S);
          ctx.stroke();
        }
      }
    }

    // pointer: live lime links to nearby nodes + cursor node
    if (pointer) {
      ctx.lineWidth = 1.4;
      for (let i = 0; i < N; i++) {
        const dx = pointer[0] - px[i];
        const dy = pointer[1] - py[i];
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_R) {
          const a = (1 - d / MOUSE_R) * 0.9;
          ctx.strokeStyle = `rgba(149,214,0,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(pointer[0] * S, pointer[1] * S);
          ctx.lineTo(px[i] * S, py[i] * S);
          ctx.stroke();
        }
      }
    }

    // ambient dots (slightly larger + darker near the pointer)
    for (let i = 0; i < N; i++) {
      let r = 2.3;
      if (pointer) {
        const d = Math.hypot(pointer[0] - px[i], pointer[1] - py[i]);
        if (d < MOUSE_R) r = 2.3 + (1 - d / MOUSE_R) * 1.8;
      }
      ctx.fillStyle = '#C9CEC1';
      ctx.beginPath();
      ctx.arc(px[i] * S, py[i] * S, r * S, 0, Math.PI * 2);
      ctx.fill();
    }

    // lime mark edges (draw in once, then persist)
    ctx.strokeStyle = '#95D600';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    for (const [p, qq, delay] of MARK_EDGES) {
      const f = easeOut(Math.max(0, Math.min(1, (elapsed - delay) / 700)));
      if (f <= 0) continue;
      ctx.beginPath();
      ctx.moveTo(p[0] * S, p[1] * S);
      ctx.lineTo((p[0] + (qq[0] - p[0]) * f) * S, (p[1] + (qq[1] - p[1]) * f) * S);
      ctx.stroke();
    }

    // fixed lime mark nodes (the brain-and-gear anchors)
    const cs = 0.85 + 0.15 * easeOut(Math.max(0, Math.min(1, (elapsed - 1140) / 260)));
    ctx.fillStyle = '#95D600';
    for (const m of MARK) {
      const r = m === B ? 4.6 : m === C ? 3.4 * cs : 3.4;
      ctx.beginPath();
      ctx.arc(m[0] * S, m[1] * S, r * S, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = '#95D600';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(B[0] * S, B[1] * S, 8.5 * S, 0, Math.PI * 2);
    ctx.stroke();

    // cursor node
    if (pointer) {
      ctx.fillStyle = '#95D600';
      ctx.beginPath();
      ctx.arc(pointer[0] * S, pointer[1] * S, 3 * S, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const loop = (now: number) => {
    const elapsed = now - t0;
    step(elapsed);
    draw(elapsed);
    if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    else {
      running = false;
      raf = 0;
    }
  };
  const ensure = () => {
    if (running || !visible || document.hidden) return;
    running = true;
    raf = requestAnimationFrame(loop);
  };
  ensure();

  figure.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointer = [(e.clientX - r.left) / scale, (e.clientY - r.top) / scale];
    ensure();
  });
  figure.addEventListener('pointerleave', () => {
    pointer = null;
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        visible = e.isIntersecting;
        if (!visible && raf) {
          cancelAnimationFrame(raf);
          running = false;
          raf = 0;
        } else if (visible) ensure();
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
    } else if (!document.hidden) ensure();
  });
  const ro = new ResizeObserver(() => {
    resize();
    if (!running) draw(performance.now() - t0);
  });
  ro.observe(canvas);

  window.addEventListener(
    'pagehide',
    () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      running = false;
      io.disconnect();
      ro.disconnect();
    },
    { once: true },
  );
}
