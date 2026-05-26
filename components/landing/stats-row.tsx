const stats = [
  { value: "20 min", label: "average completion time" },
  { value: "5 questions", label: "to extract the business context" },
  { value: "3 files", label: "generated for knowledge, process, and judgment" },
  { value: "1 live URL", label: "for agents and teammates to query" }
];

export function StatsRow() {
  return (
    <section className="border-y border-border/70 bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border/60 bg-background/50 p-5">
            <p className="text-2xl font-semibold text-primary">{stat.value}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
