'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/supabase/types';
import { submitQuoteRequest } from '@/lib/quotes/mutations';
import { QuoteRequestInput } from '@/lib/quotes/schema';
import FormField from './FormField';
import ProductSelector from './ProductSelector';
import QuoteSuccess from './QuoteSuccess';
import Button from '@/components/ui/Button';

interface QuoteFormProps {
  products: Product[];
  initialProduct?: string;
  initialProductId?: string;
}

export default function QuoteForm({
  products,
  initialProduct = '',
  initialProductId = '',
}: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteRequestInput>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    productName: initialProduct,
    productId: initialProductId || null,
    quantity: '',
    intendedUse: '',
    deliveryDate: '',
    targetMarket: '',
    customizationRequirements: '',
    packagingRequirements: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteRequestInput, string[]>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState<string | undefined>(undefined);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific field error on typing
    if (errors[name as keyof QuoteRequestInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleProductChange = (name: string, id?: string) => {
    setFormData((prev) => ({
      ...prev,
      productName: name,
      productId: id || null,
    }));
    if (errors.productName) {
      setErrors((prev) => ({ ...prev, productName: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError(null);
    setErrors({});

    try {
      const result = await submitQuoteRequest(formData);

      if (result.success) {
        setIsSuccess(true);
        setReferenceId(result.referenceId);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        }
        setServerError(result.message || 'Please check the form for errors.');
      }
    } catch {
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      country: '',
      productName: '',
      productId: null,
      quantity: '',
      intendedUse: '',
      deliveryDate: '',
      targetMarket: '',
      customizationRequirements: '',
      packagingRequirements: '',
      message: '',
    });
    setErrors({});
    setServerError(null);
    setIsSuccess(false);
  };

  if (isSuccess) {
    return <QuoteSuccess referenceId={referenceId} onReset={handleReset} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cream-soft border border-gold/30 rounded-sm p-6 sm:p-10 lg:p-12 shadow-sm space-y-8"
      noValidate
    >
      {serverError && (
        <div className="p-4 rounded-xs bg-red-50 border border-red-300 text-red-800 text-sm">
          {serverError}
        </div>
      )}

      {/* Section 1: Contact & Entity Information */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-medium text-emerald-dark border-b border-gold/20 pb-2">
          1. Contact & Organization Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Full Name"
            name="fullName"
            required
            error={errors.fullName?.[0]}
          >
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="e.g. Priyanshu Sharma"
              className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            />
          </FormField>

          <FormField
            label="Company / Organization"
            name="companyName"
            required
            error={errors.companyName?.[0]}
          >
            <input
              id="companyName"
              name="companyName"
              type="text"
              required
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="e.g. Vedic Heritage Imports / Private"
              className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            />
          </FormField>

          <FormField
            label="Corporate / Personal Email"
            name="email"
            required
            error={errors.email?.[0]}
          >
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g. priyanshu@example.com"
              className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            />
          </FormField>

          <FormField
            label="Phone / WhatsApp (with country code)"
            name="phone"
            required
            error={errors.phone?.[0]}
          >
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="e.g. +91 98765 43210 / +1 (555) 019-2831"
              className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField
              label="Destination Country"
              name="country"
              required
              error={errors.country?.[0]}
              helperText="Destination country for shipping, air cargo, and phytosanitary clearance."
            >
              <input
                id="country"
                name="country"
                type="text"
                required
                value={formData.country}
                onChange={handleInputChange}
                placeholder="e.g. India, United States, United Kingdom, UAE, Singapore, Canada..."
                className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Section 2: Garland Specifications */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-medium text-emerald-dark border-b border-gold/20 pb-2">
          2. Garland Requirements & Intended Use
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <ProductSelector
              products={products}
              selectedProductName={formData.productName}
              onChange={handleProductChange}
              error={errors.productName?.[0]}
            />
          </div>

          <FormField
            label="Estimated Quantity / Pieces"
            name="quantity"
            required
            error={errors.quantity?.[0]}
            helperText="e.g. 2 pieces (Pair for wedding), 25 pieces (Event), 100+ (Export batch)"
          >
            <input
              id="quantity"
              name="quantity"
              type="text"
              required
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="e.g. 2 pairs, 50 units, 100 pieces"
              className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            />
          </FormField>

          <FormField
            label="Intended Use / Occasion"
            name="intendedUse"
            required
            error={errors.intendedUse?.[0]}
          >
            <input
              id="intendedUse"
              name="intendedUse"
              type="text"
              required
              value={formData.intendedUse}
              onChange={handleInputChange}
              placeholder="e.g. Wedding Varmala, Temple Deity, Resort Entrance, Gifting"
              className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            />
          </FormField>
        </div>
      </div>

      {/* Section 3: Delivery & Customization Specifications (Optional) */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-medium text-emerald-dark border-b border-gold/20 pb-2">
          3. Logistics & Customization (Optional)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Preferred Delivery / Event Date"
            name="deliveryDate"
            error={errors.deliveryDate?.[0]}
          >
            <input
              id="deliveryDate"
              name="deliveryDate"
              type="date"
              value={formData.deliveryDate || ''}
              onChange={handleInputChange}
              className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            />
          </FormField>

          <FormField
            label="Target Market / Region"
            name="targetMarket"
            error={errors.targetMarket?.[0]}
          >
            <input
              id="targetMarket"
              name="targetMarket"
              type="text"
              value={formData.targetMarket || ''}
              onChange={handleInputChange}
              placeholder="e.g. North America, GCC / Gulf, Domestic India, Europe"
              className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            />
          </FormField>

          <FormField
            label="Customization Specifications"
            name="customizationRequirements"
            error={errors.customizationRequirements?.[0]}
            helperText="Custom length, diameter, specific spice mix (clove, star anise, nutmeg), cord color."
          >
            <input
              id="customizationRequirements"
              name="customizationRequirements"
              type="text"
              value={formData.customizationRequirements || ''}
              onChange={handleInputChange}
              placeholder="e.g. 5 feet length, extra gold thread rosettes"
              className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            />
          </FormField>

          <FormField
            label="Packaging Requirements"
            name="packagingRequirements"
            error={errors.packagingRequirements?.[0]}
            helperText="Individual presentation boxes, bulk transit packaging, or export pallets."
          >
            <input
              id="packagingRequirements"
              name="packagingRequirements"
              type="text"
              value={formData.packagingRequirements || ''}
              onChange={handleInputChange}
              placeholder="e.g. Individual velvet keepsake boxes"
              className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            />
          </FormField>
        </div>
      </div>

      {/* Section 4: Project Message */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-medium text-emerald-dark border-b border-gold/20 pb-2">
          4. Detailed Requirements
        </h3>

        <FormField
          label="Message & Detailed Notes"
          name="message"
          required
          error={errors.message?.[0]}
          helperText="Please share any specific event dates, cultural requirements, or custom dimensions."
        >
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Describe your requirements, celebration schedule, or commercial export needs in detail..."
            className="w-full bg-cream border border-gold/30 rounded-sm px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
          />
        </FormField>
      </div>

      {/* Submit Button & Assurance */}
      <div className="pt-4 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-charcoal/60 text-center sm:text-left">
          Protected commercial submission • J The Divine Eco Valley
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full sm:w-auto"
        >
          Submit Quote Request
        </Button>
      </div>
    </form>
  );
}
