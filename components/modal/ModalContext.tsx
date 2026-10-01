'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface QuoteModalData {
  productName?: string;
  productId?: string;
}

interface ModalContextType {
  isQuoteOpen: boolean;
  isContactOpen: boolean;
  quoteData: QuoteModalData;
  openQuoteModal: (data?: QuoteModalData) => void;
  openContactModal: () => void;
  closeQuoteModal: () => void;
  closeContactModal: () => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [quoteData, setQuoteData] = useState<QuoteModalData>({});

  const openQuoteModal = useCallback((data?: QuoteModalData) => {
    setQuoteData(data || {});
    setIsContactOpen(false);
    setIsQuoteOpen(true);
  }, []);

  const openContactModal = useCallback(() => {
    setIsQuoteOpen(false);
    setIsContactOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsQuoteOpen(false);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsContactOpen(false);
  }, []);

  const closeAllModals = useCallback(() => {
    setIsQuoteOpen(false);
    setIsContactOpen(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isQuoteOpen,
        isContactOpen,
        quoteData,
        openQuoteModal,
        openContactModal,
        closeQuoteModal,
        closeContactModal,
        closeAllModals,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
