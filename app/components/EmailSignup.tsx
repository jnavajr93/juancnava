"use client";

import { useState } from "react";

interface Props {
  context?: "writing" | "site";
  variant?: "inline" | "block";
}

export default function EmailSignup({ context = "site", variant = "inline" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, context }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="font-serif italic text-cream/60 text-base">
        You&rsquo;re in. Talk soon.
      </p>
    );
  }

  // Block variant — used on writing page bottom section
  if (variant === "block") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-transparent border border-cream/20 focus:border-terracotta/50 outline-none text-sm text-cream placeholder:text-cream/20 px-4 py-3 transition-colors duration-200"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 bg-terracotta text-bg text-xs tracking-[0.15em] uppercase hover:bg-terracotta/80 disabled:opacity-40 transition-colors duration-200"
        >
          {status === "loading" ? "..." : "Subscribe →"}
        </button>
        <p className="text-cream/25 text-xs tracking-wide">
          No spam. Unsubscribe anytime.
        </p>
        {status === "error" && (
          <p className="text-xs text-terracotta/60">Something went wrong. Try again.</p>
        )}
      </form>
    );
  }

  // Inline variant — used at the end of essays
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[0.65rem] tracking-[0.22em] uppercase text-cream/30">
        {context === "writing"
          ? "New essays when they're ready. Nothing else."
          : "New prints, writing, and field notes. Directly to you."}
      </p>
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="bg-transparent border-b border-cream/20 focus:border-terracotta/50 outline-none text-sm text-cream placeholder:text-cream/20 py-2 w-56 transition-colors duration-200"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="text-xs tracking-[0.15em] uppercase text-terracotta hover:text-terracotta/70 disabled:opacity-40 transition-colors duration-200 shrink-0"
        >
          {status === "loading" ? "..." : "Subscribe →"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-xs text-terracotta/60">Something went wrong. Try again.</p>
      )}
    </div>
  );
}
