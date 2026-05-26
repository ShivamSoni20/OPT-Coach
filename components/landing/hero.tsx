import { Button } from "@/components/ui/button";
import { SectionBadge } from "@/components/ui/shell";

const rotatingLines = [
  "your WhatsApp messages",
  "your founder's memory",
  "one key person"
];

export function HeroSection() {
  return (
    <section className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
      <div className="mx-auto max-w-4xl text-center">
        <SectionBadge>Build your company brain in 20 minutes</SectionBadge>
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-7xl">
          Your business runs on{" "}
          <span className="bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_100%] bg-clip-text text-transparent motion-safe:animate-shimmer">
            tribal knowledge.
          </span>
          <br />
          Let&apos;s fix that.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          OPT Coach turns scattered operational know-how into a structured company brain for Indian service businesses, complete with SOP-style markdown and a live JSON endpoint.
        </p>
        <div className="mt-6 rounded-2xl border border-primary/15 bg-card/70 p-4 text-sm text-muted-foreground">
          What usually lives in{" "}
          <span className="font-semibold text-foreground">{rotatingLines[0]}</span>,{" "}
          <span className="font-semibold text-foreground">{rotatingLines[1]}</span>, or{" "}
          <span className="font-semibold text-foreground">{rotatingLines[2]}</span> becomes reusable team context.
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/onboard">Build My Company Brain -&gt;</Button>
          <Button href="#demo" variant="ghost">
            See a demo
          </Button>
        </div>
      </div>
    </section>
  );
}
