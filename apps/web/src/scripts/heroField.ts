/**
 * Hero interaction (design.md §08). A lazy Canvas 2D "semantic constellation"
 * drawn BEHIND the brain-and-gear mark, plus a pointer parallax on the mark
 * group (the rings/orbits/icon in `.hero-parallax`):
 *   - ambient nodes drift perpetually and gently bounce inside the frame;
 *   - hairline links appear between nearby nodes (a living network);
 *   - the pointer attracts nearby nodes and draws live lime links + a cursor node;
 *   - the mark group eases toward the pointer for depth.
 * Perpetual while on-screen; parks rAF off-screen / tab-hidden; tears down on
 * pagehide. Reduced-motion never mounts → the static mark + rings are the whole
 * experience.
 */
const VBW = 420;
const VBH = 380;
const PAD = 16;
const N = 28; // ambient nodes
const LINK = 78; // link distance (VB units)
const MOUSE_R = 104; // pointer influence radius
const MAXP = 14; // parallax travel (px) at the frame edge
const EASEP = 0.12;

type Pt = [number, number];
// deterministic seed positions (scattered around the frame; mark sits centre)
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
];

export function mount(figure: HTMLElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = figure.querySelector<HTMLCanvasElement>('canvas.hero-canvas');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;
  const wrap = figure.querySelector<HTMLElement>('.hero-parallax');

  const px = new Float32Array(N);
  const py = new Float32Array(N);
  const vx = new Float32Array(N);
  const vy = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const s = SEED[i % SEED.length];
    px[i] = s[0];
    py[i] = s[1];
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

  let pointer: Pt | null = null;
  let running = false;
  let visible = true;
  let raf = 0;
  // parallax easing state (px units, applied to the mark group)
  let ptx = 0;
  let pty = 0;
  let pcx = 0;
  let pcy = 0;

  const step = (elapsed: number) => {
    const mx = pointer ? pointer[0] : 0;
    const my = pointer ? pointer[1] : 0;
    for (let i = 0; i < N; i++) {
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
      vx[i] *= 0.96;
      vy[i] *= 0.96;
      const sp = Math.hypot(vx[i], vy[i]);
      if (sp < 0.09) {
        vx[i] += Math.cos(elapsed * 0.0004 + i) * 0.02;
        vy[i] += Math.sin(elapsed * 0.0004 + i * 1.4) * 0.02;
      }
      px[i] += vx[i];
      py[i] += vy[i];
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
    // ease the parallax toward its target and apply to the mark group
    pcx += (ptx - pcx) * EASEP;
    pcy += (pty - pcy) * EASEP;
    if (wrap) {
      wrap.style.setProperty('--px', `${pcx.toFixed(2)}px`);
      wrap.style.setProperty('--py', `${pcy.toFixed(2)}px`);
    }
  };

  const draw = () => {
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
          const a = (1 - Math.sqrt(d2) / LINK) * 0.45;
          ctx.strokeStyle = `rgba(180,186,171,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(px[i] * S, py[i] * S);
          ctx.lineTo(px[j] * S, py[j] * S);
          ctx.stroke();
        }
      }
    }

    // pointer: live lime links to nearby nodes
    if (pointer) {
      ctx.lineWidth = 1.4;
      for (let i = 0; i < N; i++) {
        const dx = pointer[0] - px[i];
        const dy = pointer[1] - py[i];
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_R) {
          const a = (1 - d / MOUSE_R) * 0.85;
          ctx.strokeStyle = `rgba(149,214,0,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(pointer[0] * S, pointer[1] * S);
          ctx.lineTo(px[i] * S, py[i] * S);
          ctx.stroke();
        }
      }
    }

    // ambient dots (swell + darken near the pointer)
    for (let i = 0; i < N; i++) {
      let r = 2.2;
      if (pointer) {
        const d = Math.hypot(pointer[0] - px[i], pointer[1] - py[i]);
        if (d < MOUSE_R) r = 2.2 + (1 - d / MOUSE_R) * 1.8;
      }
      ctx.fillStyle = '#C9CEC1';
      ctx.beginPath();
      ctx.arc(px[i] * S, py[i] * S, r * S, 0, Math.PI * 2);
      ctx.fill();
    }

    // cursor node
    if (pointer) {
      ctx.fillStyle = '#95D600';
      ctx.beginPath();
      ctx.arc(pointer[0] * S, pointer[1] * S, 3 * S, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const t0 = performance.now();
  const loop = (now: number) => {
    step(now - t0);
    draw();
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
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    ptx = nx * MAXP * 2;
    pty = ny * MAXP * 2;
    ensure();
  });
  figure.addEventListener('pointerleave', () => {
    pointer = null;
    ptx = 0;
    pty = 0;
    ensure();
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
    if (!running) draw();
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
