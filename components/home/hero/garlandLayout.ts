import { SPICES, type SpiceKind } from '@/components/home/hero/spiceAssets';

/*
 * Garland layout in "stage units": a 1000 × 1000 square centred on the
 * origin, so the hero can scale it to any screen with a single unit size.
 *
 * Each item knows where it rests on the garland, where it starts, and the
 * slice of the assembly timeline (0 → 1) during which it travels.
 */

export type Density = 'full' | 'compact';

export type GarlandItem = {
  id: number;
  kind: SpiceKind;
  src: string;
  w: number;
  h: number;
  // Resting place on the garland
  x: number;
  y: number;
  rot: number;
  scale: number;
  z: number;
  // Assembly timeline slice
  start: number;
  dur: number;
  // Hero spices start scattered around the viewport (fractions of the
  // viewport size); the rest thread in from a short offset (stage units).
  hero: boolean;
  sx: number;
  sy: number;
  fromDx: number;
  fromDy: number;
  fromRot: number;
  fromScale: number;
  // Parallax depth while scattered, 0–1
  depth: number;
  // Idle "living" motion
  phase: number;
  sway: number;
  flick: boolean;
};

export type Garland = {
  items: GarlandItem[];
  thread: string;
  tassels: string[];
};

// Deterministic pseudo-random so the server and client agree
function rand(n: number) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

type Vec = { x: number; y: number };

// Image rotation that points the cutout's top along a direction (y down)
function rotFor(dx: number, dy: number) {
  return (Math.atan2(dx, -dy) * 180) / Math.PI;
}

/* ------------------------------------------------------------------ */
/* The garland ring: wider across the shoulders, drawn into a soft    */
/* point at the bottom, with a little hand-tied irregularity.         */
/* ------------------------------------------------------------------ */
function ringPoint(theta: number): Vec {
  const drop = (1 - Math.cos(theta)) / 2; // 0 at the top, 1 at the bottom
  const wobble = 1 + 0.018 * Math.sin(3 * theta + 0.7) + 0.011 * Math.sin(5 * theta + 2.1);
  return {
    x: Math.sin(theta) * 335 * (1 - 0.15 * drop * drop) * wobble,
    y: -75 - Math.cos(theta) * 280 * wobble + 50 * drop * drop,
  };
}

function createRing(samples = 1440) {
  const pts: Vec[] = [];
  const lengths = [0];
  for (let i = 0; i <= samples; i++) {
    pts.push(ringPoint((i / samples) * Math.PI * 2));
    if (i > 0) {
      const a = pts[i - 1];
      const b = pts[i];
      lengths.push(lengths[i - 1] + Math.hypot(b.x - a.x, b.y - a.y));
    }
  }
  const total = lengths[samples];

  // Point, unit tangent and outward normal at arc-length fraction u
  const at = (u: number) => {
    const target = (((u % 1) + 1) % 1) * total;
    let lo = 0;
    let hi = samples;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (lengths[mid] < target) lo = mid;
      else hi = mid;
    }
    const seg = lengths[hi] - lengths[lo] || 1;
    const f = (target - lengths[lo]) / seg;
    const a = pts[lo];
    const b = pts[hi];
    const tx = (b.x - a.x) / seg;
    const ty = (b.y - a.y) / seg;
    return {
      x: a.x + (b.x - a.x) * f,
      y: a.y + (b.y - a.y) * f,
      tx,
      ty,
      // The ring runs clockwise on screen, so outward is (ty, -tx)
      nx: ty,
      ny: -tx,
    };
  };

  return { at, total };
}

/* ------------------------------------------------------------------ */
/* Builder                                                            */
/* ------------------------------------------------------------------ */
export function buildGarland(density: Density): Garland {
  const ring = createRing();
  const items: GarlandItem[] = [];
  const compact = density === 'compact';
  // Spice size relative to the ring; small screens get chunkier spices
  const K = compact ? 1.55 : 1.35;
  let id = 0;

  const add = (
    kind: SpiceKind,
    pos: Vec,
    rot: number,
    opts: Partial<GarlandItem> & { start: number; dur?: number },
  ) => {
    const seed = id * 7.31 + 1;
    const asset = SPICES[kind];
    const scale = (opts.scale ?? 1) * K;
    items.push({
      id: id++,
      kind,
      src: asset.src[Math.floor(rand(seed) * asset.src.length)],
      w: asset.width,
      h: asset.width * asset.aspect,
      x: pos.x,
      y: pos.y,
      rot,
      z: 2,
      hero: false,
      sx: 0,
      sy: 0,
      fromDx: 0,
      fromDy: 0,
      fromRot: rot + (rand(seed + 2) - 0.5) * 120,
      fromScale: 0.75,
      depth: 0.4 + rand(seed + 3) * 0.6,
      phase: rand(seed + 4) * Math.PI * 2,
      sway: 1,
      flick: false,
      dur: 0.3,
      ...opts,
      scale,
    });
  };

  // Threading offset for non-hero items: they drift in from just off the rope
  const threadFrom = (nx: number, ny: number, tx: number, ty: number, seed: number) => {
    const dist = (70 + rand(seed) * 110) * K;
    const side = rand(seed + 1) > 0.3 ? 1 : -0.6;
    return {
      fromDx: (nx * side - tx * 0.5) * dist,
      fromDy: (ny * side - ty * 0.5) * dist,
    };
  };

  /* Rope: cardamom pods in a two-row herringbone ----------------------- */
  const spacing = 12.5 * K;
  const pods = Math.round(ring.total / spacing);
  for (let i = 0; i < pods; i++) {
    const u = i / pods;
    const p = ring.at(u);
    const row = i % 2 === 0 ? 1 : -1;
    const seed = i * 3.17 + 11;
    const offset = (row * 7.5 + (rand(seed) - 0.5) * 3) * K;
    // Lean each row 30° off the rope, outward and inward alternately
    const lean = ((row * 30 + (rand(seed + 1) - 0.5) * 16) * Math.PI) / 180;
    const dx = p.tx * Math.cos(lean) + p.nx * Math.sin(lean);
    const dy = p.ty * Math.cos(lean) + p.ny * Math.sin(lean);
    const fromTop = Math.min(u, 1 - u) * 2; // 0 at the top, 1 at the bottom
    add('cardamom', { x: p.x + p.nx * offset, y: p.y + p.ny * offset }, rotFor(dx, dy), {
      z: row > 0 ? 3 : 2,
      scale: 0.92 + rand(seed + 2) * 0.18,
      start: 0.12 + fromTop * 0.5 + (rand(seed + 3) - 0.5) * 0.05,
      ...threadFrom(p.nx, p.ny, p.tx, p.ty, seed + 4),
      sway: 0.6,
    });
  }

  /* Accent stations, mirrored left/right with small imperfections ------ */
  type Station = 'anise' | 'cinnamon' | 'turmeric' | 'chilli';
  const STATIONS: { u: number; type: Station }[] = [
    { u: 0.0625, type: 'anise' },
    { u: 0.1875, type: 'chilli' },
    { u: 0.3125, type: 'turmeric' },
    { u: 0.4375, type: 'anise' },
    { u: 0.5625, type: 'anise' },
    { u: 0.6875, type: 'cinnamon' },
    { u: 0.8125, type: 'chilli' },
    { u: 0.9375, type: 'anise' },
  ];

  STATIONS.forEach((station, si) => {
    const seed = si * 13.7 + 101;
    const u = station.u + (rand(seed) - 0.5) * 0.012;
    const p = ring.at(u);
    const out = (d: number, alongT = 0): Vec => ({
      x: p.x + (p.nx * d + p.tx * alongT) * K,
      y: p.y + (p.ny * d + p.ty * alongT) * K,
    });
    // Direction rotated `deg` from the outward normal towards the tangent
    const dir = (deg: number) => {
      const r = (deg * Math.PI) / 180;
      return {
        x: p.nx * Math.cos(r) + p.tx * Math.sin(r),
        y: p.ny * Math.cos(r) + p.ty * Math.sin(r),
      };
    };
    const heroStart = 0.02 + rand(seed + 1) * 0.3;
    const accentStart = Math.min(0.66, heroStart + 0.22);
    const thread = (k: number) => threadFrom(p.nx, p.ny, p.tx, p.ty, seed + 20 + k);

    if (station.type === 'anise') {
      // Bay leaves fan out behind a star anise, flanked by two cloves
      [-36, 34].forEach((deg, k) => {
        const d = dir(deg + (rand(seed + k) - 0.5) * 10);
        add('bayLeaf', { x: p.x + d.x * 30 * K, y: p.y + d.y * 30 * K }, rotFor(d.x, d.y), {
          z: 1,
          scale: 0.9 + rand(seed + 5 + k) * 0.2,
          start: accentStart,
          ...thread(k),
          sway: 1.6,
          flick: true,
        });
      });
      [-1, 1].forEach((side, k) => {
        const d = dir(side * 20);
        add('clove', out(6, side * 34), rotFor(d.x, d.y), {
          z: 4,
          start: accentStart + 0.04,
          ...thread(k + 3),
        });
      });
      add('starAnise', out(3), rand(seed + 9) * 45, {
        z: 6,
        hero: true,
        scale: 0.9 + rand(seed + 10) * 0.2,
        start: heroStart,
        dur: 0.46,
      });
    } else if (station.type === 'chilli') {
      // A pair of dried chillies in a loose V over a bay leaf
      const d = dir(0);
      add('bayLeaf', { x: p.x + d.x * 24 * K, y: p.y + d.y * 24 * K }, rotFor(d.x, d.y), {
        z: 1,
        scale: 0.85,
        start: accentStart,
        ...thread(0),
        sway: 1.6,
        flick: true,
      });
      [-16, 19].forEach((deg, k) => {
        const c = dir(deg);
        add('chilli', { x: p.x + c.x * 22 * K, y: p.y + c.y * 22 * K }, rotFor(c.x, c.y), {
          z: 5,
          hero: true,
          scale: 0.9 + rand(seed + 12 + k) * 0.15,
          start: heroStart + k * 0.05,
          dur: 0.46,
        });
      });
      add('clove', out(2), rotFor(d.x, d.y), { z: 6, start: accentStart + 0.05, ...thread(2) });
    } else {
      // Cinnamon bundle (one side) or turmeric fingers (the other), with
      // peppercorns and a fresh leaf: deliberately not a mirror image
      const leaf = dir(-28);
      add('greenLeaf', { x: p.x + leaf.x * 26 * K, y: p.y + leaf.y * 26 * K }, rotFor(leaf.x, leaf.y), {
        z: 1,
        start: accentStart,
        ...thread(0),
        sway: 1.8,
        flick: true,
      });
      if (station.type === 'cinnamon') {
        add('cinnamonBundle', out(2), rotFor(p.tx, p.ty) + 72, {
          z: 5,
          hero: true,
          start: heroStart,
          dur: 0.46,
        });
      } else {
        [-1, 1].forEach((side, k) => {
          add('turmeric', out(4, side * 10), rotFor(p.tx, p.ty) + 64 + side * 18, {
            z: 5,
            hero: true,
            scale: 0.95,
            start: heroStart + k * 0.05,
            dur: 0.46,
          });
        });
      }
      add('peppercorns', out(10, 18), rand(seed + 14) * 360, {
        z: 6,
        scale: 0.85,
        start: accentStart + 0.05,
        ...thread(3),
      });
    }
  });

  /* Pendant: a large star anise on a bed of leaves, with three tassels -- */
  const bottom = ring.at(0.5);
  const anise = { x: bottom.x, y: bottom.y + 40 * K };
  [
    { x: -0.75, y: 0.66 },
    { x: 0, y: 1 },
    { x: 0.72, y: 0.7 },
  ].forEach((d, k) => {
    add('bayLeaf', { x: anise.x + d.x * 40 * K, y: anise.y + d.y * 40 * K }, rotFor(d.x, d.y), {
      z: 1,
      scale: 1.05,
      start: 0.56 + k * 0.03,
      fromDx: d.x * 120,
      fromDy: 60 + d.y * 80,
      sway: 1.6,
      flick: true,
    });
  });
  [
    { x: -1, y: 0.15 },
    { x: 1, y: 0.2 },
  ].forEach((d, k) => {
    add('greenLeaf', { x: anise.x + d.x * 44 * K, y: anise.y + d.y * 44 * K }, rotFor(d.x, d.y), {
      z: 1,
      start: 0.6 + k * 0.03,
      fromDx: d.x * 140,
      fromDy: 40,
      sway: 1.8,
      flick: true,
    });
  });
  [-1, 1].forEach((side, k) => {
    add('clove', { x: bottom.x + side * 15 * K, y: bottom.y + 12 * K }, rotFor(side * 0.5, 1), {
      z: 5,
      start: 0.58 + k * 0.03,
      fromDx: side * 90,
      fromDy: 90,
    });
  });
  add('starAnise', anise, 8, { z: 7, hero: true, scale: 1.45, start: 0.24, dur: 0.5 });

  const tassels: string[] = [];
  [-24 * K, 0, 24 * K].forEach((dx, si) => {
    const x0 = anise.x + dx * 0.4;
    const y0 = anise.y + 20 * K;
    const xs = anise.x + dx;
    const top = anise.y + 46 * K;
    for (let j = 0; j < 2; j++) {
      add('cardamom', { x: xs + dx * 0.04 * j, y: top + (12 + j * 25) * K }, (rand(si * 5 + j) - 0.5) * 12, {
        z: 2,
        scale: 0.8,
        start: 0.64 + si * 0.025 + j * 0.03,
        fromDx: dx * 2,
        fromDy: 150,
        sway: 1.2,
      });
    }
    const endY = top + (12 + 2 * 25 + (si === 1 ? 16 : 6)) * K;
    if (si === 1) {
      add('chilli', { x: xs, y: endY }, 180, {
        z: 2,
        scale: 0.72,
        start: 0.7,
        fromDy: 160,
        sway: 1.4,
      });
    } else {
      add('clove', { x: xs + dx * 0.08, y: endY }, 180, { z: 2, start: 0.72, fromDy: 150, sway: 1.4 });
    }
    tassels.push(`M${x0.toFixed(1)} ${y0.toFixed(1)} Q${xs.toFixed(1)} ${(top - 8).toFixed(1)} ${(xs + dx * 0.08).toFixed(1)} ${(endY - 6 * K).toFixed(1)}`);
  });

  /* Hero spices: scattered around the viewport, swirling in clockwise --- */
  const heroes = items.filter((it) => it.hero);
  heroes.forEach((it, k) => {
    const seed = it.id * 5.13 + 7;
    const angle = Math.atan2(it.y, it.x) - (0.55 + rand(seed) * 0.5);
    it.sx = Math.cos(angle) * (0.4 + rand(seed + 1) * 0.07);
    it.sy = Math.max(-0.38, Math.sin(angle) * (0.37 + rand(seed + 2) * 0.08));
    it.fromRot = it.rot + (rand(seed + 3) - 0.5) * 220;
    it.fromScale = 1.25 + rand(seed + 4) * 0.35;
    it.sway = 1.2;
    it.depth = 0.5 + rand(seed + 5) * 0.5;
    // Keep each hero's start roughly in reveal order around the ring
    it.start = Math.min(it.start, 0.02 + k * 0.02 + rand(seed + 6) * 0.05);
  });

  // Thread: the garland's cord, drawn before the spices settle on it
  const steps = 240;
  let thread = '';
  for (let i = 0; i <= steps; i++) {
    const p = ring.at(i / steps);
    thread += `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }

  items.sort((a, b) => a.z - b.z);
  return { items, thread: thread + 'Z', tassels };
}
