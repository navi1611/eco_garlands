'use client';

import React, { useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import { animate, motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { buildGarland, type Density } from '@/components/home/hero/garlandLayout';
import { createParticles } from '@/components/home/hero/particles';
import ParchmentBackground from '@/components/ui/ParchmentBackground';

/*
 * Hero: "Nature, gathered beautifully."
 *
 * Spices rest scattered around the brand name. As the visitor scrolls,
 * the cord draws itself and each spice travels along a curved path to its
 * place, until a hand-tied garland frames the name. The finished garland
 * never spins; it breathes, sways and catches drifting pollen. As the
 * page content scrolls in, the garland and name fade back and stay fixed
 * behind it as a translucent backdrop.
 *
 * Everything moves with transforms and opacity only, from a single
 * requestAnimationFrame loop. Reduced-motion visitors get the finished
 * garland laid out in pure CSS, with no loop at all.
 */

const ease = [0.22, 1, 0.36, 1] as const;

// Chapter lines shown during assembly (ranges on assembly progress 0–1)
const CHAPTERS = [
  { text: 'From the valley’s soil', from: -1, to: 0.12 },
  { text: 'Cardamom · Clove · Cinnamon · Star anise', from: 0.18, to: 0.4 },
  { text: 'Gathered by hand, thread by thread', from: 0.46, to: 0.68 },
];
const TAGLINE_FROM = 0.76;
// How visible the garland and the name stay behind the page content
const BACKDROP_OPACITY = 0.45;
const BACKDROP_TITLE_OPACITY = 0.16;

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function isLowPower() {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  return (
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 4 ||
    Boolean(nav.connection?.saveData)
  );
}

// Small screens and low-powered devices get fewer, larger pods
const noSubscribe = () => () => {};
const clientDensity = (): Density =>
  window.innerWidth < 640 || isLowPower() ? 'compact' : 'full';
const serverDensity = (): Density => 'full';

export default function Hero() {
  const density = useSyncExternalStore(noSubscribe, clientDensity, serverDensity);
  const garland = useMemo(() => buildGarland(density), [density]);

  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threadRef = useRef<SVGSVGElement>(null);
  const cordRef = useRef<SVGPathElement>(null);
  const tasselRef = useRef<SVGGElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const stage = stageRef.current;
    const measure = measureRef.current;
    if (!section || !sticky || !stage || !measure) return;

    const items = garland.items;
    const els = itemRefs.current;
    const n = items.length;
    const lowPower = isLowPower();
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    const particleCount = lowPower ? 0 : window.innerWidth < 640 ? 18 : 42;
    const particles =
      canvasRef.current && particleCount > 0 ? createParticles(canvasRef.current, particleCount) : null;

    // Hero spices fade in one after another on load
    const introDelay = new Float32Array(n);
    let heroIndex = 0;
    items.forEach((it, i) => {
      if (it.hero) introDelay[i] = 0.5 + heroIndex++ * 0.07;
    });

    // Pixel-space paths, recomputed on resize: start, control, target
    const path = new Float32Array(n * 6);
    const lastOpacity = new Float32Array(n).fill(-1);
    let vw = 0;
    let vh = 0;
    let unit = 1;
    let sectionTop = 0;
    let range = 1;
    let curtainStart = 0.6;

    const layout = () => {
      vw = sticky.clientWidth;
      vh = sticky.clientHeight;
      unit = measure.offsetWidth / 1000;
      sectionTop = section.getBoundingClientRect().top + window.scrollY;
      range = Math.max(1, section.offsetHeight - vh);
      // Page content starts rising one viewport before the hero spacer ends
      curtainStart = clamp((section.offsetHeight - 2 * vh) / range, 0.3, 0.9);

      items.forEach((it, i) => {
        const tx = it.x * unit;
        const ty = it.y * unit;
        const sx = it.hero ? it.sx * vw : tx + it.fromDx * unit;
        const sy = it.hero ? it.sy * vh : ty + it.fromDy * unit;
        // Bow each flight path away from the centre so nothing crosses the name
        const dx = tx - sx;
        const dy = ty - sy;
        const len = Math.hypot(dx, dy) || 1;
        const bend = len * (it.hero ? 0.32 : 0.18);
        const mx = (sx + tx) / 2;
        const my = (sy + ty) / 2;
        const px = (-dy / len) * bend;
        const py = (dx / len) * bend;
        const outward = Math.hypot(mx + px, my + py) > Math.hypot(mx - px, my - py) ? 1 : -1;
        path.set([sx, sy, mx + px * outward, my + py * outward, tx, ty], i * 6);
      });
      particles?.resize();
      lastOpacity.fill(-1);
    };

    const progressNow = () => clamp((window.scrollY - sectionTop) / range);

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (finePointer) window.addEventListener('pointermove', onPointer, { passive: true });

    layout();
    let smooth = progressNow();
    const t0 = performance.now();
    let last = t0;
    let raf = 0;

    const thread = threadRef.current;
    const cord = cordRef.current;
    const tassels = tasselRef.current;
    if (thread) thread.style.opacity = '1';

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const time = (now - t0) / 1000;

      // Ease towards the scroll position so motion never feels mechanical
      smooth += (progressNow() - smooth) * (1 - Math.exp(-dt * 4.5));
      const assemblyEnd = curtainStart * 0.8;
      const a = clamp((smooth - 0.01) / (assemblyEnd - 0.01));
      const formed = smoothstep(0.75, 1, a);
      const push = smoothstep(curtainStart * 0.3, curtainStart * 0.95, smooth);
      const curtain = smoothstep(curtainStart, 1, smooth);
      const fade = 1 - (1 - BACKDROP_OPACITY) * curtain;

      pointerX += (targetX - pointerX) * (1 - Math.exp(-dt * 2.5));
      pointerY += (targetY - pointerY) * (1 - Math.exp(-dt * 2.5));

      // Camera: a slow push-in, a barely-there breath once formed, and a
      // step back as the garland settles into the backdrop
      const breathe = 1 + Math.sin(time * 0.9) * 0.006 * formed;
      const scale = (0.9 + 0.1 * push) * (1 - 0.05 * curtain) * breathe;
      stage.style.transform = `translate3d(${(pointerX * 10).toFixed(2)}px, ${(pointerY * 8).toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      stage.style.opacity = fade.toFixed(3);

      if (cord) cord.style.strokeDashoffset = (1 - smoothstep(0.02, 0.4, a)).toFixed(4);
      if (tassels) tassels.style.opacity = smoothstep(0.58, 0.72, a).toFixed(3);

      for (let i = 0; i < n; i++) {
        const it = items[i];
        const el = els[i];
        if (!el) continue;

        const r = clamp((a - it.start) / it.dur);
        const e = easeInOutCubic(r);
        const m = 1 - e;

        let opacity: number;
        let spread = 1;
        if (it.hero) {
          const intro = smoothstep(introDelay[i], introDelay[i] + 1.4, time);
          opacity = intro;
          // Drift gently inwards while fading in on load
          spread = 1 + 0.08 * (1 - intro) * m;
        } else {
          opacity = smoothstep(0, 0.3, r);
        }
        if (opacity <= 0 && lastOpacity[i] === 0) continue;

        const o = i * 6;
        let x = (m * m * path[o] + 2 * m * e * path[o + 2] + e * e * path[o + 4]) * (it.hero ? spread : 1);
        let y = (m * m * path[o + 1] + 2 * m * e * path[o + 3] + e * e * path[o + 5]) * (it.hero ? spread : 1);
        let rot = it.fromRot + (it.rot - it.fromRot) * e;
        const s = it.fromScale + (1 - it.fromScale) * e;

        // Living motion: a wide, slow drift while scattered that settles to
        // a tremor once threaded. Leaves occasionally flick in a "breeze".
        const alive = lowPower && !it.hero && it.kind === 'cardamom' ? 0 : 1;
        const freq = 0.32 + (it.phase % 1) * 0.25;
        const amp = m * 9 + e * 0.9 * it.sway * alive;
        x += Math.sin(time * freq + it.phase) * amp;
        y += Math.cos(time * freq * 0.8 + it.phase * 1.3) * amp;
        rot += Math.sin(time * freq * 1.1 + it.phase * 2) * (m * 6 + e * 1.3 * it.sway * alive);
        if (it.flick) rot += Math.pow(Math.max(0, Math.sin(time * 0.21 + it.phase)), 30) * 5 * e;
        if (it.hero) {
          x += pointerX * it.depth * 28 * m;
          y += pointerY * it.depth * 20 * m;
        }

        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${s.toFixed(4)})`;
        if (opacity !== lastOpacity[i]) {
          el.style.opacity = opacity.toFixed(3);
          lastOpacity[i] = opacity;
        }
      }

      // Copy: chapter lines cross-fade, then the tagline settles in
      CHAPTERS.forEach((c, i) => {
        const el = chapterRefs.current[i];
        if (!el) return;
        const enter = c.from < 0 ? smoothstep(1.3, 2.3, time) : smoothstep(c.from - 0.05, c.from, a);
        const op = enter * (1 - smoothstep(c.to, c.to + 0.05, a));
        el.style.opacity = op.toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - op) * 6).toFixed(2)}px, 0)`;
      });
      const tagline = taglineRef.current;
      if (tagline) {
        const op = smoothstep(TAGLINE_FROM, TAGLINE_FROM + 0.08, a);
        tagline.style.opacity = op.toFixed(3);
        tagline.style.transform = `translate3d(0, ${((1 - op) * 6).toFixed(2)}px, 0)`;
      }
      const title = titleRef.current;
      if (title) {
        title.style.transform = `translate3d(${(-pointerX * 4).toFixed(2)}px, ${(-pointerY * 3).toFixed(2)}px, 0)`;
        title.style.opacity = (1 - (1 - BACKDROP_TITLE_OPACITY) * curtain).toFixed(3);
      }
      const cta = ctaRef.current;
      if (cta) {
        const op = smoothstep(2.2, 3, time) * (1 - smoothstep(0.005, 0.05, smooth));
        cta.style.opacity = op.toFixed(3);
        cta.style.pointerEvents = op > 0.2 ? 'auto' : 'none';
      }

      particles?.draw(dt, time, formed);

      // Once the hero has scrolled away, keep going only until the backdrop
      // has settled, then freeze it so reading the page costs nothing
      const settled = Math.abs(progressNow() - smooth) < 0.0005 && time > 4;
      if (!visible && settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    let running = false;
    let visible = true;
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    const onScroll = () => start();
    window.addEventListener('scroll', onScroll, { passive: true });
    io.observe(section);
    const ro = new ResizeObserver(layout);
    ro.observe(sticky);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [garland]);

  // "Explore the Valley": a slow, cinematic glide to the finished garland.
  // Any wheel, touch or key input hands control straight back.
  const explore = () => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const vh = window.innerHeight;
    const range = section.offsetHeight - vh;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || range < vh) {
      window.scrollTo({ top: top + section.offsetHeight - 80, behavior: 'auto' });
      return;
    }
    const curtainStart = (section.offsetHeight - 2 * vh) / range;
    const controls = animate(window.scrollY, top + range * curtainStart * 0.86, {
      duration: 3.4,
      ease: [0.45, 0, 0.25, 1],
      onUpdate: (v) => window.scrollTo({ top: v, behavior: 'instant' }),
    });
    const cancel = () => {
      controls.stop();
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('keydown', cancel);
    };
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    window.addEventListener('keydown', cancel);
  };

  const stageBox = {
    width: 'var(--stage)',
    height: 'var(--stage)',
    marginLeft: 'calc(var(--stage) / -2)',
    marginTop: 'calc(var(--stage) / -2)',
  };

  return (
    <section
      ref={sectionRef}
      aria-label="J The Divine Eco Valley"
      className="relative -mt-20 h-[300svh] sm:h-[340svh] motion-reduce:h-auto"
    >
      <div
        ref={stickyRef}
        className="fixed inset-x-0 top-0 z-0 h-svh min-h-[560px] overflow-hidden motion-reduce:relative [--stage:min(112vw,72svh)] sm:[--stage:min(88vw,82svh)] [--u:calc(var(--stage)/1000)]"
      >
        {/* Atmosphere: parchment, drifting sunlight, paper grain */}
        <ParchmentBackground className="absolute inset-0" />
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Measures one stage width in pixels for the animation loop */}
        <div ref={measureRef} aria-hidden className="absolute invisible h-0" style={{ width: 'var(--stage)' }} />

        {/* Garland stage */}
        <div ref={stageRef} aria-hidden className="absolute inset-0 pointer-events-none will-change-transform">
          <svg
            ref={threadRef}
            viewBox="-500 -500 1000 1000"
            className="absolute left-1/2 top-1/2 overflow-visible motion-safe:opacity-0"
            style={{ ...stageBox, zIndex: 0 }}
          >
            <path
              ref={cordRef}
              d={garland.thread}
              pathLength={1}
              strokeDasharray="1"
              fill="none"
              stroke="#A88A57"
              strokeWidth={2.6}
              strokeLinecap="round"
              opacity={0.85}
            />
            <g ref={tasselRef} fill="none" stroke="#A88A57" strokeWidth={1.6} strokeLinecap="round" opacity={0.85}>
              {garland.tassels.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          </svg>

          {garland.items.map((it, i) => (
            // eslint-disable-next-line @next/next/no-img-element -- tiny vector cutouts, transformed every frame
            <img
              key={`${density}-${it.id}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              src={it.src}
              alt=""
              draggable={false}
              decoding="async"
              className="absolute left-1/2 top-1/2 max-w-none select-none will-change-transform motion-safe:opacity-0"
              style={{
                width: `calc(var(--u) * ${(it.w * it.scale).toFixed(2)})`,
                height: `calc(var(--u) * ${(it.h * it.scale).toFixed(2)})`,
                marginLeft: `calc(var(--u) * ${(-(it.w * it.scale) / 2).toFixed(2)})`,
                marginTop: `calc(var(--u) * ${(-(it.h * it.scale) / 2).toFixed(2)})`,
                transform: `translate(calc(var(--u) * ${it.x.toFixed(1)}), calc(var(--u) * ${it.y.toFixed(1)})) rotate(${it.rot.toFixed(1)}deg)`,
                zIndex: it.z,
              }}
            />
          ))}
        </div>

        {/* Brand name, centred inside the garland */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div ref={titleRef} className="text-center" style={{ marginTop: 'calc(var(--u) * -70)' }}>
            <h1 className="font-serif font-normal text-emerald-dark">
              <motion.span
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.6, delay: 0.25, ease }}
                className="block uppercase text-gold-dark tracking-[0.42em] pl-[0.42em]"
                style={{ fontSize: 'max(11px, calc(var(--u) * 24))' }}
              >
                J The Divine
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, delay: 0.45, ease }}
                className="block uppercase leading-none tracking-[0.08em] pl-[0.08em]"
                style={{ fontSize: 'calc(var(--u) * 66)', marginTop: 'calc(var(--u) * 16)' }}
              >
                Eco Valley
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.6, delay: 0.9, ease }}
              aria-hidden
              className="mx-auto flex items-center justify-center gap-2 text-gold"
              style={{ marginTop: 'calc(var(--u) * 26)', width: 'calc(var(--u) * 150)' }}
            >
              <span className="h-px flex-1 bg-current opacity-60" />
              <span className="w-1.5 h-1.5 rotate-45 border border-current" />
              <span className="h-px flex-1 bg-current opacity-60" />
            </motion.div>

            {/* Chapter lines and tagline share one slot */}
            <div
              className="relative mx-auto"
              style={{ marginTop: 'calc(var(--u) * 24)', height: 'max(22px, calc(var(--u) * 34))', width: 'calc(var(--u) * 560)' }}
            >
              {CHAPTERS.map((c, i) => (
                <span
                  key={c.text}
                  ref={(el) => {
                    chapterRefs.current[i] = el;
                  }}
                  aria-hidden
                  className="absolute inset-x-0 top-0 uppercase tracking-[0.24em] text-charcoal/55 opacity-0 motion-reduce:hidden"
                  style={{ fontSize: 'max(9px, calc(var(--u) * 14))' }}
                >
                  {c.text}
                </span>
              ))}
              <p
                ref={taglineRef}
                className="absolute inset-x-0 top-0 font-serif italic text-emerald/80 motion-safe:opacity-0"
                style={{ fontSize: 'max(13px, calc(var(--u) * 24))' }}
              >
                Nature, gathered beautifully.
              </p>
            </div>
          </div>
        </div>

        <button
          ref={ctaRef}
          type="button"
          onClick={explore}
          className="absolute z-20 left-1/2 -translate-x-1/2 bottom-[max(24px,5svh)] flex flex-col items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-charcoal/60 hover:text-emerald-dark transition-colors cursor-pointer motion-safe:opacity-0 motion-reduce:hidden"
        >
          Explore the Valley
          <span className="w-9 h-9 rounded-full border border-charcoal/20 flex items-center justify-center">
            <ArrowDown className="w-3.5 h-3.5 hero-cue" />
          </span>
        </button>

      </div>
    </section>
  );
}
