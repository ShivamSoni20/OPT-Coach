import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "ghost";
} & ComponentPropsWithoutRef<"button">;

const baseClassName =
  "inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60";

export function Button({
  children,
  className,
  href,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const variantClassName =
    variant === "primary"
      ? "bg-primary text-primary-foreground shadow-glow motion-safe:hover:bg-primary/90"
      : "border border-border bg-background/40 text-foreground motion-safe:hover:border-primary/40 motion-safe:hover:bg-accent";

  if (href) {
    return (
      <Link className={cn(baseClassName, variantClassName, className)} href={href}>
        <span className={variant === "primary" ? "bg-[length:200%_100%] motion-safe:animate-shimmer bg-gradient-to-r from-transparent via-white/15 to-transparent px-0.5" : ""}>
          {children}
        </span>
      </Link>
    );
  }

  return (
    <button
      className={cn(baseClassName, variantClassName, className)}
      type={type}
      {...props}
    >
      <span className={variant === "primary" ? "bg-[length:200%_100%] motion-safe:animate-shimmer bg-gradient-to-r from-transparent via-white/15 to-transparent px-0.5" : ""}>
        {children}
      </span>
    </button>
  );
}
