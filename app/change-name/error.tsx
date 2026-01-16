"use client";

import { useEffect } from "react";

export default function ChangeNameError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
  }, [error]);

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-red-800 mb-2">
          Something went wrong!
        </h2>
        <p className="text-red-600 mb-4">
          {error.message || "An unexpected error occurred while loading the change name page."}
        </p>
        {error.digest && (
          <p className="text-sm text-red-500 mb-4">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.href = "/"}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}
