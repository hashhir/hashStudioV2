"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ask about Hashir's professional details, experience, skills, projects, or contact information.",
    },
  ]);

  async function sendMessage(question: string) {
    const nextMessages = [...messages, { role: "user" as const, content: question }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as { answer?: string; error?: string };

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.answer ?? data.error ?? "I could not answer right now.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "I could not answer right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const question = input.trim();
    if (!question || loading) {
      return;
    }

    await sendMessage(question);
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        animate={{
          y: [0, -4, 0],
          boxShadow: [
            "0 0 0 rgba(235, 58, 42, 0)",
            "0 0 24px rgba(235, 58, 42, 0.22)",
            "0 0 0 rgba(235, 58, 42, 0)",
          ],
        }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="glass-panel fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-foreground shadow-glow sm:bottom-6 sm:right-6"
      >
        <motion.span
          animate={{ scale: [1, 1.35, 1], opacity: [1, 0.72, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-2.5 w-2.5 rounded-full bg-accent"
        />
        ASK
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="glass-panel fixed bottom-20 right-4 z-50 flex h-[34rem] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-[1.8rem] sm:bottom-24 sm:right-6"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border/70 px-5 py-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.26em] text-muted">Portfolio Assistant</p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em]">Ask about Hashir</h3>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Professional details, experience, skills, projects, and contact.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background/35 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                X
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                    message.role === "assistant"
                      ? "border border-border bg-background/35 text-foreground"
                      : "ml-auto bg-foreground text-background"
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {loading ? (
                <div className="max-w-[90%] rounded-2xl border border-border bg-background/35 px-4 py-3 text-sm text-muted">
                  Thinking...
                </div>
              ) : null}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-border/70 p-4">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about experience, skills, or projects..."
                  className="w-full rounded-2xl border border-border bg-background/35 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-accent px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-60"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
