import { Button } from "@/components/ui/button";

export function SharePanel({
  brainId,
  shareUrl
}: {
  brainId: string;
  shareUrl: string;
}) {
  return (
    <div className="rounded-3xl border border-border/70 bg-card/70 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Share</p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Share the read-only browser view with teammates or use the API URL inside an agent workflow.
      </p>
      <div className="mt-4 rounded-2xl border border-border/60 bg-background/60 p-3 font-mono text-xs text-foreground">
        {shareUrl}
      </div>
      <div className="mt-4 grid gap-3">
        <Button href={`/brain/${brainId}/share`} variant="ghost">
          Open share page
        </Button>
        <Button href={`/brain/${brainId}?tab=api`}>View API payload</Button>
      </div>
    </div>
  );
}
