"use client";

import { useState } from "react";
import type { PrintSize } from "../../lib/prints";

export default function PrintBuyWidget({ sizes }: { sizes: PrintSize[] }) {
  const availableSizes = sizes.filter((s) => s.remaining > 0);
  const [selected, setSelected] = useState<string>(availableSizes[0]?.label ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedSize = sizes.find((s) => s.label === selected);

  async function handleBuy() {
    if (!selectedSize?.stripePriceId) {
      setError("This size isn't available for purchase yet.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: selectedSize.stripePriceId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Size table */}
      <div className="flex flex-col mb-10">
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-cream/25 mb-4">
          Available sizes
        </p>
        {sizes.map((size) => {
          const isSoldOut = size.remaining === 0;
          const isSelected = selected === size.label;
          return (
            <button
              key={size.label}
              disabled={isSoldOut}
              onClick={() => !isSoldOut && setSelected(size.label)}
              className={`flex items-center justify-between py-4 border-b text-left w-full transition-colors duration-150 ${
                isSelected
                  ? "border-terracotta/30"
                  : "border-cream/[0.07] hover:border-cream/20"
              } ${isSoldOut ? "cursor-default" : "cursor-pointer"}`}
            >
              <div className="flex items-center gap-3 flex-wrap">
                {/* Selection indicator */}
                <span
                  className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-150 ${
                    isSelected ? "bg-terracotta" : "bg-cream/10"
                  }`}
                />
                <span className={`text-sm ${isSoldOut ? "text-cream/25 line-through" : isSelected ? "text-cream" : "text-cream/60"}`}>
                  {size.label}
                </span>
                <span className="text-cream/25 text-xs tracking-wide">
                  {size.edition}
                </span>
                {!isSoldOut && size.remaining <= 5 && (
                  <span className="text-terracotta text-xs tracking-wide">
                    {size.remaining} left
                  </span>
                )}
                {isSoldOut && (
                  <span className="text-cream/20 text-xs tracking-wide">Sold out</span>
                )}
              </div>
              <span className={`text-sm shrink-0 ml-4 ${isSoldOut ? "text-cream/20" : isSelected ? "text-terracotta" : "text-cream/40"}`}>
                ${(size.price / 100).toFixed(0)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Buy button */}
      {availableSizes.length > 0 ? (
        <button
          onClick={handleBuy}
          disabled={loading}
          className="inline-block w-full md:w-auto text-center px-8 py-4 bg-terracotta text-bg text-xs tracking-[0.18em] uppercase hover:bg-terracotta/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Redirecting…" : `Buy Now — $${((selectedSize?.price ?? 0) / 100).toFixed(0)}`}
        </button>
      ) : (
        <p className="text-cream/30 text-xs tracking-wide">All editions sold out.</p>
      )}

      {error && (
        <p className="mt-4 text-terracotta/70 text-xs tracking-wide">{error}</p>
      )}
    </div>
  );
}
