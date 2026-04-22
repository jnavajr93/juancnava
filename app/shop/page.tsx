import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import NotifyMeButton from "../components/NotifyMeButton";
import prints from "../../lib/prints";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — Fine Art Photography Prints & Objects",
  description: "Fine art photography prints, limited editions, calendars, and photobooks from Juan C. Nava — Phoenix, Arizona documentary photographer.",
  alternates: { canonical: "https://juancnava.com/shop" },
  openGraph: {
    title: "Shop — Juan C. Nava Photography",
    description: "Fine art prints and objects from Phoenix documentary photographer Juan C. Nava.",
    url: "https://juancnava.com/shop",
    images: [{ url: "/phoenix-arizona-desert-sunset-saguaro-cactus-documentary-photography.jpg", width: 1500, alt: "Fine art photography prints — Juan C. Nava" }],
  },
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-bg text-cream font-sans">
      <SiteNav />

      <main className="pb-32">

        {/* ── HEADER ───────────────────────────────────────────────── */}
        <div className="px-6 md:px-14 pt-32 pb-16 md:pb-20">
          <p className="text-terracotta text-[0.65rem] tracking-[0.22em] uppercase mb-4">The shop</p>
          <h1 className="font-serif font-black text-cream leading-tight"
            style={{ fontSize: "clamp(2.5rem, 4.5vw + 1rem, 5.5rem)" }}>
            The work,<br />made physical.
          </h1>
        </div>

        {/* ── LIMITED EDITION PRINTS ───────────────────────────────── */}
        <section className="px-6 md:px-14 py-16 md:py-20 border-t border-cream/[0.07]">
          <div className="flex items-baseline justify-between mb-12">
            <div>
              <h2 className="font-serif font-black text-3xl md:text-4xl text-cream leading-tight">
                Limited Edition.
              </h2>
              <p className="text-cream/40 text-sm mt-3 tracking-wide">
                Signed and numbered. Once they're gone, they're gone.
              </p>
            </div>
            <Link
              href="/prints"
              className="text-xs tracking-[0.15em] uppercase text-terracotta hover:text-terracotta/70 transition-colors duration-200 shrink-0 ml-8"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {prints.map((print) => {
              const minPrice = Math.min(...print.sizes.map((s) => s.price));
              const minRemaining = Math.min(...print.sizes.map((s) => s.remaining));
              return (
                <Link
                  key={print.id}
                  href={`/prints/${print.id}`}
                  className="group flex flex-col"
                >
                  <div className="aspect-[3/4] bg-surface relative overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_20px_50px_rgba(193,122,90,0.12)]" />
                  <div className="mt-4">
                    <h3 className="font-serif text-base text-terracotta group-hover:text-terracotta/80 transition-colors duration-200 leading-snug">
                      {print.title}
                    </h3>
                    <p className="text-cream/35 text-xs mt-1 leading-relaxed">{print.description}</p>
                    <div className="flex items-baseline gap-3 mt-2">
                      <span className="text-terracotta text-sm">
                        from ${(minPrice / 100).toFixed(0)}
                      </span>
                      {minRemaining <= 5 && (
                        <span className="text-terracotta/60 text-xs">{minRemaining} left</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── OPEN EDITION PRINTS ──────────────────────────────────── */}
        <section className="px-6 md:px-14 py-16 md:py-20 border-t border-cream/[0.07]">
          <div className="flex items-baseline justify-between mb-12">
            <div>
              <h2 className="font-serif font-black text-3xl md:text-4xl text-cream leading-tight">
                All Prints.
              </h2>
              <p className="text-cream/40 text-sm mt-3 tracking-wide">
                Every photo available as an open edition print.
              </p>
            </div>
            <Link
              href="/gallery"
              className="text-xs tracking-[0.15em] uppercase text-terracotta hover:text-terracotta/70 transition-colors duration-200 shrink-0 ml-8"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {prints.map((print) => (
              <Link
                key={print.id}
                href={`/prints/${print.id}`}
                className="group flex flex-col opacity-60 hover:opacity-80 transition-opacity duration-200"
              >
                <div className="aspect-[3/4] bg-surface relative">
                  <span className="absolute top-3 right-3 text-[0.55rem] tracking-[0.15em] uppercase text-cream/30 border border-cream/15 px-2 py-1">Coming soon</span>
                </div>
                <div className="mt-4">
                  <h3 className="font-serif text-base text-cream leading-snug">{print.title}</h3>
                  <p className="text-cream/30 text-xs mt-1">Open edition — from $35</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── OBJECTS & EDITIONS ───────────────────────────────────── */}
        <section className="px-6 md:px-14 py-16 md:py-20 border-t border-cream/[0.07]">
          <div className="flex items-baseline justify-between mb-12">
            <div>
              <h2 className="font-serif font-black text-3xl md:text-4xl text-cream leading-tight">
                Books & Paper.
              </h2>
              <p className="text-cream/40 text-sm mt-3 tracking-wide">
                Photobooks, calendars, and postcards. Coming soon.
              </p>
            </div>
            <Link
              href="/shop"
              className="text-xs tracking-[0.15em] uppercase text-terracotta hover:text-terracotta/70 transition-colors duration-200 shrink-0 ml-8"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">

            <div className="flex flex-col opacity-70">
              <div className="aspect-[3/4] bg-surface relative">
                <span className="absolute top-3 right-3 text-[0.55rem] tracking-[0.15em] uppercase text-cream/30 border border-cream/15 px-2 py-1">Coming soon</span>
              </div>
              <div className="mt-4">
                <p className="text-[0.6rem] tracking-[0.18em] uppercase text-terracotta/60 mb-1">Annual</p>
                <h3 className="font-serif text-base text-cream">2026 Calendar</h3>
                <p className="text-cream/35 text-xs mt-1 leading-relaxed">12 months of desert documentary work. Printed on heavy stock.</p>
                <div className="mt-3"><NotifyMeButton product="2026 Calendar" /></div>
              </div>
            </div>

            <div className="flex flex-col opacity-70">
              <div className="aspect-[3/4] bg-surface relative">
                <span className="absolute top-3 right-3 text-[0.55rem] tracking-[0.15em] uppercase text-cream/30 border border-cream/15 px-2 py-1">Coming soon</span>
              </div>
              <div className="mt-4">
                <p className="text-[0.6rem] tracking-[0.18em] uppercase text-terracotta/60 mb-1">Sets of 10</p>
                <h3 className="font-serif text-base text-cream">Postcard Sets</h3>
                <p className="text-cream/35 text-xs mt-1 leading-relaxed">Curated sets. Send them, frame them, keep them.</p>
                <div className="mt-3"><NotifyMeButton product="Postcard Sets" /></div>
              </div>
            </div>

            <div className="flex flex-col opacity-70">
              <div className="aspect-[3/4] bg-surface relative">
                <span className="absolute top-3 right-3 text-[0.55rem] tracking-[0.15em] uppercase text-cream/30 border border-cream/15 px-2 py-1">Coming soon</span>
              </div>
              <div className="mt-4">
                <p className="text-[0.6rem] tracking-[0.18em] uppercase text-terracotta/60 mb-1">Self-published</p>
                <h3 className="font-serif text-base text-cream">Photobook</h3>
                <p className="text-cream/35 text-xs mt-1 leading-relaxed">A proper bound photobook. Curated, sequenced, printed to last.</p>
                <div className="mt-3"><NotifyMeButton product="Photobook" /></div>
              </div>
            </div>

          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
