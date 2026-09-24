import { createClient } from '@/lib/supabase/server';
import { Product } from '@/lib/supabase/types';
import { SAMPLE_PRODUCTS } from './data';

interface GetProductsOptions {
  category?: string;
  search?: string;
  occasion?: string;
  limit?: number;
}

/**
 * Server-side product queries with graceful fallback.
 * Queries Supabase when configured, otherwise serves sample products.
 */
export async function getProducts(options: GetProductsOptions = {}): Promise<Product[]> {
  const { category, search, occasion, limit } = options;

  try {
    const supabase = await createClient();

    if (supabase) {
      let query = supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      if (search && search.trim() !== '') {
        const searchTerm = `%${search.trim()}%`;
        query = query.or(
          `name.ilike.${searchTerm},description.ilike.${searchTerm},base_material.ilike.${searchTerm}`
        );
      }

      if (occasion && occasion.trim() !== '') {
        query = query.ilike('occasion', `%${occasion}%`);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        return data as Product[];
      }
    }
  } catch (error) {
    console.warn('Supabase query failed, falling back to local dataset:', error);
  }

  // Local fallback filtering
  let filtered = SAMPLE_PRODUCTS.filter((p) => p.active);

  if (category && category !== 'All') {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search && search.trim() !== '') {
    const term = search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.base_material.toLowerCase().includes(term) ||
        p.materials.some((m) => m.toLowerCase().includes(term))
    );
  }

  if (occasion && occasion.trim() !== '') {
    const occ = occasion.toLowerCase();
    filtered = filtered.filter(
      (p) => p.occasion && p.occasion.toLowerCase().includes(occ)
    );
  }

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return filtered;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient();

    if (supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('active', true)
        .single();

      if (!error && data) {
        return data as Product;
      }
    }
  } catch (error) {
    console.warn('Supabase getProductBySlug failed, checking local dataset:', error);
  }

  const found = SAMPLE_PRODUCTS.find((p) => p.slug === slug && p.active);
  return found || null;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  try {
    const supabase = await createClient();

    if (supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .eq('featured', true)
        .order('sort_order', { ascending: true })
        .limit(limit);

      if (!error && data && data.length > 0) {
        return data as Product[];
      }
    }
  } catch (error) {
    console.warn('Supabase getFeaturedProducts failed, using local dataset:', error);
  }

  return SAMPLE_PRODUCTS.filter((p) => p.active && p.featured).slice(0, limit);
}

export async function getRelatedProducts(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<Product[]> {
  const all = await getProducts({ category });
  return all.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
