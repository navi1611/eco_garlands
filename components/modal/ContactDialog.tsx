'use client';

import React, { useState } from 'react';
import Dialog from '@/components/ui/Dialog';
import { useModal } from './ModalContext';
import Button from '@/components/ui/Button';
import { submitContactMessage, ContactFormData } from '@/lib/contact/mutations';
import { CheckCircle2 } from 'lucide-react';

export default function ContactDialog() {
  const { isContactOpen, closeContactModal, openQuoteModal } = useModal();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string[]>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError(null);
    setErrors({});

    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setIsSuccess(true);
        setReferenceId(res.referenceId || null);
      } else {
        if (res.errors) {
          setErrors(res.errors);
        }
        setServerError(res.message || 'Please check your information.');
      }
    } catch {
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setServerError(null);
    setIsSuccess(false);
  };

  return (
    <Dialog
      isOpen={isContactOpen}
      onClose={closeContactModal}
      badge="Direct Communication"
      title="Send an Enquiry"
      subtitle="Connect with our workshop coordinators and export desk to discuss natural garland requirements or specifications."
      maxWidth="2xl"
    >
      {isSuccess ? (
        <div className="py-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald/10 text-emerald mx-auto flex items-center justify-center border border-emerald/20">
            <CheckCircle2 className="w-8 h-8 text-emerald" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-medium text-emerald-dark">
              Enquiry Received Successfully
            </h3>
            <p className="text-sm text-charcoal/80 max-w-md mx-auto leading-relaxed">
              Thank you for reaching out to J The Divine Eco Valley. Our team has received your inquiry and will contact you via email or phone shortly.
            </p>
            {referenceId && (
              <div className="inline-block mt-3 px-4 py-1.5 rounded-sm bg-cream-soft border border-gold/30 text-xs font-mono text-emerald-dark font-medium">
                Reference ID: {referenceId}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              Send Another Message
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => {
                closeContactModal();
              }}
            >
              Close Window
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {serverError && (
            <div className="p-3.5 rounded-sm bg-red-50 border border-red-200 text-red-800 text-xs">
              {serverError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="dialog-contact-name"
                className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
              >
                Your Name *
              </label>
              <input
                id="dialog-contact-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Ananya Rao"
                className="w-full bg-[#FFFEFA] border border-gold/30 rounded-sm px-3.5 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
              />
              {errors.name && (
                <p className="text-[11px] text-red-600 mt-1">{errors.name[0]}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="dialog-contact-email"
                className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
              >
                Email Address *
              </label>
              <input
                id="dialog-contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. ananya@example.com"
                className="w-full bg-[#FFFEFA] border border-gold/30 rounded-sm px-3.5 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
              />
              {errors.email && (
                <p className="text-[11px] text-red-600 mt-1">{errors.email[0]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="dialog-contact-phone"
                className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
              >
                Phone / WhatsApp (Optional)
              </label>
              <input
                id="dialog-contact-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. +91 98765 43210"
                className="w-full bg-[#FFFEFA] border border-gold/30 rounded-sm px-3.5 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
              />
            </div>

            <div>
              <label
                htmlFor="dialog-contact-subject"
                className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
              >
                Subject / Topic *
              </label>
              <input
                id="dialog-contact-subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="e.g. Wedding Varmala / Export Inquiry"
                className="w-full bg-[#FFFEFA] border border-gold/30 rounded-sm px-3.5 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
              />
              {errors.subject && (
                <p className="text-[11px] text-red-600 mt-1">{errors.subject[0]}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="dialog-contact-message"
              className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
            >
              Message *
            </label>
            <textarea
              id="dialog-contact-message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Please describe your requirements, event timeline, or questions..."
              className="w-full bg-[#FFFEFA] border border-gold/30 rounded-sm px-3.5 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            />
            {errors.message && (
              <p className="text-[11px] text-red-600 mt-1">{errors.message[0]}</p>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gold/20">
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="text-xs text-gold-dark hover:text-gold font-medium underline underline-offset-4"
            >
              Need detailed pricing? Open Quote Form →
            </button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full sm:w-auto"
            >
              Send Enquiry
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
