import React from 'react';
import Container from '@/components/ui/Container';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export default function PageContainer({
  children,
  title,
  subtitle,
  badge,
  className = '',
  size = 'default',
}: PageContainerProps) {
  return (
    <div className={`py-12 sm:py-16 lg:py-20 ${className}`}>
      <Container size={size}>
        {(title || subtitle || badge) && (
          <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
            {badge && (
              <span className="inline-block text-xs uppercase tracking-[0.25em] font-semibold text-gold-dark mb-3 px-3 py-1 rounded-full border border-gold/30 bg-gold/10">
                {badge}
              </span>
            )}
            {title && (
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-emerald-dark tracking-tight leading-tight">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-4 text-base sm:text-lg text-charcoal/80 leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="mt-6 flex items-center justify-center">
              <div className="h-px w-16 bg-gold/40" />
              <div className="mx-2 w-2 h-2 rounded-full border border-gold bg-cream" />
              <div className="h-px w-16 bg-gold/40" />
            </div>
          </div>
        )}
        {children}
      </Container>
    </div>
  );
}
