"use client";

import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/lib/types";

export function ChatMessage({
  message,
  isPending,
}: {
  message: ChatMessageType;
  isPending?: boolean;
}) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal to-green-dk text-[11px] font-semibold text-white shadow-sm">
          AI
        </div>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-6 shadow-sm sm:max-w-[72%]",
          isUser
            ? "rounded-tr-sm bg-ink text-white"
            : "rounded-tl-sm border border-sage/30 bg-white text-ink"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {isPending && (
          <span className="ml-1 inline-block h-4 w-1.5 animate-pulse rounded-sm bg-teal/70 align-middle" />
        )}
      </div>
    </div>
  );
}
