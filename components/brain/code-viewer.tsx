export function CodeViewer({ content }: { content: string }) {
  return (
    <pre className="overflow-x-auto rounded-3xl border border-border/70 bg-card/70 p-5 font-mono text-xs leading-6 text-foreground sm:text-sm">
      <code>{content}</code>
    </pre>
  );
}
