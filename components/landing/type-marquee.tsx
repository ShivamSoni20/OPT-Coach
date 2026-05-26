const businessTypes = [
  "Marketing Agency",
  "Dev Studio",
  "CA Firm",
  "Design Freelancer",
  "Growth Consultant",
  "PR Agency",
  "Legal Advisory",
  "Architecture Studio",
  "EdTech Startup",
  "Finance Advisor"
];

export function TypeMarquee() {
  const items = [...businessTypes, ...businessTypes];

  return (
    <section className="border-t border-border/70 py-6">
      <div className="overflow-hidden">
        <div className="flex min-w-max gap-3 px-4 motion-safe:animate-ticker sm:px-6 lg:px-8">
          {items.map((item, index) => (
            <div
              className="rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground"
              key={`${item}-${index}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
