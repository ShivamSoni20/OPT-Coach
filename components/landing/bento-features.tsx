const features = [
  {
    title: "5-question OPT flow",
    description: "A guided coach that pulls out operating model, workflows, and judgment without turning the founder into a prompt engineer.",
    tone: "lg:col-span-2"
  },
  {
    title: "KNOWLEDGE.md",
    description: "Company context, pricing logic, client profile, and team structure in a clean AI-readable file."
  },
  {
    title: "PROCESSES.md",
    description: "Practical workflows with owners, triggers, decision points, and handoffs."
  },
  {
    title: "JUDGMENT.md",
    description: "The taste, rules, and approval guardrails that usually live in one senior person's head."
  },
  {
    title: "Live API endpoint",
    description: "A shareable JSON endpoint that an agent or internal tool can query directly."
  },
  {
    title: "Share-ready output",
    description: "A read-only browser view for onboarding teammates without dumping them into raw prompts."
  }
];

export function BentoFeatures() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything your team needs to make AI actually useful
        </h2>
        <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
          The output is designed to be used by founders, operators, new hires, and agents on day one.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            className={`rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm ${feature.tone ?? ""}`}
            key={feature.title}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-4 h-1.5 w-14 rounded-full bg-primary/70" />
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
