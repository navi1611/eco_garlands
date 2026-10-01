import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-botanical/20 rounded-xl ${className}`}
    />
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="w-full space-y-6">
      <Skeleton className="h-8 w-1/3" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border border-botanical/20 bg-cream-soft p-4 rounded-xl space-y-4"
          >
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
