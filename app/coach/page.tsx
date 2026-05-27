"use client";

import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BrainPreview } from "@/components/coach/brain-preview";
import { ChatInput } from "@/components/coach/chat-input";
import { ChatMessage } from "@/components/coach/chat-message";
import { ProgressSidebar } from "@/components/coach/progress-sidebar";
import { Button } from "@/components/ui/button";
import { ScreenShell } from "@/components/ui/shell";
import type { BusinessType, ChatMessage as ChatMessageType } from "@/lib/types";
import { getNextQuestionCount, parseBrainReady } from "@/lib/utils";

const businessTypeLabels: Record<BusinessType, string> = {
  agency: "Agency",
  freelancer: "Freelancer",
  consultant: "Consultant",
  startup: "Startup"
};

const mobileSteps = [
  "Operating model",
  "Onboarding",
  "Delivery",
  "Approval",
  "Tribal knowledge"
];

export default function CoachPage() {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [sessionId] = useState(() => nanoid());
  const [businessType, setBusinessType] = useState<BusinessType>("agency");
  const [businessName, setBusinessName] = useState("");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const storedType = window.localStorage.getItem("businessType") as BusinessType | null;
    const storedName = window.localStorage.getItem("businessName");

    if (storedType) {
      setBusinessType(storedType);
    }

    if (storedName) {
      setBusinessName(storedName);
    }

    setStarted(true);
  }, []);

  useEffect(() => {
    if (!started || messages.length > 0) {
      return;
    }

    void sendMessage("__INIT__");
  }, [started]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  async function sendMessage(userText: string) {
    const isInit = userText === "__INIT__";
    setError(null);

    if (!isInit) {
      setMessages((current) => [
        ...current,
        {
          role: "user",
          content: userText,
          timestamp: new Date().toISOString()
        }
      ]);
    }

    setIsLoading(true);

    const placeholderMessage: ChatMessageType = {
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString()
    };

    setMessages((current) => [...current, placeholderMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sessionId,
          businessType,
          businessName,
          userMessage: isInit ? "Start" : userText
        })
      });

      if (!response.ok || !response.body) {
        throw new Error("Could not reach the coach. Please try again.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        aiText += decoder.decode(value, { stream: true });
        setMessages((current) => {
          const next = [...current];
          next[next.length - 1] = {
            ...next[next.length - 1],
            content: aiText
          };
          return next;
        });
      }

      const nextCount = getNextQuestionCount(aiText, questionsAnswered);
      setQuestionsAnswered(nextCount);

      if (parseBrainReady(aiText) || nextCount >= 5) {
        await generateBrain();
      }
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "The chat request failed.";
      setError(message);
      setMessages((current) => current.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }

  async function generateBrain() {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sessionId })
      });

      if (!response.ok) {
        throw new Error("Brain generation failed. Please retry.");
      }

      const payload = (await response.json()) as { brainId: string };
      router.push(`/brain/${payload.brainId}`);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Brain generation failed.";
      setError(message);
      setIsGenerating(false);
    }
  }

  return (
    <ScreenShell className="flex min-h-screen flex-col">
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="border-b border-border/70 bg-background/80 px-4 py-4 backdrop-blur sm:px-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">OPT Coach</p>
              <p className="text-sm text-muted-foreground">
                {businessName || "Untitled business"} · {businessTypeLabels[businessType]} flow · {questionsAnswered}/5 answered
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                {businessTypeLabels[businessType]}
              </div>
              <Button className="w-full sm:w-auto" href="/onboard" variant="ghost">
                Change type
              </Button>
            </div>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-7xl flex-1">
          <ProgressSidebar questionsAnswered={questionsAnswered} />

          <main className="flex min-h-[calc(100vh-80px)] flex-1 flex-col">
            <div className="border-b border-border/40 px-4 py-3 lg:hidden">
              <div className="flex flex-wrap gap-2">
                {mobileSteps.map((step, index) => {
                  const isDone = index < questionsAnswered;
                  const isCurrent = index === questionsAnswered;

                  return (
                    <div
                      className={`rounded-full border px-3 py-1 text-xs ${
                        isCurrent
                          ? "border-primary/30 bg-primary/10 text-foreground"
                          : isDone
                            ? "border-primary/20 bg-primary/5 text-primary"
                            : "border-border/60 bg-background/40 text-muted-foreground"
                      }`}
                      key={step}
                    >
                      {index + 1}. {step}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid flex-1 gap-6 px-4 py-6 sm:px-6 xl:grid-cols-[minmax(0,1fr)_300px]">
              <section className="flex min-h-[60vh] flex-col rounded-[2rem] border border-border/70 bg-card/70">
                <div className="border-b border-border/70 px-5 py-4">
                  <p className="text-sm font-medium text-foreground">Structured coaching</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Answer with real examples, owners, tools, and edge cases.
                  </p>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
                  {messages.length === 0 ? (
                    <div className="rounded-3xl border border-border/60 bg-background/50 p-5 text-sm text-muted-foreground">
                      Starting the session...
                    </div>
                  ) : null}

                  {messages.map((message, index) => (
                    <ChatMessage
                      isPending={isLoading && index === messages.length - 1 && message.role === "assistant"}
                      key={`${message.timestamp}-${index}`}
                      message={message}
                    />
                  ))}

                  {error ? (
                    <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100">
                      <p className="font-medium">Couldn&apos;t continue the coaching flow.</p>
                      <p className="mt-2 text-red-100/85">{error}</p>
                    </div>
                  ) : null}

                  {isGenerating ? (
                    <div className="rounded-3xl border border-primary/20 bg-primary/10 p-4 text-sm text-foreground">
                      Generating your Company Brain now...
                    </div>
                  ) : null}

                  <div ref={bottomRef} />
                </div>

                <ChatInput
                  disabled={isLoading || isGenerating}
                  isComplete={isGenerating}
                  onSend={sendMessage}
                />
              </section>

              <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
                <BrainPreview questionsAnswered={questionsAnswered} />
                <div className="rounded-3xl border border-border/70 bg-card/60 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Prompting tips</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                    <li>Use exact numbers when you can: retainers, turnaround times, approval windows.</li>
                    <li>Name the real tools and owners involved instead of saying "the team".</li>
                    <li>Call out failure cases and escalation rules when work gets blocked.</li>
                  </ul>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </ScreenShell>
  );
}
