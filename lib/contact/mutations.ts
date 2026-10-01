'use server';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactActionResult {
  success: boolean;
  message: string;
  referenceId?: string;
  errors?: Partial<Record<keyof ContactFormData, string[]>>;
}

export async function submitContactMessage(
  data: ContactFormData
): Promise<ContactActionResult> {
  const errors: Partial<Record<keyof ContactFormData, string[]>> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = ['Please provide your name (at least 2 characters).'];
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = ['Please provide a valid email address.'];
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = ['Please provide a subject for your enquiry.'];
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = ['Please write a message with at least 10 characters.'];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please review and fix the highlighted fields.',
      errors,
    };
  }

  const ref = `ENQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  // Log contact enquiry
  console.log('Contact inquiry received:', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    reference: ref,
  });

  return {
    success: true,
    message: 'Your message has been sent successfully. Our team will contact you shortly.',
    referenceId: ref,
  };
}
