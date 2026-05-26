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
    <div className={cn("relative min-h-screen overflow-hidden bg-background text-foreground", className)}>
      <div className="pointer-events-none absolute inset-0 bg-emerald-radial" />
      <div className="pointer-events-none absolute inset-0 surface-grid opacity-40 [mask-image:radial-gradient(circle_at_center,white,transparent_78%)]" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      {children}
    </div>
  );
}

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
      {children}
    </div>
  );
}

export function GridDots() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle,rgba(110,231,183,0.18)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,white,transparent_82%)]"
    />
  );
}
