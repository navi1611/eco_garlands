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
        <span
          className={`inline-block text-xs uppercase tracking-[0.25em] font-semibold mb-3 px-3 py-1 rounded-full border ${
            isLight
              ? 'text-gold border-gold/40 bg-gold/10'
              : 'text-gold-dark border-gold/40 bg-gold/10'
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.15] ${
          isLight ? 'text-cream' : 'text-emerald-dark'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isLight ? 'text-cream/80' : 'text-charcoal/80'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
