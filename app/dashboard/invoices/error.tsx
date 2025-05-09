'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center text-lg font-semibold text-red-600">
        Something went wrong!
      </h2>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
      >
        Try Again
      </button>
    </main>
  );
}
