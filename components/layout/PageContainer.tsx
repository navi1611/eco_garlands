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
    <div className={`py-16 sm:py-20 lg:py-28 ${className}`}>
      <Container size={size}>
        {(title || subtitle || badge) && (
          <div className="mb-16 sm:mb-20 text-center max-w-3xl mx-auto flex flex-col items-center">
            {badge && <span className="eyebrow text-gold-dark mb-6">{badge}</span>}
            {title && (
              <h1 className="font-serif text-4xl sm:text-6xl font-normal text-emerald-dark tracking-[-0.03em] leading-[1.05] text-balance">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-6 text-base sm:text-lg text-charcoal/60 leading-[1.75] text-pretty">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </div>
  );
}
