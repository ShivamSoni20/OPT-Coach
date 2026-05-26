"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function ChatInput({
  disabled,
  isComplete,
  onSend
}: {
  disabled?: boolean;
  isComplete: boolean;
  onSend: (value: string) => Promise<void> | void;
}) {
  const [value, setValue] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextValue = value.trim();

    if (!nextValue || disabled || isComplete) {
      return;
    }

    setValue("");
    await onSend(nextValue);
  }

  return (
    <form className="border-t border-border/70 bg-background/80 p-4" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="coach-input">
        Answer the current OPT Coach question
      </label>
      <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-3xl border border-border/70 bg-card/70 p-3 sm:flex-row sm:items-end">
        <textarea
          autoComplete="off"
          className="min-h-24 flex-1 resize-none rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
          disabled={disabled || isComplete}
          id="coach-input"
          name="message"
          onChange={(event) => setValue(event.target.value)}
          placeholder={
            isComplete
              ? "Your Company Brain is being generated."
              : "Answer with the specifics: tools, owners, steps, pricing, edge cases..."
          }
          value={value}
        />
        <Button className="w-full sm:w-auto" disabled={disabled || isComplete || !value.trim()} type="submit">
          Send answer
        </Button>
      </div>
    </form>
  );
}
