'use client';

import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import { submitContactMessage, ContactFormData } from '@/lib/contact/mutations';
import { useModal } from '@/components/modal/ModalContext';
import { CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const { openQuoteModal, openContactModal } = useModal();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
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
      subject: '',
      message: '',
    });
    setErrors({});
    setServerError(null);
    setIsSuccess(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <PageContainer
        badge="Direct Communication"
        title="Contact J The Divine Eco Valley"
        subtitle="Connect with our workshop coordinators and export desk to discuss natural garland requirements, international freight, and custom specifications."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Contact Channels */}
          <div className="lg:col-span-5 space-y-8 bg-canvas p-8 sm:p-10 rounded-xl border border-line shadow-xs">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-dark font-medium block">
                Brand Headquarters
              </span>
              <h2 className="font-serif text-2xl font-medium text-emerald-dark mt-1">
                J The Divine Eco Valley
              </h2>
              <p className="text-xs text-charcoal/60 mt-1">
                Natural Botanical & Spice Garland Exporters
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-line">
              <div>
                <span className="text-xs uppercase tracking-wider text-charcoal/60 font-medium block">
                  Workshop & Registered Address
                </span>
                <p className="text-sm text-emerald-dark font-medium mt-1">
                  Cardamom Hills Craft Workshop
                </p>
                <p className="text-xs text-charcoal/70">
                  Western Ghats Spice Cultivation Belt, India
                </p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-charcoal/60 font-medium block">
                  Commercial & General Inquiries
                </span>
                <p className="text-sm text-emerald-dark font-medium mt-1">
                  contact@jdivineecovalley.com
                </p>
                <p className="text-xs text-charcoal/70">
                  Export Desk: export@jdivineecovalley.com
                </p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-charcoal/60 font-medium block">
                  Telephone & WhatsApp Desk
                </span>
                <p className="text-sm text-emerald-dark font-medium mt-1">
                  +91 98400 12345
                </p>
                <p className="text-xs text-charcoal/70">
                  WhatsApp Commercial Coordination Available
                </p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-charcoal/60 font-medium block">
                  Business & Dispatch Hours
                </span>
                <p className="text-sm text-emerald-dark font-medium mt-1">
                  Monday – Saturday: 09:30 AM – 06:30 PM IST
                </p>
                <p className="text-xs text-charcoal/70">
                  Closed on Sundays and major public holidays
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-line space-y-3">
              <span className="text-[11px] uppercase tracking-wider text-charcoal/60 block">
                Instant Dialog Forms:
              </span>
              <Button
                type="button"
                variant="primary"
                size="md"
                className="w-full text-center"
                onClick={() => openQuoteModal()}
              >
                Open Quote Dialog
              </Button>
              <Button
                type="button"
                variant="outline"
                size="md"
                className="w-full text-center"
                onClick={() => openContactModal()}
              >
                Open Quick Enquiry Dialog
              </Button>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-canvas p-8 sm:p-10 rounded-xl border border-line shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-2xl font-medium text-emerald-dark">
                Send an Enquiry
              </h3>
              <button
                type="button"
                onClick={() => openContactModal()}
                className="text-xs text-gold-dark hover:text-gold font-medium flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open in Dialog</span>
              </button>
            </div>
            <p className="text-sm text-charcoal/75 mb-6">
              Leave your inquiry below or open in a dialog modal. For detailed quantity quotations with pricing, please use our dedicated Quote Request.
            </p>

            {isSuccess ? (
              <div className="p-8 text-center bg-white rounded-lg border border-line space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald mx-auto" />
                <h4 className="font-serif text-2xl font-medium text-emerald-dark">
                  Message Sent Successfully
                </h4>
                <p className="text-sm text-charcoal/80 max-w-md mx-auto">
                  Thank you for reaching out to J The Divine Eco Valley. Our workshop coordinators will contact you shortly.
                </p>
                {referenceId && (
                  <div className="inline-block px-3 py-1 bg-cream-soft rounded text-xs font-mono text-emerald-dark border border-line">
                    Reference: {referenceId}
                  </div>
                )}
                <div className="pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {serverError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
                    {serverError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Ananya Rao"
                      className="w-full bg-white border border-line rounded-xl px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.name[0]}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. ananya@example.com"
                      className="w-full bg-white border border-line rounded-xl px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.email[0]}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
                  >
                    Subject / Nature of Inquiry *
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Wedding Varmala Availability / International Export Inquiry"
                    className="w-full bg-white border border-line rounded-xl px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.subject[0]}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please write your questions or details..."
                    className="w-full bg-white border border-line rounded-xl px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.message[0]}</p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Button
                    type="submit"
                    variant="secondary"
                    size="md"
                    isLoading={isLoading}
                  >
                    Send Message
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => openQuoteModal()}
                  >
                    Need a Quote instead?
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
