// Soft drifting pollen motes on a 2D canvas. Driven by the hero's own
// animation loop, so there is only ever one requestAnimationFrame.

type Mote = {
  x: number;
  y: number;
  r: number;
  vy: number;
  wobble: number;
  phase: number;
  alpha: number;
};

function rand(n: number) {
  const s = Math.sin(n * 91.7 + 17.3) * 43758.5453;
  return s - Math.floor(s);
}

export function createParticles(canvas: HTMLCanvasElement, count: number) {
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let motes: Mote[] = [];

  // Pre-rendered glow sprite: one radial gradient, reused by every mote
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = 64;
  const s = sprite.getContext('2d');
  if (s) {
    const g = s.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(236, 206, 140, 1)');
    g.addColorStop(0.35, 'rgba(226, 190, 118, 0.55)');
    g.addColorStop(1, 'rgba(226, 190, 118, 0)');
    s.fillStyle = g;
    s.fillRect(0, 0, 64, 64);
  }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    motes = Array.from({ length: count }, (_, i) => ({
      x: rand(i) * width,
      y: rand(i + 0.5) * height,
      r: 1.4 + rand(i + 1) * 3.6,
      vy: 5 + rand(i + 2) * 12,
      wobble: 6 + rand(i + 3) * 18,
      phase: rand(i + 4) * Math.PI * 2,
      alpha: 0.18 + rand(i + 5) * 0.4,
    }));
  };

  // `glow` (0–1) lifts the motes as the garland completes
  const draw = (dt: number, time: number, glow: number) => {
    if (!ctx || !width) return;
    ctx.clearRect(0, 0, width, height);
    for (const m of motes) {
      m.y -= m.vy * dt;
      if (m.y < -10) {
        m.y = height + 10;
        m.x = Math.random() * width;
      }
      const x = m.x + Math.sin(time * 0.3 + m.phase) * m.wobble;
      const twinkle = 0.75 + Math.sin(time * 0.9 + m.phase * 3) * 0.25;
      ctx.globalAlpha = m.alpha * twinkle * (0.7 + glow * 0.5);
      const size = m.r * 4;
      ctx.drawImage(sprite, x - size / 2, m.y - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
  };

  return { resize, draw };
}
