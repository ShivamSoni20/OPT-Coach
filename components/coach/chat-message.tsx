import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/lib/types";

export function ChatMessage({
  message,
  isPending
}: {
  message: ChatMessageType;
  isPending?: boolean;
}) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser ? (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm text-primary">
          AI
        </div>
      ) : null}
      <div
        className={cn(
          "max-w-[85%] rounded-3xl border px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[72%]",
          isUser
            ? "rounded-tr-md border-primary/20 bg-primary text-primary-foreground"
            : "rounded-tl-md border-border/60 bg-card/80 text-foreground"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {isPending ? <span className="ml-1 inline-block h-4 w-2 animate-pulse rounded-sm bg-primary/70 align-middle" /> : null}
      </div>
    </div>
  );
}
