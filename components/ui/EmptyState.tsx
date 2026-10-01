import React from 'react';
import Button from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = 'No products found',
  description = 'Try adjusting your search or category filters to find what you are looking for.',
  actionText = 'Reset Filters',
  actionHref,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 my-8 border border-dashed border-botanical/40 rounded-xl bg-cream-soft">
      <div className="w-16 h-16 mb-4 rounded-full bg-cream flex items-center justify-center text-botanical">
        {icon || (
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        )}
      </div>
      <h3 className="font-serif text-2xl text-emerald font-medium mb-2">
        {title}
      </h3>
      <p className="text-charcoal/70 text-sm max-w-md mb-6">{description}</p>
      {(actionHref || onAction) && (
        <Button
          variant="outline"
          size="md"
          href={actionHref}
          onClick={onAction}
        >
          {actionText}
        </Button>
      )}
    </div>
  );
}
