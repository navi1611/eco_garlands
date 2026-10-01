'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, FileText, MessageCircle, X, ChevronUp } from 'lucide-react';
import { useModal } from '@/components/modal/ModalContext';

export default function FloatingActionWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { openQuoteModal, openContactModal } = useModal();

  const handleOpenQuote = () => {
    setIsOpen(false);
    openQuoteModal();
  };

  const handleOpenContact = () => {
    setIsOpen(false);
    openContactModal();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Expanded quick options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-1 p-2 bg-white/95 backdrop-blur-xl border border-line rounded-2xl shadow-[var(--shadow-lift)] mb-1 w-60"
          >
            <div className="px-3 pt-2 pb-2.5 border-b border-line">
              <span className="text-[10px] uppercase tracking-[0.22em] text-charcoal/45 font-medium block">
                How can we help?
              </span>
            </div>

            <button
              type="button"
              onClick={handleOpenQuote}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-emerald-dark hover:bg-canvas rounded-xl transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-canvas border border-line flex items-center justify-center text-emerald-dark">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block font-semibold">Request a Quote</span>
                <span className="text-[10px] text-charcoal/60">Pricing & Custom Order</span>
              </div>
            </button>

            <button
              type="button"
              onClick={handleOpenContact}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-emerald-dark hover:bg-canvas rounded-xl transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-canvas border border-line flex items-center justify-center text-emerald-dark">
                <MessageSquareText className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block font-semibold">Send Enquiry</span>
                <span className="text-[10px] text-charcoal/60">Workshop & Export Desk</span>
              </div>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center justify-between px-3 py-1.5 text-[11px] text-charcoal/60 hover:text-emerald transition-colors border-t border-line pt-2.5 mt-1"
            >
              <span>Scroll to top</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 pl-5 pr-2 h-12 bg-white text-emerald-dark border border-line rounded-full shadow-[0_12px_32px_-14px_rgba(19,59,45,0.35)] hover:border-sage-line transition-colors cursor-pointer"
        aria-label="Open contact and quote options"
      >
        <span className="text-[13px] font-medium tracking-wide">
          {isOpen ? 'Close' : 'Enquire'}
        </span>
        <span className="w-8 h-8 rounded-full bg-sage flex items-center justify-center">
          {isOpen ? <X className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
        </span>
      </motion.button>
    </div>
  );
}
