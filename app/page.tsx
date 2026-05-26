import { BentoFeatures } from "@/components/landing/bento-features";
import { HeroSection } from "@/components/landing/hero";
import { StatsRow } from "@/components/landing/stats-row";
import { TypeMarquee } from "@/components/landing/type-marquee";
import { GridDots, ScreenShell, SectionBadge } from "@/components/ui/shell";

export default function LandingPage() {
  return (
    <ScreenShell>
      <GridDots />
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 font-semibold text-primary">
              OPT
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">OPT Coach</p>
              <p className="text-xs text-muted-foreground">Company Brain builder</p>
            </div>
          </div>
          <SectionBadge>OpenAI x Outskill Hackathon</SectionBadge>
        </div>
      </header>
      <HeroSection />
      <StatsRow />
      <BentoFeatures />
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8" id="demo">
        <div className="rounded-[2rem] border border-border/60 bg-card/70 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Demo flow</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <article className="rounded-3xl border border-border/60 bg-background/40 p-5">
              <p className="font-semibold">1. Pick your business type</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Agency, freelancer, consultant, or startup. The conversation adapts from the first step.</p>
            </article>
            <article className="rounded-3xl border border-border/60 bg-background/40 p-5">
              <p className="font-semibold">2. Answer five focused questions</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">You describe real workflows, approvals, pricing, and edge cases in plain language.</p>
            </article>
            <article className="rounded-3xl border border-border/60 bg-background/40 p-5">
              <p className="font-semibold">3. Ship a company brain</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">The app generates markdown files plus a JSON endpoint for your team and future agents.</p>
            </article>
          </div>
        </div>
      </section>
      <TypeMarquee />
    </ScreenShell>
  );
}
