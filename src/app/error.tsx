'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-destructive">Something went wrong!</h1>
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
              <a href="/" className="ml-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline text-primary h-10 px-4 py-2">
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
