const steps = [
  "Operating model",
  "Client onboarding",
  "Delivery workflow",
  "Quality and approval",
  "Tribal knowledge",
];

export function ProgressSidebar({ questionsAnswered }: { questionsAnswered: number }) {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-sage/30 bg-white/50 px-4 py-6 lg:block">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-green-dk">
        Questions
      </p>
      <div className="space-y-2">
        {steps.map((step, index) => {
          const isDone = index < questionsAnswered;
          const isCurrent = index === questionsAnswered;

          return (
            <div
              key={step}
              className={`rounded-xl border px-3 py-2.5 text-[12px] transition-all ${
                isCurrent
                  ? "border-teal/30 bg-teal-pale text-ink"
                  : isDone
                    ? "border-sage/25 bg-sage-pale text-green-dk"
                    : "border-transparent bg-transparent text-ink-lt"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                    isDone
                      ? "bg-green-dk text-white"
                      : isCurrent
                        ? "bg-teal/15 text-teal"
                        : "bg-sage-pale text-ink-lt"
                  }`}
                >
                  {isDone ? "✓" : index + 1}
                </div>
                <div>
                  <p className="font-medium leading-tight">{step}</p>
                  <p className="text-[10px] text-ink-lt">
                    {isDone ? "Captured" : isCurrent ? "In progress" : "Coming up"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
