import { z } from 'zod';

export const quoteRequestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(100, { message: 'Full name cannot exceed 100 characters.' }),
  companyName: z
    .string()
    .trim()
    .min(2, { message: 'Company or organization name is required.' })
    .max(150, { message: 'Company name cannot exceed 150 characters.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please provide a valid email address.' }),
  phone: z
    .string()
    .trim()
    .min(7, { message: 'Please enter a valid phone or WhatsApp number.' })
    .max(25, { message: 'Phone number cannot exceed 25 characters.' }),
  country: z
    .string()
    .trim()
    .min(2, { message: 'Please provide your destination country.' })
    .max(80, { message: 'Country name cannot exceed 80 characters.' }),
  productId: z.string().optional().nullable(),
  productName: z
    .string()
    .trim()
    .min(2, { message: 'Please specify the garland or collection.' }),
  quantity: z
    .string()
    .trim()
    .min(1, { message: 'Please specify the required quantity or batch size.' }),
  intendedUse: z
    .string()
    .trim()
    .min(2, { message: 'Please specify the intended use or occasion.' }),
  deliveryDate: z.string().trim().optional(),
  targetMarket: z.string().trim().optional(),
  customizationRequirements: z.string().trim().optional(),
  packagingRequirements: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters long.' })
    .max(3000, { message: 'Message cannot exceed 3000 characters.' }),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export type QuoteActionResult = {
  success: boolean;
  message: string;
  referenceId?: string;
  errors?: Partial<Record<keyof QuoteRequestInput, string[]>>;
};
