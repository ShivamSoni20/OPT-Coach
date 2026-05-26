export function BrainPreview({ questionsAnswered }: { questionsAnswered: number }) {
  const items = [
    {
      title: "KNOWLEDGE.md",
      status: questionsAnswered >= 1 ? "Extracting client and pricing context" : "Waiting for first answer"
    },
    {
      title: "PROCESSES.md",
      status: questionsAnswered >= 2 ? "Building workflows and owners" : "Waiting for process detail"
    },
    {
      title: "JUDGMENT.md",
      status: questionsAnswered >= 4 ? "Capturing quality criteria and approval rules" : "Waiting for decision logic"
    }
  ];

  return (
    <div className="rounded-3xl border border-border/70 bg-card/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Brain preview</p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div className="rounded-2xl border border-border/60 bg-background/50 p-3" key={item.title}>
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs text-foreground">{item.title}</p>
              <div className="h-2 w-2 rounded-full bg-primary motion-safe:animate-pulseLine" />
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
