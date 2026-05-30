"use client";

import { useState } from "react";

export function CodeViewer({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard not available
    }
  }

  return (
    <div className="group relative">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 rounded-lg border border-sage/30 bg-white/80 px-2.5 py-1 text-[10px] font-medium text-ink-md opacity-0 transition-all group-hover:opacity-100 hover:border-teal/40 hover:text-green-dk"
        type="button"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
      <pre className="overflow-x-auto rounded-2xl border border-sage/25 bg-white/70 p-5 font-mono text-[12px] leading-6 text-ink-md shadow-sm sm:text-[13px]">
        <code>{content}</code>
      </pre>
    </div>
  );
}
