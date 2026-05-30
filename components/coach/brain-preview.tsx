export function BrainPreview({ questionsAnswered }: { questionsAnswered: number }) {
  const items = [
    {
      title: "KNOWLEDGE.md",
      status:
        questionsAnswered >= 1
          ? "Extracting client and pricing context"
          : "Waiting for first answer",
      active: questionsAnswered >= 1,
    },
    {
      title: "PROCESSES.md",
      status:
        questionsAnswered >= 2
          ? "Building workflows and owners"
          : "Waiting for process detail",
      active: questionsAnswered >= 2,
    },
    {
      title: "JUDGMENT.md",
      status:
        questionsAnswered >= 4
          ? "Capturing quality criteria"
          : "Waiting for decision logic",
      active: questionsAnswered >= 4,
    },
  ];

  return (
    <div className="rounded-[18px] border border-sage/30 bg-white/70 p-4">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-green-dk">
        Brain preview
      </p>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.title}
            className={`rounded-xl border p-3 transition-all ${
              item.active
                ? "border-teal/25 bg-teal-pale/50"
                : "border-sage/20 bg-sage-pale/30"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[11px] font-medium text-ink">{item.title}</p>
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  item.active ? "bg-teal animate-pulseLine" : "bg-sage"
                }`}
              />
            </div>
            <p className="mt-1.5 text-[11px] leading-5 text-ink-lt">{item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
