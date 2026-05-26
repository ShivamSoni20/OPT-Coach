const steps = [
  "Operating model",
  "Client onboarding",
  "Delivery workflow",
  "Quality and approval",
  "Tribal knowledge"
];

export function ProgressSidebar({ questionsAnswered }: { questionsAnswered: number }) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border/70 bg-card/40 px-5 py-6 lg:block">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Questions</p>
      <div className="mt-5 space-y-3">
        {steps.map((step, index) => {
          const isDone = index < questionsAnswered;
          const isCurrent = index === questionsAnswered;

          return (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                isCurrent
                  ? "border-primary/30 bg-primary/10 text-foreground"
                  : isDone
                    ? "border-border/50 bg-background/40 text-primary"
                    : "border-transparent bg-transparent text-muted-foreground"
              }`}
              key={step}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                    isDone ? "bg-primary text-primary-foreground" : isCurrent ? "bg-primary/15 text-primary" : "bg-background/70 text-muted-foreground"
                  }`}
                >
                  {isDone ? "OK" : index + 1}
                </div>
                <div>
                  <p className="font-medium">{step}</p>
                  <p className="text-xs text-muted-foreground">{isDone ? "Captured" : isCurrent ? "In progress" : "Coming up"}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
