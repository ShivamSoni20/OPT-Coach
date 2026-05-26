import { notFound } from "next/navigation";

import { BrainTabs } from "@/components/brain/file-tab";
import { SharePanel } from "@/components/brain/share-modal";
import { ScreenShell } from "@/components/ui/shell";
import { kvGet } from "@/lib/kv";
import type { BrainRecord } from "@/lib/types";

export default async function BrainPage({
  params
}: {
  params: { id: string };
}) {
  const brain = await kvGet<BrainRecord>(`brain:${params.id}`);

  if (!brain) {
    notFound();
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const shareUrl = `${appUrl}/brain/${params.id}/share`;

  return (
    <ScreenShell className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <aside className="w-full border-b border-border/70 bg-card/50 p-5 lg:w-80 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Company brain</p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">{brain.meta.businessName}</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Generated for a {brain.meta.businessType} in {brain.meta.sessionDuration} minutes.
          </p>
          <div className="mt-6 rounded-3xl border border-primary/20 bg-primary/10 p-4">
            <p className="text-sm font-medium text-foreground">Brain generated successfully</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Use the markdown tabs for humans and the API payload for tools.
            </p>
          </div>
          <div className="mt-6">
            <SharePanel brainId={params.id} shareUrl={shareUrl} />
          </div>
        </aside>

        <main className="flex min-h-screen flex-1 flex-col">
          <div className="border-b border-border/70 px-4 py-4 sm:px-6">
            <p className="text-sm font-medium text-foreground">Brain output</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Switch between files or inspect the raw JSON endpoint payload.
            </p>
          </div>
          <BrainTabs brain={brain} />
        </main>
      </div>
    </ScreenShell>
  );
}
