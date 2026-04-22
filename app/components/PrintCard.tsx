"use client";

import { useState } from "react";
import Link from "next/link";
import type { Print } from "../../lib/prints";

function SoldOutWaitlist({ printTitle }: { printTitle: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, context: "print-waitlist", product: printTitle }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="mt-4 font-serif italic text-cream/50 text-sm">You&rsquo;re on the waitlist.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <p className="text-[0.65rem] tracking-[0.15em] uppercase text-cream/30">Join the waitlist</p>
      <div className="flex gap-2 items-center">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="bg-transparent border-b border-cream/20 focus:border-terracotta/50 outline-none text-xs text-cream placeholder:text-cream/20 py-1.5 flex-1 transition-colors duration-200"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="text-[0.65rem] tracking-[0.15em] uppercase text-terracotta hover:text-terracotta/70 disabled:opacity-40 shrink-0 transition-colors duration-200"
        >
          {status === "loading" ? "..." : "Notify →"}
        </button>
      </div>
      {status === "error" && <p className="text-xs text-terracotta/60">Try again.</p>}
    </form>
  );
}

export default function PrintCard({ print }: { print: Print }) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const size = print.sizes[selectedSize];
  const priceFormatted = `$${(size.price / 100).toFixed(0)}`;

  async function handleCheckout() {
    if (!size.stripePriceId) {
      setError("This print is not yet available for purchase.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: size.stripePriceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      {/* Placeholder image — links to detail page */}
      <Link href={`/prints/${print.id}`} className="block aspect-[3/4] bg-surface-2 w-full mb-5 hover:opacity-90 transition-opacity duration-200" />

      {/* Title + description */}
      <Link href={`/prints/${print.id}`}>
        <h2 className="font-serif text-xl text-terracotta hover:text-terracotta/80 transition-colors duration-200 leading-snug">{print.title}</h2>
      </Link>
      <p className="text-cream/40 text-sm mt-1 leading-relaxed">{print.description}</p>

      {/* Size selector */}
      <div className="flex gap-2 mt-5 flex-wrap">
        {print.sizes.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setSelectedSize(i)}
            className={`px-3 py-1.5 text-xs tracking-[0.1em] uppercase border transition-colors duration-150 ${
              selectedSize === i
                ? "border-terracotta text-terracotta bg-terracotta/10"
                : "border-cream/20 text-cream/40 hover:border-cream/40 hover:text-cream/60"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Edition + price */}
      <div className="flex items-baseline gap-4 mt-4">
        <span className="text-terracotta text-lg font-serif">{priceFormatted}</span>
        <span className="text-cream/30 text-xs tracking-wide">{size.edition}</span>
        {size.remaining <= 10 && size.remaining > 0 && (
          <span className="text-terracotta text-xs tracking-wide">
            {size.remaining} left
          </span>
        )}
        {size.remaining === 0 && (
          <span className="text-cream/30 text-xs tracking-wide">Sold out</span>
        )}
      </div>

      {/* Buy button */}
      <button
        onClick={handleCheckout}
        disabled={loading || size.remaining === 0}
        className="mt-5 px-6 py-3 text-xs tracking-[0.15em] uppercase bg-terracotta text-bg font-sans font-medium hover:bg-terracotta/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 self-start"
      >
        {loading ? "Redirecting…" : size.remaining === 0 ? "Sold Out" : "Purchase"}
      </button>

      {error && (
        <p className="mt-3 text-xs text-terracotta/70">{error}</p>
      )}

      {size.remaining === 0 && <SoldOutWaitlist printTitle={print.title} />}
    </div>
  );
}
