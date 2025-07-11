'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4 text-center">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-destructive">Something went wrong!</h2>
        <p className="text-muted-foreground">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="mt-6">
          <Button
            onClick={() => reset()}
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive/10"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
