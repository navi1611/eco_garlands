import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'gold' | 'botanical' | 'cream' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  variant = 'emerald',
  size = 'md',
  className = '',
}: BadgeProps) {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider uppercase',
    md: 'text-xs px-2.5 py-1 tracking-wide',
  };

  const variantClasses = {
    emerald: 'bg-emerald/10 text-emerald border border-emerald/20',
    gold: 'bg-gold/15 text-gold-dark border border-gold/30',
    botanical: 'bg-botanical/20 text-charcoal border border-botanical/30',
    cream: 'bg-cream-soft text-emerald border border-emerald/10 shadow-xs',
    outline: 'bg-transparent text-charcoal border border-charcoal/20',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
