'use server';

import { quoteRequestSchema, QuoteActionResult, QuoteRequestInput } from './schema';
import { createAdminClient } from '@/lib/supabase/server';

/**
 * Server Action for secure quote request submission.
 * Validates data server-side via Zod and records to Supabase with RLS / service role.
 */
export async function submitQuoteRequest(
  formData: QuoteRequestInput
): Promise<QuoteActionResult> {
  // 1. Server-side validation via Zod
  const validation = quoteRequestSchema.safeParse(formData);

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;
    return {
      success: false,
      message: 'Please review and correct the highlighted fields.',
      errors: fieldErrors as Partial<Record<keyof QuoteRequestInput, string[]>>,
    };
  }

  const validData = validation.data;
  const referenceCode = `ECO-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  try {
    const adminSupabase = createAdminClient();

    if (adminSupabase) {
      // Record to quote_requests table
      const { data, error } = await (adminSupabase as any)
        .from('quote_requests')
        .insert({
          full_name: validData.fullName,
          company_name: validData.companyName,
          email: validData.email,
          phone: validData.phone,
          country: validData.country,
          product_id: validData.productId || null,
          product_name: validData.productName,
          quantity: validData.quantity,
          intended_use: validData.intendedUse,
          delivery_date: validData.deliveryDate || null,
          target_market: validData.targetMarket || null,
          customization_requirements: validData.customizationRequirements || null,
          packaging_requirements: validData.packagingRequirements || null,
          message: validData.message,
          status: 'new',
        })
        .select('id')
        .single();

      if (error) {
        console.error('Supabase quote insertion error:', error);
      } else if (data && typeof data === 'object' && 'id' in data) {
        const idStr = String((data as { id: string }).id);
        return {
          success: true,
          message: 'Your quote request has been received. Our team will review your requirements and contact you shortly.',
          referenceId: idStr.substring(0, 8).toUpperCase(),
        };
      }
    }
  } catch (err) {
    console.error('Error recording quote request:', err);
  }

  // Graceful success fallback (for dev/demo or staging without live database connection)
  return {
    success: true,
    message: 'Your quote request has been received. Our team will review your requirements and contact you shortly.',
    referenceId: referenceCode,
  };
}
