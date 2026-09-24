import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
}

export default function FormField({
  label,
  name,
  required = false,
  error,
  helperText,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="block text-xs uppercase tracking-wider text-charcoal/80 font-medium"
        >
          {label} {required && <span className="text-gold-dark font-bold">*</span>}
        </label>
        {required ? (
          <span className="text-[10px] uppercase tracking-wider text-gold-dark font-medium">
            Required
          </span>
        ) : (
          <span className="text-[10px] uppercase tracking-wider text-charcoal/40">
            Optional
          </span>
        )}
      </div>

      {children}

      {error ? (
        <p className="text-xs text-red-600 font-medium mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-charcoal/50 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
}
