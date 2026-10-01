import React from 'react';
import FadeIn from '@/components/animation/FadeIn';
import type { TimelineStage } from './processStages';
import StageIllustration from './StageIllustrations';

interface TimelineItemProps {
  stage: TimelineStage;
  index: number;
  isActive: boolean;
  nodeRef?: (el: HTMLDivElement | null) => void;
}

export default function TimelineItem({ stage, index, isActive, nodeRef }: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    // `id` lets the quick view and the stage tracker link straight to a stage
    <div
      id={`stage-${stage.step}`}
      className="relative flex items-start md:items-center w-full mb-14 sm:mb-20 last:mb-0 scroll-mt-40"
    >
      {/* Milestone node — fills in once the travelling seed reaches it */}
      <div
        ref={nodeRef}
        className="absolute left-5 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20"
      >
        <span
          className={`absolute inset-0 rounded-full border-2 border-gold ${
            isActive ? 'opacity-70 animate-[ping_1s_cubic-bezier(0,0,0.2,1)_1_forwards]' : 'opacity-0'
          }`}
        />
        <div
          className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border transition-all duration-500 ${
            isActive
              ? 'bg-sage border-gold shadow-[0_8px_20px_-10px_rgba(179,146,96,0.6)] scale-105'
              : 'bg-white border-line-strong'
          }`}
        >
          <span
            className={`font-serif text-sm sm:text-[15px] tabular-nums transition-colors duration-500 ${
              isActive ? 'text-emerald-dark' : 'text-charcoal/45'
            }`}
          >
            {stage.step}
          </span>
        </div>
      </div>

      {/* Content card, alternating sides on desktop */}
      <div
        className={`w-full pl-14 sm:pl-16 md:pl-0 md:w-[44%] ${
          isEven ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
        }`}
      >
        <FadeIn direction={isEven ? 'right' : 'left'} delay={0.1}>
          <div
            className={`p-7 sm:p-9 rounded-2xl bg-white border transition-all duration-700 ${
              isActive
                ? 'border-line shadow-[var(--shadow-lift)]'
                : 'border-line/70 shadow-none opacity-70'
            }`}
          >
            {/* Illustration sits on the card's outer side, next to its heading */}
            <div className={`flex items-center gap-5 ${isEven ? 'md:flex-row-reverse' : ''}`}>
              <StageIllustration
                step={stage.step}
                active={isActive}
                className={`w-20 h-20 sm:w-24 sm:h-24 shrink-0 transition-transform duration-700 ${
                  isActive ? 'scale-100' : 'scale-90'
                }`}
              />
              <div className="min-w-0">
                <div className={`flex items-center gap-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                  <stage.icon className="w-4 h-4 text-emerald/70" strokeWidth={1.5} aria-hidden />
                  {stage.badge && (
                    <span className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-medium">
                      {stage.badge}
                    </span>
                  )}
                  <span className="w-4 h-px bg-line-strong" />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-charcoal/40 whitespace-nowrap">
                    Stage {stage.step}
                  </span>
                </div>

                <h3 className="mt-3 font-serif text-2xl sm:text-[1.75rem] text-emerald-dark tracking-[-0.01em] text-balance">
                  {stage.title}
                </h3>
                <p className="mt-1 text-sm text-charcoal/50">{stage.subtitle}</p>
              </div>
            </div>

            <p className="mt-4 text-[15px] text-charcoal/65 leading-[1.75]">{stage.description}</p>

            {stage.transformation && (
              <p
                className={`mt-5 pt-5 border-t border-line font-serif italic text-sm text-emerald ${
                  isEven ? 'md:text-right' : 'md:text-left'
                }`}
              >
                {stage.transformation}
              </p>
            )}

            <div className={`mt-5 flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
              {stage.details.map((detail) => (
                <span
                  key={detail}
                  className="text-xs px-3 py-1.5 rounded-full bg-canvas border border-line text-charcoal/65"
                >
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
