'use client';

import React from 'react';
import Link from 'next/link';
import { useModal } from '@/components/modal/ModalContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold-outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  openInDialog?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'right',
  isLoading = false,
  className = '',
  disabled,
  openInDialog,
  onClick,
  ...props
}: ButtonProps) {
  let modalContext: ReturnType<typeof useModal> | null = null;
  try {
    modalContext = useModal();
  } catch {
    // If rendered outside ModalProvider (e.g. static tests), fall back cleanly
    modalContext = null;
  }

  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide cursor-pointer';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-gold text-emerald-dark hover:bg-gold-light hover:shadow-md active:bg-gold-dark font-semibold',
    secondary:
      'bg-emerald text-[#FFFEFA] hover:bg-emerald-dark hover:shadow-md active:bg-charcoal',
    outline:
      'border border-emerald text-emerald hover:bg-emerald hover:text-[#FFFEFA] active:bg-emerald-dark',
    'gold-outline':
      'border border-gold text-gold hover:bg-gold hover:text-emerald-dark active:bg-gold-light',
    ghost:
      'text-emerald hover:bg-emerald/10 active:bg-emerald/20',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && icon && iconPosition === 'left' && <span>{icon}</span>}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span>{icon}</span>}
    </>
  );

  const shouldOpenDialog =
    openInDialog !== false &&
    modalContext !== null &&
    (openInDialog === true ||
      Boolean(href && (href.startsWith('/quote') || href === '/contact')));

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldOpenDialog && href && modalContext) {
      if (href.startsWith('/quote')) {
        e.preventDefault();
        try {
          const url = new URL(href, 'https://jdivineecovalley.com');
          const productName = url.searchParams.get('product') || undefined;
          const productId = url.searchParams.get('productId') || undefined;
          modalContext.openQuoteModal({ productName, productId });
          return;
        } catch {
          modalContext.openQuoteModal();
          return;
        }
      }
      if (href === '/contact') {
        e.preventDefault();
        modalContext.openContactModal();
        return;
      }
    }
  };

  if (href) {
    return (
      <Link href={href} onClick={handleLinkClick} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}
