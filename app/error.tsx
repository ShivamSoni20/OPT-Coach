"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ee] px-4 text-center font-sans">
      <div className="mb-4 text-4xl">⚠️</div>
      <h2 className="font-display text-[28px] text-ink">Something went wrong</h2>
      <p className="mt-3 max-w-sm text-[14px] text-ink-lt">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-xl bg-ink px-6 py-3 text-[14px] font-medium text-white transition-all hover:-translate-y-0.5"
      >
        Try again
      </button>
    </div>
  );
}
