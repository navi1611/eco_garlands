'use client';

import React, { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/lib/products/data';

interface ProductFiltersProps {
  currentCategory?: string;
  currentSearch?: string;
  currentOccasion?: string;
}

export default function ProductFilters({
  currentCategory = 'All',
  currentSearch = '',
  currentOccasion = '',
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchVal, setSearchVal] = useState(currentSearch);
  const [occasionVal, setOccasionVal] = useState(currentOccasion);

  const updateFilters = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === '' || value === 'All') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchVal });
  };

  const handleCategoryClick = (category: string) => {
    updateFilters({ category });
  };

  const handleClearFilters = () => {
    setSearchVal('');
    setOccasionVal('');
    startTransition(() => {
      router.push('/products');
    });
  };

  const hasActiveFilters =
    (currentCategory && currentCategory !== 'All') ||
    Boolean(currentSearch) ||
    Boolean(currentOccasion);

  return (
    <div className="space-y-6 mb-12 bg-cream-soft p-6 rounded-xl border border-line shadow-xs">
      {/* Search and Occasion Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="md:col-span-6 lg:col-span-7">
          <label
            htmlFor="product-search"
            className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
          >
            Search Garlands & Ingredients
          </label>
          <div className="relative">
            <input
              id="product-search"
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="e.g. Cardamom, Nutmeg, Varmala, Temple..."
              className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-emerald-dark placeholder-charcoal/40 focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
            />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gold-dark hover:text-emerald px-2 py-1 cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        {/* Occasion / Application Quick Filter */}
        <div className="md:col-span-4 lg:col-span-3">
          <label
            htmlFor="occasion-filter"
            className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-1.5"
          >
            Occasion / Event
          </label>
          <select
            id="occasion-filter"
            value={occasionVal}
            onChange={(e) => {
              setOccasionVal(e.target.value);
              updateFilters({ occasion: e.target.value });
            }}
            className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-emerald-dark focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold cursor-pointer"
          >
            <option value="">All Occasions</option>
            <option value="Wedding">Wedding & Varmala</option>
            <option value="Puja">Temple & Puja</option>
            <option value="Home">Home & Entrance</option>
            <option value="Festival">Festivals & Celebrations</option>
            <option value="Hospitality">VIP & Hospitality</option>
            <option value="Gifting">Milestone Gifting</option>
          </select>
        </div>

        {/* Reset / Status */}
        <div className="md:col-span-2 lg:col-span-2 flex items-end">
          {hasActiveFilters ? (
            <button
              onClick={handleClearFilters}
              className="w-full py-2.5 px-3 text-xs uppercase tracking-wider text-charcoal/80 hover:text-red-700 border border-charcoal/20 hover:border-red-400 rounded-xl transition-colors cursor-pointer bg-cream"
            >
              Reset Filters
            </button>
          ) : (
            <div className="text-xs text-charcoal/50 pb-2.5 italic">
              Showing All Items
            </div>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div>
        <span className="block text-xs uppercase tracking-wider text-charcoal/70 font-medium mb-2">
          Category
        </span>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected =
              currentCategory === cat || (!currentCategory && cat === 'All');
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                disabled={isPending}
                className={`text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-sage text-emerald-dark font-semibold border border-sage-line'
                    : 'bg-cream text-charcoal/80 hover:text-emerald border border-line hover:border-gold'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {isPending && (
        <div className="text-xs text-gold-dark italic">Updating catalog...</div>
      )}
    </div>
  );
}
