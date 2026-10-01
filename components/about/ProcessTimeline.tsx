'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import TimelineItem from './TimelineItem';
import { PROCESS_STAGES } from './processStages';

// A small green cardamom pod drawn in SVG, used as the travelling seed
function SeedPod() {
  return (
    <svg viewBox="0 0 24 40" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="seed-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5E7A3E" />
          <stop offset="45%" stopColor="#9BB26A" />
          <stop offset="100%" stopColor="#5E7A3E" />
        </linearGradient>
      </defs>
      <path d="M12 0.5 C12.8 2 13 3 13 4 L11 4 C11 3 11.2 2 12 0.5 Z" fill="#7A6A3A" />
      <path
        d="M12 3.5 C19 7 21.5 15 21 22 C20.4 30 16.5 36.5 12 39 C7.5 36.5 3.6 30 3 22 C2.5 15 5 7 12 3.5 Z"
        fill="url(#seed-body)"
        stroke="#4E6A34"
        strokeWidth="0.8"
      />
      <path d="M12 5 C10 14 10 28 12 37.5" stroke="#4E6A34" strokeWidth="0.7" fill="none" opacity="0.55" />
      <path d="M12 5 C15.5 14 16 28 12 37.5" stroke="#C9D99A" strokeWidth="0.6" fill="none" opacity="0.6" />
    </svg>
  );
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeOffsets = useRef<number[]>([]);
  // Track bounds as fractions of the container: centre of the first node to centre of the last
  const boundsRef = useRef({ start: 0, end: 1 });
  const [bounds, setBounds] = useState({ start: 0, end: 1 });
  const [activeCount, setActiveCount] = useState(0);
  const reducedMotion = useReducedMotion();

  // Progress maps to the viewport centre's position within the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  // Seed follows the viewport centre, but only along the line between the first and last node
  const seedFrac = useTransform(progress, (v) =>
    clamp(v, boundsRef.current.start, boundsRef.current.end)
  );
  const seedTop = useTransform(seedFrac, (f) => `${f * 100}%`);
  // Fade the seed in as it leaves the first stage and out as it lands on the last,
  // so it never sits on top of a stage number
  const seedOpacity = useTransform(progress, (v) => {
    const { start, end } = boundsRef.current;
    const fadeIn = clamp((v - start) / 0.015, 0, 1);
    const fadeOut = clamp((end - v) / 0.015, 0, 1);
    return Math.min(fadeIn, fadeOut);
  });

  // Reveal the gold line up to the seed (clip rather than scale, so the flowing
  // shimmer isn't stretched). Negative side insets keep the glow visible.
  const goldClip = useTransform(seedFrac, (f) => {
    const { start, end } = boundsRef.current;
    const filled = end > start ? (f - start) / (end - start) : 0;
    return `inset(0 -12px ${(1 - clamp(filled, 0, 1)) * 100}% -12px)`;
  });

  // Tilt and spin the pod slightly with scroll speed so it feels like it is travelling
  const velocity = useVelocity(scrollYProgress);
  const tilt = useSpring(useTransform(velocity, [-1.5, 0, 1.5], [-28, 0, 28]), {
    stiffness: 200,
    damping: 20,
  });
  const spin = useTransform(progress, [0, 1], [0, 1080]);

  const updateActive = useCallback((f: number) => {
    const count = nodeOffsets.current.filter((offset) => f >= offset - 0.002).length;
    setActiveCount((prev) => (prev === count ? prev : count));
  }, []);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const box = container.getBoundingClientRect();
    const height = box.height || 1;
    nodeOffsets.current = nodeRefs.current.map((node) => {
      if (!node) return 1;
      const rect = node.getBoundingClientRect();
      return (rect.top + rect.height / 2 - box.top) / height;
    });
    const offsets = nodeOffsets.current;
    if (offsets.length) {
      const next = { start: offsets[0], end: offsets[offsets.length - 1] };
      boundsRef.current = next;
      setBounds((prev) =>
        Math.abs(prev.start - next.start) < 1e-4 && Math.abs(prev.end - next.end) < 1e-4 ? prev : next
      );
    }
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [measure]);

  useMotionValueEvent(progress, 'change', (v) => {
    // Nothing is lit until the viewport centre actually reaches the first stage
    updateActive(v < boundsRef.current.start ? -1 : seedFrac.get());
  });

  const currentIndex = clamp(activeCount - 1, 0, PROCESS_STAGES.length - 1);
  const current = PROCESS_STAGES[currentIndex];

  const lineBox = {
    top: `${bounds.start * 100}%`,
    height: `${(bounds.end - bounds.start) * 100}%`,
  };

  return (
    <div ref={containerRef} className="relative py-8">
      {/* Stage tracker: stays in view while reading, and jumps to any stage */}
      <div className="sticky top-24 z-40 flex justify-center mb-10 pointer-events-none">
        <nav
          aria-label="Timeline progress"
          className="pointer-events-auto flex items-center gap-3 sm:gap-4 rounded-full bg-white/90 backdrop-blur-md border border-line shadow-[var(--shadow-soft)] pl-4 pr-3 py-2 max-w-full"
        >
          <span className="text-[11px] tabular-nums text-charcoal/50 whitespace-nowrap">
            {current.step} / {String(PROCESS_STAGES.length).padStart(2, '0')}
          </span>
          <span className="font-serif text-sm text-emerald-dark whitespace-nowrap truncate">{current.title}</span>
          <span className="flex items-center gap-1.5">
            {PROCESS_STAGES.map((s, i) => (
              <a
                key={s.step}
                href={`#stage-${s.step}`}
                aria-label={`Go to stage ${s.step}, ${s.title}`}
                aria-current={i === currentIndex ? 'step' : undefined}
                className={`block rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-5 h-2 bg-emerald-dark'
                    : i < currentIndex
                      ? 'w-2 h-2 bg-gold hover:bg-gold-dark'
                      : 'w-2 h-2 bg-line-strong hover:bg-gold/60'
                }`}
              />
            ))}
          </span>
        </nav>
      </div>

      {/* Track: connects stage 01 through to the final stage */}
      <div
        style={lineBox}
        className="absolute left-5 md:left-1/2 w-[2px] bg-line-strong -translate-x-1/2 z-0 rounded-full"
      />

      {/* Travelled path: turns gold behind the seed, with a soft flowing shimmer */}
      <motion.div
        style={{ ...lineBox, clipPath: reducedMotion ? 'none' : goldClip }}
        className="absolute left-5 md:left-1/2 w-[3px] -translate-x-1/2 z-0 rounded-full gold-flow shadow-[0_0_12px_rgba(201,165,92,0.6)]"
      />

      {/* The travelling seed */}
      {!reducedMotion && (
        <motion.div
          style={{ top: seedTop, opacity: seedOpacity }}
          className="absolute left-5 md:left-1/2 z-30 pointer-events-none"
        >
          <motion.div
            style={{ rotate: tilt }}
            className="-translate-x-1/2 -translate-y-1/2 relative"
          >
            <span className="absolute inset-[-16px] rounded-full bg-gold/30 blur-lg" />
            <motion.div style={{ rotateY: spin }} className="relative w-5 h-8 drop-shadow-[0_4px_6px_rgba(11,34,25,0.35)]">
              <SeedPod />
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      <div className="relative z-10">
        {PROCESS_STAGES.map((stage, idx) => (
          <TimelineItem
            key={stage.step}
            stage={stage}
            index={idx}
            isActive={reducedMotion ? true : idx < activeCount}
            nodeRef={(el) => {
              nodeRefs.current[idx] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
