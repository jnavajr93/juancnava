import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import EmailSignup from "../components/EmailSignup";
import essays from "../../lib/essays";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing — Essays on Photography & Visual Storytelling",
  description: "Essays on photography, documentary practice, and visual storytelling by Juan C. Nava — Phoenix, Arizona photographer.",
  alternates: { canonical: "https://juancnava.com/writing" },
  openGraph: {
    title: "Writing — Juan C. Nava Photography",
    description: "Essays on photography, documentary practice, and visual storytelling from Phoenix, AZ.",
    url: "https://juancnava.com/writing",
    images: [{ url: "/phoenix-arizona-desert-sunset-saguaro-cactus-documentary-photography.jpg", width: 1500, alt: "Writing — Juan C. Nava Photography" }],
  },
};

function readTime(body: string) {
  return Math.max(1, Math.ceil(body.split(/\s+/).length / 200));
}

export default function WritingPage() {
  return (
    <div className="min-h-screen bg-bg text-cream font-sans">
      <SiteNav />

      <main className="px-6 md:px-14 pt-28 pb-0">

        {/* ── SUBSCRIBE SECTION ────────────────────────────────────── */}
        <section className="relative overflow-hidden py-16 md:py-24 mb-0">

          {/* Decorative large number — background texture */}
          <span
            className="absolute right-0 top-1/2 -translate-y-1/2 font-serif font-black text-cream/[0.035] select-none pointer-events-none leading-none"
            style={{ fontSize: "clamp(10rem, 22vw, 20rem)" }}
            aria-hidden="true"
          >
            01
          </span>

          <div className="relative">

            <h1
              className="font-serif font-black text-cream leading-tight"
              style={{ fontSize: "clamp(1.75rem, 2.5vw + 0.5rem, 2.75rem)" }}
            >
              Stay in the work.
            </h1>
            <p className="font-serif italic text-cream/35 text-sm mt-3">
              Essays on photography, place, and the act of looking.
            </p>

            {/* Subscribe form — centered below subtitle */}
            <div className="mt-8 max-w-[560px]">
              <EmailSignup context="writing" variant="block" />
            </div>

          </div>
        </section>

        {/* ── ESSAYS LIST ──────────────────────────────────────────── */}
        <div className="flex flex-col max-w-4xl">

          <div className="border-t border-terracotta/30 py-5 mb-0">
            <h2
              className="font-serif font-black text-cream leading-tight"
              style={{ fontSize: "clamp(2.5rem, 4vw + 0.5rem, 4rem)" }}
            >
              Writing.
            </h2>
          </div>

          {essays.map((essay) => (
            <Link
              key={essay.slug}
              href={`/writing/${essay.slug}`}
              className="group py-10 flex flex-col md:flex-row md:items-baseline border-t border-terracotta/30"
            >
              {/* Date + read time */}
              <div className="flex items-center gap-3 shrink-0 mb-3 md:mb-0 md:w-44">
                <time className="text-[0.65rem] tracking-[0.18em] uppercase text-cream/30">
                  {essay.date}
                </time>
                <span className="text-cream/15 text-[0.65rem]">·</span>
                <span className="text-[0.65rem] tracking-[0.12em] uppercase text-cream/20">
                  {readTime(essay.body)} min
                </span>
              </div>

              {/* Title + excerpt */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-2xl md:text-[1.6rem] text-cream group-hover:text-terracotta transition-colors duration-200 leading-snug">
                  {essay.title}
                </h3>
                <p className="text-cream/50 text-sm mt-2 leading-relaxed max-w-lg">
                  {essay.excerpt}
                </p>
                <span className="mt-4 inline-block text-xs tracking-[0.15em] uppercase text-terracotta/70 group-hover:text-terracotta transition-colors duration-200">
                  Read →
                </span>
              </div>

              {/* Category tag — far right */}
              <div className="hidden md:flex items-start pt-1 pl-8 shrink-0">
                <span className="text-[0.6rem] tracking-[0.22em] uppercase text-cream/15 group-hover:text-cream/30 transition-colors duration-200">
                  {essay.category}
                </span>
              </div>
            </Link>
          ))}

          <div className="border-t border-terracotta/30" />
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
