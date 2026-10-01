'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

const maxWidthMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
};

export default function Dialog({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  children,
  maxWidth = '2xl',
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape & Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop with frosted blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 bg-white/40 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            className={`relative w-full ${maxWidthMap[maxWidth]} bg-white border border-line rounded-lg shadow-2xl overflow-hidden my-auto z-10 max-h-[92vh] flex flex-col`}
          >
            {/* Header */}
            <div className="relative px-6 py-5 sm:px-8 sm:py-6 border-b border-line bg-linear-to-r from-cream-soft via-white to-cream-soft flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-1 pr-6">
                {badge && (
                  <span className="inline-block text-[11px] uppercase tracking-widest font-semibold text-gold-dark px-2.5 py-0.5 rounded-full border border-line-strong bg-gold/10">
                    {badge}
                  </span>
                )}
                {title && (
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-emerald-dark tracking-tight leading-snug">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 p-2 rounded-full text-emerald-dark/70 hover:text-emerald-dark hover:bg-gold/15 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto overscroll-contain flex-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
