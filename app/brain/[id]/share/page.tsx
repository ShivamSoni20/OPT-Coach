import { notFound } from "next/navigation";

import { CodeViewer } from "@/components/brain/code-viewer";
import { ScreenShell, SectionBadge } from "@/components/ui/shell";
import { kvGet } from "@/lib/kv";
import type { BrainRecord } from "@/lib/types";

export default async function ShareBrainPage({
  params
}: {
  params: { id: string };
}) {
  const brain = await kvGet<BrainRecord>(`brain:${params.id}`);

  if (!brain) {
    notFound();
  }

  return (
    <ScreenShell>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionBadge>Read-only share view</SectionBadge>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight">{brain.meta.businessName}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          This shared view gives teammates a quick read on the company context, workflows, and quality bar without exposing the coaching session itself.
        </p>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              KNOWLEDGE.md
            </h2>
            <CodeViewer content={brain.markdown.knowledge_md} />
          </section>
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              PROCESSES.md
            </h2>
            <CodeViewer content={brain.markdown.processes_md} />
          </section>
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              JUDGMENT.md
            </h2>
            <CodeViewer content={brain.markdown.judgment_md} />
          </section>
        </div>
      </div>
    </ScreenShell>
  );
}
