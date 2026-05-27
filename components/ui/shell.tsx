import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function ScreenShell({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative min-h-screen overflow-hidden bg-[#f7f4ee] font-sans text-ink", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full blur-[80px]"
        style={{
          background: "radial-gradient(circle, rgba(77,200,189,.13), transparent 70%)",
          animation: "floatBlob 12s ease-in-out infinite"
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full blur-[70px]"
        style={{
          background: "radial-gradient(circle, rgba(184,212,176,.16), transparent 70%)",
          animation: "floatBlob 16s ease-in-out infinite"
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-[60px]"
        style={{
          background: "radial-gradient(circle, rgba(221,200,154,.1), transparent 70%)",
          animation: "floatBlob 20s ease-in-out infinite"
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 surface-grid opacity-40"
        style={{ maskImage: "radial-gradient(circle at center, white, transparent 78%)" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-gradient-to-r from-teal-pale to-sage-pale px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-green-dk">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal animate-pulseLine" />
      {children}
    </div>
  );
}

export function GridDots() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-35"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(77,200,189,.14) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        maskImage: "linear-gradient(to bottom, white, transparent 82%)"
      }}
    />
  );
}

export function PageNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-sage/30 bg-[rgba(247,244,238,.88)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-teal to-green-dk text-base shadow-glow">
            🧠
          </div>
          <div>
            <p className="font-display text-[15px] text-ink">OPT Coach</p>
            <p className="text-[10px] tracking-wide text-ink-lt">Company Brain Builder</p>
          </div>
        </div>
        <SectionBadge>OpenAI x Outskill Hackathon</SectionBadge>
        <div className="flex items-center gap-2">
          <a
            className="inline-flex min-h-9 items-center rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href="/onboard"
          >
            Get started →
          </a>
        </div>
      </div>
    </header>
  );
}
