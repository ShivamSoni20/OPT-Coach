"use client";

import { useState } from "react";

export function SharePanel({
  brainId,
  shareUrl,
}: {
  brainId: string;
  shareUrl: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-2xl border border-sage/25 bg-white/60 p-4">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-green-dk">
        Share
      </p>
      <p className="mb-3 text-[12px] leading-5 text-ink-lt">
        Share the read-only view with teammates or use the API URL in an agent workflow.
      </p>
      <div className="mb-3 break-all rounded-xl border border-sage/25 bg-[#f7f4ee] p-2.5 font-mono text-[10px] text-ink-md">
        {shareUrl}
      </div>
      <div className="flex flex-col gap-2">
        <button
          className="inline-flex min-h-9 items-center justify-center rounded-xl border border-sage/30 bg-white/60 px-3 text-[12px] font-medium text-ink-md transition-all hover:border-teal/35 hover:bg-teal-pale hover:text-green-dk"
          onClick={handleCopy}
          type="button"
        >
          {copied ? "Copied ✓" : "Copy share URL"}
        </button>
        <a
          className="inline-flex min-h-9 items-center justify-center rounded-xl border border-sage/30 bg-white/60 px-3 text-[12px] font-medium text-ink-md transition-all hover:border-teal/35 hover:bg-teal-pale hover:text-green-dk"
          href={`/brain/${brainId}/share`}
          target="_blank"
          rel="noreferrer"
        >
          Open share page ↗
        </a>
        <a
          className="inline-flex min-h-9 items-center justify-center rounded-xl bg-ink px-3 text-[12px] font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-md"
          href={`/brain/${brainId}?tab=api`}
        >
          View API payload
        </a>
      </div>
    </div>
  );
}
