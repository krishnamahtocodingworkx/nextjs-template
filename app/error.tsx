"use client";

import { useEffect } from "react";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-red-600 mb-4">
                Application Error
              </h1>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Something went wrong!
              </h2>
              <p className="text-gray-600 mb-6">
                {error.message || "An unexpected error occurred in the application."}
              </p>
              {error.digest && (
                <p className="text-sm text-gray-500 mb-6">
                  Error ID: {error.digest}
                </p>
              )}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={reset}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Try again
                </button>
                <button
                  onClick={() => window.location.href = "/"}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Go home
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
