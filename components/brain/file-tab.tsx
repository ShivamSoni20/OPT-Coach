"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { CodeViewer } from "@/components/brain/code-viewer";
import type { BrainRecord } from "@/lib/types";

const tabs = [
  { id: "knowledge", label: "KNOWLEDGE.md" },
  { id: "processes", label: "PROCESSES.md" },
  { id: "judgment", label: "JUDGMENT.md" },
  { id: "api", label: "API Endpoint" }
] as const;

export function BrainTabs({ brain }: { brain: BrainRecord }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get("tab") as (typeof tabs)[number]["id"] | null) ?? "knowledge";

  const apiPayload = JSON.stringify(brain, null, 2);

  const content =
    activeTab === "knowledge"
      ? brain.markdown.knowledge_md
      : activeTab === "processes"
        ? brain.markdown.processes_md
        : activeTab === "judgment"
          ? brain.markdown.judgment_md
          : apiPayload;

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap gap-2 border-b border-border/70 px-4 py-4 sm:px-6">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              className={`min-h-10 rounded-full border px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isActive
                  ? "border-primary/30 bg-primary/10 text-foreground"
                  : "border-border/60 bg-background/40 text-muted-foreground"
              }`}
              key={tab.id}
              onClick={() => router.replace(`?tab=${tab.id}`)}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <CodeViewer content={content} />
      </div>
    </div>
  );
}
