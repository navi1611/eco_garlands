'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Check, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { PROCESS_PHASES, PROCESS_STAGES } from './processStages';
import StageIllustration from './StageIllustrations';

/*
 * "The process at a glance": all eight stages on one track, grouped into
 * phases. Choosing a stage shows a summary card with what changes at that
 * stage and a link to its full entry in the detailed timeline below.
 * Until the visitor interacts, it slowly plays through the stages.
 */

const AUTOPLAY_MS = 3500;
const ease = [0.22, 1, 0.36, 1] as const;
const LAST = PROCESS_STAGES.length - 1;

// How many stages each phase spans, for the phase labels above the track
const PHASE_SPANS = PROCESS_PHASES.map((phase) => ({
  phase,
  count: PROCESS_STAGES.filter((s) => s.phase === phase).length,
}));

export default function ProcessQuickView() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  // Autoplay runs until the visitor takes over; hover or focus pauses it
  const [autoplay, setAutoplay] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const playing = autoplay && !hovering && inView && !reducedMotion;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setActive((i) => (i === LAST ? 0 : i + 1)), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [playing, active]);

  // Keep the active stage visible when the track scrolls sideways on phones
  useEffect(() => {
    const track = trackRef.current;
    const tab = tabRefs.current[active];
    if (!track || !tab || track.scrollWidth <= track.clientWidth) return;
    const left = tab.offsetLeft - (track.clientWidth - tab.offsetWidth) / 2;
    track.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [active, reducedMotion]);

  const choose = (index: number, focus = false) => {
    setAutoplay(false);
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onTabKey = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: Math.min(LAST, active + 1),
      ArrowLeft: Math.max(0, active - 1),
      Home: 0,
      End: LAST,
    };
    if (e.key in keys) {
      e.preventDefault();
      choose(keys[e.key], true);
    }
  };

  const stage = PROCESS_STAGES[active];
  const steps = stage.transformation?.split('→').map((s) => s.trim()) ?? [];
  // Gold line runs from the first stage's centre to the active stage's centre
  const filled = (active / LAST) * 100;

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
      className="rounded-[28px] bg-white/70 border border-line shadow-[var(--shadow-soft)] p-5 sm:p-8 lg:p-10"
    >
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow text-gold-dark">The process at a glance</span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl text-emerald-dark tracking-[-0.01em] text-balance">
            Eight stages, from seed to celebration
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => choose(Math.max(0, active - 1))}
            disabled={active === 0}
            aria-label="Previous stage"
            className="w-9 h-9 rounded-full border border-line-strong flex items-center justify-center text-emerald-dark hover:bg-sage disabled:opacity-35 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-default"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => choose(Math.min(LAST, active + 1))}
            disabled={active === LAST}
            aria-label="Next stage"
            className="w-9 h-9 rounded-full border border-line-strong flex items-center justify-center text-emerald-dark hover:bg-sage disabled:opacity-35 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-default"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setAutoplay((v) => !v)}
              aria-label={autoplay ? 'Pause the walkthrough' : 'Play the walkthrough'}
              className="h-9 pl-3 pr-3.5 rounded-full border border-line-strong flex items-center gap-1.5 text-xs text-emerald-dark hover:bg-sage transition-colors cursor-pointer"
            >
              {autoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {autoplay ? 'Pause' : 'Play'}
            </button>
          )}
        </div>
      </div>

      {/* Track: scrolls sideways on narrow screens */}
      <div ref={trackRef} className="mt-8 -mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="min-w-[720px]">
          {/* Phases */}
          <div className="grid grid-cols-8 gap-2 mb-4" aria-hidden>
            {PHASE_SPANS.map(({ phase, count }) => {
              const current = stage.phase === phase;
              return (
                <div key={phase} style={{ gridColumn: `span ${count}` }} className="px-1">
                  <div
                    className={`text-[10px] uppercase tracking-[0.24em] font-medium transition-colors duration-500 ${
                      current ? 'text-gold-dark' : 'text-charcoal/40'
                    }`}
                  >
                    {phase}
                  </div>
                  <div
                    className={`mt-2 h-px transition-colors duration-500 ${current ? 'bg-gold' : 'bg-line-strong'}`}
                  />
                </div>
              );
            })}
          </div>

          {/* Stages */}
          <div className="relative">
            <div className="absolute top-6 left-[6.25%] right-[6.25%] h-[2px] bg-line rounded-full" aria-hidden />
            <div
              className="absolute top-6 left-[6.25%] h-[2px] rounded-full bg-gold transition-[width] duration-700 ease-out"
              style={{ width: `calc(${filled} * 0.875%)` }}
              aria-hidden
            />
            <div role="tablist" aria-label="Process stages" onKeyDown={onTabKey} className="relative grid grid-cols-8 gap-2">
              {PROCESS_STAGES.map((s, i) => {
                const isActive = i === active;
                const done = i < active;
                const Icon = s.icon;
                return (
                  <button
                    key={s.step}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`quick-tab-${s.step}`}
                    aria-selected={isActive}
                    aria-controls="quick-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => choose(i)}
                    className="group flex flex-col items-center text-center gap-2.5 rounded-xl pb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 cursor-pointer"
                  >
                    <span
                      className={`relative w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 ${
                        isActive
                          ? 'bg-emerald-dark border-emerald-dark text-white scale-110 shadow-[0_10px_24px_-12px_rgba(11,34,25,0.7)]'
                          : done
                            ? 'bg-sage border-gold/60 text-emerald'
                            : 'bg-white border-line-strong text-charcoal/45 group-hover:border-gold/60 group-hover:text-emerald'
                      }`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                      {isActive && (
                        <span className="absolute -inset-1.5 rounded-full border border-gold/50" aria-hidden />
                      )}
                    </span>
                    <span className="text-[10px] tabular-nums tracking-[0.18em] text-charcoal/40">{s.step}</span>
                    <span
                      className={`text-[12.5px] leading-tight transition-colors ${
                        isActive ? 'text-emerald-dark font-medium' : 'text-charcoal/60'
                      }`}
                    >
                      {s.title}
                    </span>
                    {/* Autoplay countdown under the active stage */}
                    <span className="h-0.5 w-10 rounded-full bg-line overflow-hidden" aria-hidden>
                      {isActive && playing && (
                        <span
                          key={active}
                          className="block h-full bg-gold origin-left animate-[quick-countdown_linear_forwards]"
                          style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Summary card for the chosen stage */}
      <div
        id="quick-panel"
        role="tabpanel"
        aria-labelledby={`quick-tab-${stage.step}`}
        aria-live={autoplay ? 'off' : 'polite'}
        className="mt-6 rounded-2xl bg-canvas/80 border border-line p-5 sm:p-8 min-h-[280px]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage.step}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
            transition={{ duration: reducedMotion ? 0 : 0.45, ease }}
            className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-8 md:gap-12"
          >
            <div className="min-w-0">
              <StageIllustration step={stage.step} active className="w-24 h-24 sm:w-28 sm:h-28 mb-5" />
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em]">
                <span className="text-gold-dark font-medium">{stage.phase}</span>
                <span className="w-4 h-px bg-line-strong" />
                <span className="text-charcoal/45 tabular-nums">
                  Stage {stage.step} of {String(PROCESS_STAGES.length).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-[1.75rem] sm:text-3xl text-emerald-dark tracking-[-0.01em]">
                {stage.title}
              </h3>
              <p className="mt-1 text-sm text-charcoal/50">{stage.subtitle}</p>
              <p className="mt-4 text-[15px] text-charcoal/70 leading-[1.75] max-w-[52ch]">{stage.summary}</p>
              <a
                href={`#stage-${stage.step}`}
                className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-dark border-b border-gold/60 pb-0.5 hover:border-emerald-dark transition-colors"
              >
                Read the full stage
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="min-w-0 space-y-6">
              {steps.length > 1 && (
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-charcoal/45">What changes</div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {steps.map((step, i) => (
                      <React.Fragment key={step}>
                        {i > 0 && <ArrowRight className="w-3.5 h-3.5 text-gold shrink-0" aria-hidden />}
                        <span
                          className={`px-3 py-1.5 rounded-full text-[13px] border ${
                            i === steps.length - 1
                              ? 'bg-emerald-dark text-white border-emerald-dark'
                              : 'bg-white text-emerald-dark border-line'
                          }`}
                        >
                          {step}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-charcoal/45">At this stage</div>
                <ul className="mt-3 space-y-2.5">
                  {stage.details.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-charcoal/75">
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-sage flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-emerald" strokeWidth={2.5} />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
