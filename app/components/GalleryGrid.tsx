"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import ProtectedImage from "./ProtectedImage";
import NotifyMeButton from "./NotifyMeButton";
import type { GalleryImage } from "../../lib/gallery";
import prints from "../../lib/prints";

const aspectRatios = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[2/3]", "aspect-[3/4]", "aspect-[5/6]", "aspect-[4/5]"];

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const router = useRouter();

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => i !== null ? (i - 1 + images.length) % images.length : null), [images.length]);
  const next = useCallback(() => setLightbox((i) => i !== null ? (i + 1) % images.length : null), [images.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, prev, next]);

  const active = lightbox !== null ? images[lightbox] : null;
  const activePrint = active?.printId ? prints.find((p) => p.id === active.printId) : null;

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-2 md:gap-3 space-y-2 md:space-y-3">
        {images.map((img, i) => {
          const aspectClass = aspectRatios[i % aspectRatios.length];
          const linkedPrint = img.printId ? prints.find((p) => p.id === img.printId) : null;

          return (
            <div
              key={i}
              className={`relative overflow-hidden break-inside-avoid bg-surface-2 ${aspectClass} w-full cursor-pointer group`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setLightbox(i)}
            >
              {img.src && (
                <ProtectedImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={i < 3}
                  sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(50vw - 24px), calc(33vw - 20px)"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              )}

              {/* Gradient + caption */}
              <div
                className="absolute inset-0 flex items-end p-4 pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: hovered === i ? 1 : 0,
                  background: "linear-gradient(to top, rgba(15,14,13,0.85) 0%, transparent 55%)",
                }}
              >
                <span className="text-cream/80 text-xs tracking-[0.12em] uppercase font-sans">
                  {img.caption}
                </span>
              </div>

              {/* Top-right icons on hover */}
              <div
                className="absolute top-3 right-3 flex items-center gap-2 transition-opacity duration-300"
                style={{ opacity: hovered === i ? 1 : 0 }}
              >
                {/* Cart icon — navigate to print or open lightbox for open edition */}
                <button
                  className="p-1.5 bg-bg/70 hover:bg-terracotta transition-colors duration-200 pointer-events-auto group/cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (linkedPrint) {
                      router.push(`/prints/${linkedPrint.id}`);
                    } else {
                      setLightbox(i);
                    }
                  }}
                  aria-label="Purchase this print"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-cream/70 group-hover/cart:text-bg transition-colors duration-200">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                </button>

                {/* Expand icon */}
                <div className="p-1.5 bg-bg/70">
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cream/50">
                    <path d="M9 1h4v4M5 13H1V9M13 1l-5 5M1 13l5-5" />
                  </svg>
                </div>
              </div>

              {/* "For sale" dot indicator */}
              {img.printId && (
                <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-terracotta/60" />
              )}
            </div>
          );
        })}
      </div>

      {/* ── LIGHTBOX ─────────────────────────────────────────────── */}
      {lightbox !== null && active && (
        <div
          className="fixed inset-0 z-50 bg-[#0a0908]/96 flex flex-col"
          onClick={close}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-5 shrink-0">
            <span className="text-cream/25 text-xs tracking-[0.18em] font-mono select-none">
              {String(lightbox + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <button
              className="text-cream/40 hover:text-cream text-xs tracking-[0.18em] uppercase transition-colors duration-200"
              onClick={close}
            >
              Close
            </button>
          </div>

          {/* Image area */}
          <div className="flex-1 flex items-center justify-center relative px-16 min-h-0">
            {/* Prev */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 p-4 text-cream/30 hover:text-terracotta transition-colors duration-200"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Next */}
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-4 text-cream/30 hover:text-terracotta transition-colors duration-200"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div
              className="relative flex items-center justify-center h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {active.src ? (
                <ProtectedImage
                  src={active.src}
                  alt={active.alt}
                  width={1400}
                  height={1050}
                  className="object-contain max-h-full w-auto"
                  priority
                />
              ) : (
                <div className="w-[420px] h-[520px] bg-surface-2 flex items-center justify-center">
                  <span className="text-cream/15 text-xs tracking-[0.15em] uppercase">Photo coming soon</span>
                </div>
              )}
            </div>
          </div>

          {/* ── PURCHASE BAR ─────────────────────────────────────── */}
          <div
            className="shrink-0 border-t border-cream/[0.07] px-6 py-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 max-w-4xl mx-auto">

              {/* Caption */}
              <div className="flex items-center gap-3">
                {active.caption && (
                  <span className="text-cream/50 text-xs tracking-[0.15em] uppercase">{active.caption}</span>
                )}
                {active.year && (
                  <>
                    <span className="text-cream/20 text-xs">·</span>
                    <span className="text-cream/25 text-xs tracking-[0.12em]">{active.year}</span>
                  </>
                )}
              </div>

              {/* Purchase action */}
              {activePrint ? (
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.6rem] tracking-[0.18em] uppercase text-terracotta/60">Limited Edition</span>
                    <span className="text-cream/20 text-xs">·</span>
                    <span className="text-cream/50 text-xs">
                      from ${(Math.min(...activePrint.sizes.map((s) => s.price)) / 100).toFixed(0)}
                    </span>
                    {Math.min(...activePrint.sizes.map((s) => s.remaining)) <= 5 && (
                      <>
                        <span className="text-cream/20 text-xs">·</span>
                        <span className="text-terracotta text-xs">
                          {Math.min(...activePrint.sizes.map((s) => s.remaining))} left
                        </span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => router.push(`/prints/${activePrint.id}`)}
                    className="px-5 py-2 bg-terracotta text-bg text-xs tracking-[0.15em] uppercase hover:bg-terracotta/80 transition-colors duration-200"
                  >
                    Purchase Print →
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-[0.6rem] tracking-[0.18em] uppercase text-cream/25">Open Edition — Coming Soon</span>
                  <NotifyMeButton product={`Open Edition: ${active.caption ?? "this photo"}`} />
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
