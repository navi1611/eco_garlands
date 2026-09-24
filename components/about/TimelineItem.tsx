import React from 'react';
import FadeIn from '@/components/animation/FadeIn';

export interface TimelineStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  transformation?: string;
  badge?: string;
}

interface TimelineItemProps {
  stage: TimelineStage;
  index: number;
  isLast: boolean;
}

export default function TimelineItem({ stage, index, isLast }: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex items-start md:items-center justify-between md:justify-normal w-full mb-12 sm:mb-16">
      {/* Central milestone node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cream border-2 border-gold flex items-center justify-center shadow-md">
          <span className="font-serif text-sm sm:text-base font-semibold text-emerald-dark">
            {stage.step}
          </span>
        </div>
      </div>

      {/* Content card (alternating on desktop) */}
      <div
        className={`w-full pl-14 sm:pl-16 md:pl-0 md:w-[45%] ${
          isEven ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
        }`}
      >
        <FadeIn direction={isEven ? 'right' : 'left'} delay={0.15}>
          <div className="bg-cream-soft p-6 sm:p-8 rounded-sm border border-gold/20 hover:border-gold/60 transition-all duration-300 shadow-xs">
            <div
              className={`flex items-center gap-2 mb-3 ${
                isEven ? 'md:justify-end' : 'md:justify-start'
              }`}
            >
              {stage.badge && (
                <span className="text-[11px] uppercase tracking-widest text-gold-dark font-medium px-2.5 py-0.5 rounded-full border border-gold/30 bg-gold/10">
                  {stage.badge}
                </span>
              )}
              <span className="text-xs uppercase tracking-wider text-charcoal/50 font-medium">
                Stage {stage.step}
              </span>
            </div>

            <h3 className="font-serif text-2xl font-medium text-emerald-dark">
              {stage.title}
            </h3>

            <h4 className="text-xs uppercase tracking-wider text-gold-dark font-medium mt-1">
              {stage.subtitle}
            </h4>

            <p className="mt-3 text-sm text-charcoal/80 leading-relaxed">
              {stage.description}
            </p>

            {stage.transformation && (
              <div
                className={`mt-4 pt-3 border-t border-gold/15 flex items-center gap-2 text-xs font-serif italic text-emerald ${
                  isEven ? 'md:justify-end' : 'md:justify-start'
                }`}
              >
                <span>Progression:</span>
                <span className="font-medium text-gold-dark">
                  {stage.transformation}
                </span>
              </div>
            )}

            <div
              className={`mt-4 flex flex-wrap gap-2 ${
                isEven ? 'md:justify-end' : 'md:justify-start'
              }`}
            >
              {stage.details.map((detail) => (
                <span
                  key={detail}
                  className="text-xs px-2.5 py-1 bg-cream rounded-xs border border-botanical/30 text-charcoal/80"
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
