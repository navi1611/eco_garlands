import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  isLight?: boolean;
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  isLight = false,
  className = '',
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={`flex flex-col max-w-3xl ${alignmentClasses[align]} ${className}`}>
      {badge && (
        <span className={`eyebrow mb-5 ${isLight ? 'text-gold-light' : 'text-gold-dark'}`}>
          {badge}
        </span>
      )}
      <h2
        className={`font-serif text-[2rem] sm:text-5xl lg:text-[3.5rem] font-normal tracking-[-0.02em] leading-[1.08] text-balance ${
          isLight ? 'text-white' : 'text-emerald-dark'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-6 text-base sm:text-[17px] leading-[1.75] max-w-2xl text-pretty ${
            isLight ? 'text-white/70' : 'text-charcoal/65'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
