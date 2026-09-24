import React from 'react';
import type { Metadata } from 'next';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Contact Desk — J The Divine Eco Valley',
  description:
    'Reach the artisan and commercial export desks of J The Divine Eco Valley for garland orders, custom specifications, and international distribution.',
};

export default function ContactPage() {
  return (
    <div className="bg-cream">
      <PageContainer
        badge="Direct Communication"
        title="Contact J The Divine Eco Valley"
        subtitle="Connect with our workshop coordinators and export desk to discuss natural garland requirements, international freight, and custom specifications."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Contact Channels (Clear editable placeholders) */}
          <div className="lg:col-span-5 space-y-8 bg-cream-soft p-8 sm:p-10 rounded-sm border border-gold/25 shadow-xs">
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

            <div className="space-y-6 pt-4 border-t border-gold/20">
              {/* Workshop & Registered Address Placeholder */}
              <div>
                <span className="text-xs uppercase tracking-wider text-charcoal/60 font-medium block">
                  Workshop & Registered Address
                </span>
                <p className="text-sm text-emerald-dark font-medium mt-1">
                  [Company Registered Address Placeholder]
                </p>
                <p className="text-xs text-charcoal/70">
                  Cardamom Hills / Spice Cultivation Valley, India
                </p>
              </div>

              {/* Email Channels Placeholder */}
              <div>
                <span className="text-xs uppercase tracking-wider text-charcoal/60 font-medium block">
                  Commercial & General Inquiries
                </span>
                <p className="text-sm text-emerald-dark font-medium mt-1">
                  [contact@jdivineecovalley.com — Editable Placeholder]
                </p>
                <p className="text-xs text-charcoal/70">
                  Export Desk: [export@jdivineecovalley.com — Editable Placeholder]
                </p>
              </div>

              {/* Telephone & WhatsApp Placeholder */}
              <div>
                <span className="text-xs uppercase tracking-wider text-charcoal/60 font-medium block">
                  Telephone & WhatsApp Desk
                </span>
                <p className="text-sm text-emerald-dark font-medium mt-1">
                  [+91 00000 00000 — Phone Placeholder]
                </p>
                <p className="text-xs text-charcoal/70">
                  WhatsApp Commercial Line: [+91 00000 00000 — Placeholder]
                </p>
              </div>

              {/* Business Hours Placeholder */}
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

            <div className="pt-4 border-t border-gold/20">
              <span className="text-[11px] uppercase tracking-wider text-charcoal/60 block mb-2">
                Fast-Track Commercial Requirements:
              </span>
              <Button href="/quote" variant="primary" size="md" className="w-full text-center">
                Submit Formal Quote Request
              </Button>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-cream-soft p-8 sm:p-10 rounded-sm border border-gold/25 shadow-xs">
            <h3 className="font-serif text-2xl font-medium text-emerald-dark mb-2">
              Send an Enquiry
            </h3>
            <p className="text-sm text-charcoal/75 mb-6">
              Leave your inquiry below. For detailed quantity quotations with pricing, please use our dedicated Quote Request form.
            </p>

            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Ananya Rao"
                    className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. ananya@example.com"
                    className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
                >
                  Subject / Nature of Inquiry
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="e.g. Wedding Varmala Availability / International Export Inquiry"
                  className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  placeholder="Please write your questions or details..."
                  className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                />
              </div>

              <div className="pt-2">
                <Button type="button" variant="secondary" size="md">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
