/**
 * STRUCTURA walkthrough state machine (INTERACTIVE.md §C). A 5-step sequence over
 * three ruled lanes. No canvas, no rAF — class toggles + CSS transitions + one
 * cancellable setTimeout for Play. Reduced motion → snaps. The module still
 * mounts under reduced motion so users can step/read at their own pace.
 */
interface Copy {
  captions: string[];
  sr: string[];
  statusReady: string;
  stepReadout: string;
  browserButton: string;
  browserButtonDone: string;
  ctrlPlay: string;
  ctrlPause: string;
}

export function mount(el: HTMLElement): void {
  const copyEl = el.querySelector('[data-structura-copy]');
  if (!copyEl?.textContent) return;
  let copy: Copy;
  try {
    copy = JSON.parse(copyEl.textContent) as Copy;
  } catch {
    return;
  }

  const reveals = [...el.querySelectorAll<HTMLElement>('.st-reveal')];
  const caption = el.querySelector<HTMLElement>('[data-structura-caption]');
  const readout = el.querySelector<HTMLElement>('[data-structura-readout]');
  const live = el.querySelector<HTMLElement>('[data-structura-live]');
  const btn = el.querySelector<HTMLElement>('[data-structura-btn]');
  const prevBtn = el.querySelector<HTMLButtonElement>('[data-ctrl="prev"]');
  const nextBtn = el.querySelector<HTMLButtonElement>('[data-ctrl="next"]');
  const playBtn = el.querySelector<HTMLButtonElement>('[data-ctrl="play"]');
  const replayBtn = el.querySelector<HTMLButtonElement>('[data-ctrl="replay"]');
  const toolbar = el.querySelector<HTMLElement>('[data-structura-toolbar]');

  let current = 5;
  let playing = false;
  let timer = 0;

  el.classList.add('demo-mounted'); // activates the .st-reveal hiding

  const render = (step: number, announce = true) => {
    current = Math.max(1, Math.min(5, step));
    for (const r of reveals) {
      const from = r.dataset.from;
      const only = r.dataset.only;
      const on = only != null ? current === Number(only) : current >= Number(from ?? '99');
      r.classList.toggle('is-on', on);
    }
    if (btn) {
      const done = current >= 5;
      btn.textContent = done ? copy.browserButtonDone : copy.browserButton;
      btn.classList.toggle('border-lime', done);
      btn.classList.toggle('border-border', !done);
    }
    if (caption) caption.textContent = copy.captions[current - 1] ?? copy.statusReady;
    if (readout) readout.textContent = copy.stepReadout.replace('{n}', String(current));
    if (prevBtn) prevBtn.disabled = current <= 1;
    if (nextBtn) nextBtn.disabled = current >= 5;
    if (announce && live) live.textContent = copy.sr[current - 1] ?? '';
  };

  const setPlay = (on: boolean) => {
    playing = on;
    if (!playBtn) return;
    playBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    playBtn.setAttribute('aria-label', on ? copy.ctrlPause : copy.ctrlPlay);
    playBtn.textContent = on ? '❚❚' : '▶';
  };
  const stopPlay = () => {
    if (timer) clearTimeout(timer);
    timer = 0;
    setPlay(false);
  };
  const startPlay = () => {
    stopPlay();
    render(1);
    setPlay(true);
    const tick = () => {
      if (current >= 5) {
        stopPlay();
        return;
      }
      render(current + 1);
      timer = window.setTimeout(tick, 900);
    };
    timer = window.setTimeout(tick, 900);
  };

  prevBtn?.addEventListener('click', () => {
    stopPlay();
    render(current - 1);
  });
  nextBtn?.addEventListener('click', () => {
    stopPlay();
    render(current + 1);
  });
  playBtn?.addEventListener('click', () => {
    if (playing) stopPlay();
    else startPlay();
  });
  replayBtn?.addEventListener('click', () => startPlay());

  toolbar?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      stopPlay();
      render(current + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stopPlay();
      render(current - 1);
    }
  });

  // Initial: keep the resolved end state (matches the static fallback → no flash).
  render(5, false);
}
