'use client';

import React from 'react';
import { Product } from '@/lib/supabase/types';

interface ProductSelectorProps {
  products: Product[];
  selectedProductName: string;
  onChange: (name: string, id?: string) => void;
  error?: string;
}

export default function ProductSelector({
  products,
  selectedProductName,
  onChange,
  error,
}: ProductSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const matched = products.find((p) => p.name === val);
    onChange(val, matched?.id);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor="productName"
          className="block text-xs uppercase tracking-wider text-charcoal/80 font-medium"
        >
          Selected Garland / Collection <span className="text-gold-dark font-bold">*</span>
        </label>
        <span className="text-[10px] uppercase tracking-wider text-gold-dark font-medium">
          Required
        </span>
      </div>

      <select
        id="productName"
        name="productName"
        value={selectedProductName}
        onChange={handleChange}
        className={`w-full bg-cream border rounded-xl px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold cursor-pointer ${
          error ? 'border-red-400' : 'border-line'
        }`}
      >
        <option value="">Select a garland or specify bespoke inquiry...</option>
        <optgroup label="Catalog Garlands">
          {products.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name} ({p.category})
            </option>
          ))}
        </optgroup>
        <optgroup label="Custom Formulations">
          <option value="Bespoke Wedding Varmala Set (Custom Spices)">
            Bespoke Wedding Varmala Set (Custom Spices)
          </option>
          <option value="Custom Temple Sanctum Alankaram (Volume Order)">
            Custom Temple Sanctum Alankaram (Volume Order)
          </option>
          <option value="Bulk Hospitality & VIP Welcome Consignment">
            Bulk Hospitality & VIP Welcome Consignment
          </option>
          <option value="General Commercial Export Consultation">
            General Commercial Export Consultation
          </option>
        </optgroup>
      </select>

      {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
    </div>
  );
}
