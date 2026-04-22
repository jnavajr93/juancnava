"use client";

import { useState } from "react";

export default function NotifyMeButton({ product }: { product: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, context: "notify-me", product }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-cream/25 text-xs tracking-wide hover:text-terracotta transition-colors duration-200"
      >
        Notify me →
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          onClick={() => { setOpen(false); setStatus("idle"); setEmail(""); }}
        >
          <div className="absolute inset-0 bg-bg/85" />

          <div
            className="relative bg-[#161412] border border-cream/10 p-8 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setOpen(false); setStatus("idle"); setEmail(""); }}
              className="absolute top-4 right-5 text-cream/25 hover:text-cream transition-colors duration-200 text-sm"
            >
              ✕
            </button>

            {status === "success" ? (
              <div className="flex flex-col gap-3">
                <p className="font-serif italic text-cream/70 text-xl">You&rsquo;re on the list.</p>
                <p className="text-cream/40 text-sm leading-relaxed">
                  We&rsquo;ll reach out the moment {product} is available.
                </p>
                <button
                  onClick={() => { setOpen(false); setStatus("idle"); }}
                  className="mt-4 text-xs tracking-[0.15em] uppercase text-terracotta hover:text-terracotta/70 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-[0.65rem] tracking-[0.22em] uppercase text-terracotta/60 mb-3">Coming soon</p>
                <h3 className="font-serif font-black text-cream text-xl mb-2">{product}</h3>
                <p className="text-cream/40 text-sm leading-relaxed mb-6">
                  Leave your email. We&rsquo;ll let you know when it&rsquo;s ready.
                </p>
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
                    {status === "loading" ? "..." : "Notify Me →"}
                  </button>
                  {status === "error" && (
                    <p className="text-xs text-terracotta/60">Something went wrong. Try again.</p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
