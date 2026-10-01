'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, FileText, Sparkles, X, ChevronUp } from 'lucide-react';
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
            className="flex flex-col gap-2 p-2 bg-[#FFFEFA]/95 backdrop-blur-md border border-gold/30 rounded-xl shadow-xl mb-1 w-52"
          >
            <div className="px-3 py-1.5 border-b border-gold/15">
              <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold block">
                Quick Inquiries
              </span>
              <span className="text-xs text-emerald-dark font-medium">
                Open in Dialog
              </span>
            </div>

            <button
              type="button"
              onClick={handleOpenQuote}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-emerald-dark hover:bg-gold/15 hover:text-emerald rounded-lg transition-colors text-left"
            >
              <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark">
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
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-emerald-dark hover:bg-gold/15 hover:text-emerald rounded-lg transition-colors text-left"
            >
              <div className="w-7 h-7 rounded-full bg-emerald/15 flex items-center justify-center text-emerald">
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
              className="flex items-center justify-between px-3 py-1.5 text-[11px] text-charcoal/60 hover:text-emerald transition-colors border-t border-gold/15 pt-2"
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
        className="flex items-center gap-2 px-4 py-3 bg-linear-to-r from-emerald-dark via-emerald to-emerald-dark text-[#FFFEFA] rounded-full shadow-lg border border-gold/40 hover:border-gold hover:shadow-gold/20 transition-all cursor-pointer group"
        aria-label="Open contact and quote options"
      >
        <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
        <span className="text-xs uppercase tracking-widest font-semibold text-gold-light group-hover:text-gold transition-colors">
          {isOpen ? 'Close' : 'Enquire'}
        </span>
        <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold-light ml-0.5">
          {isOpen ? <X className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
        </div>
      </motion.button>
    </div>
  );
}
