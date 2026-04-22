import Link from "next/link";
import FadeInSection from "./components/FadeInSection";
import ProtectedImage from "./components/ProtectedImage";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import NotifyMeButton from "./components/NotifyMeButton";
import essays from "../lib/essays";
import prints from "../lib/prints";
import sessions from "../lib/sessions";
import { printTestimonials, sessionTestimonials } from "../lib/testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Juan C. Nava — Documentary Photography | Phoenix, AZ" },
  description:
    "Documentary photography and visual storytelling by Juan C. Nava, based in Phoenix, Arizona. Limited edition prints, writing, and gallery.",
  openGraph: {
    title: "Juan C. Nava — Documentary Photography",
    description: "Documentary photography & visual storytelling from Phoenix, AZ",
    url: "https://juancnava.com",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-cream font-sans">

      <SiteNav />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="hero-grain min-h-screen relative flex flex-col"
      >
        {/* Text content */}
        <div className="flex flex-col justify-end px-6 md:px-14 pb-20 md:pb-28 pt-32 w-full min-h-screen">
          <div className="max-w-2xl">
            <h1
              className="hero-headline font-serif font-black leading-[1.06] tracking-tight text-cream"
              style={{ fontSize: "clamp(2rem, 4.5vw + 1.5rem, 6.5rem)" }}
            >
              Photography is the beauty of life, captured.
            </h1>
            <p className="hero-subtext mt-8 text-cream/50 text-sm md:text-base tracking-wide max-w-sm">
              Documentary photography &amp; visual storytelling from Phoenix, AZ
            </p>
          </div>
          <div className="hero-rule mt-16 md:mt-20 w-12 h-px bg-terracotta" />
        </div>
      </section>

      {/* ── TERRACOTTA RULE ─────────────────────────────────────── */}
      <div className="h-px bg-terracotta/50" />

      {/* ── PRINTS ──────────────────────────────────────────────── */}
      <section
        id="prints"
        className="px-6 md:px-14 py-24 md:py-32"
      >
        <FadeInSection>
          <div className="flex items-baseline justify-between mb-14">
            <div>
              <h2 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl text-cream leading-tight">
                Own the work.
              </h2>
              <p className="text-cream/40 text-sm mt-4 tracking-wide">
                Limited edition prints. Signed and numbered.
              </p>
            </div>
            <Link
              href="/prints"
              className="text-xs tracking-[0.15em] uppercase text-terracotta hover:text-terracotta/70 transition-colors duration-200 shrink-0 ml-8"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {prints.slice(0, 3).map((print) => (
              <Link
                key={print.id}
                href="/prints"
                className="group transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[3/4] bg-surface transition-shadow duration-300 group-hover:shadow-[0_20px_50px_rgba(193,122,90,0.12)]" />
                <div className="mt-4">
                  <h3 className="font-serif text-lg text-terracotta group-hover:text-terracotta/80 transition-colors duration-200">
                    {print.title}
                  </h3>
                  <p className="text-cream/40 text-xs tracking-wide mt-1">
                    {print.sizes[0].label} to {print.sizes[print.sizes.length - 1].label}
                  </p>
                  <div className="flex items-baseline gap-3 mt-2">
                    <p className="text-terracotta text-sm">
                      from ${(Math.min(...print.sizes.map((s) => s.price)) / 100).toFixed(0)}
                    </p>
                    {(() => {
                      const minRemaining = Math.min(...print.sizes.map((s) => s.remaining));
                      return minRemaining <= 5 ? (
                        <span className="text-terracotta/70 text-xs tracking-wide">{minRemaining} left</span>
                      ) : null;
                    })()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* ── SHOP ────────────────────────────────────────────────── */}
      <section id="shop" className="px-6 md:px-14 py-24 md:py-32 border-t border-cream/[0.07]">
        <FadeInSection>
          <div className="flex items-baseline justify-between mb-14">
            <div>
              <h2 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl text-cream leading-tight">
                Shop.
              </h2>
              <p className="text-cream/40 text-sm mt-4 tracking-wide">
                Prints, objects, and things worth owning.
              </p>
            </div>
            <Link
              href="/shop"
              className="text-xs tracking-[0.15em] uppercase text-terracotta hover:text-terracotta/70 transition-colors duration-200 shrink-0 ml-8"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

            {/* Open edition prints */}
            <Link href="/prints" className="group flex flex-col">
              <div className="aspect-[3/4] bg-surface transition-shadow duration-300 group-hover:shadow-[0_20px_50px_rgba(193,122,90,0.10)]" />
              <div className="mt-4">
                <p className="text-[0.6rem] tracking-[0.18em] uppercase text-terracotta/60 mb-1">Open edition</p>
                <h3 className="font-serif text-base text-cream group-hover:text-terracotta transition-colors duration-200">Open Edition Prints</h3>
                <p className="text-cream/35 text-xs mt-1 leading-relaxed">The same images, no edition limits. More accessible pricing.</p>
                <p className="text-terracotta text-xs mt-2">From $35</p>
              </div>
            </Link>

            {/* Annual calendar */}
            <div className="flex flex-col opacity-70">
              <div className="aspect-[3/4] bg-surface relative">
                <span className="absolute top-3 right-3 text-[0.55rem] tracking-[0.15em] uppercase text-cream/30 border border-cream/15 px-2 py-1">Coming soon</span>
              </div>
              <div className="mt-4">
                <p className="text-[0.6rem] tracking-[0.18em] uppercase text-terracotta/60 mb-1">Annual</p>
                <h3 className="font-serif text-base text-cream">2026 Calendar</h3>
                <p className="text-cream/35 text-xs mt-1 leading-relaxed">12 months of desert documentary work. Printed on heavy stock.</p>
                <div className="mt-2"><NotifyMeButton product="2026 Calendar" /></div>
              </div>
            </div>

            {/* Postcard sets */}
            <div className="flex flex-col opacity-70">
              <div className="aspect-[3/4] bg-surface relative">
                <span className="absolute top-3 right-3 text-[0.55rem] tracking-[0.15em] uppercase text-cream/30 border border-cream/15 px-2 py-1">Coming soon</span>
              </div>
              <div className="mt-4">
                <p className="text-[0.6rem] tracking-[0.18em] uppercase text-terracotta/60 mb-1">Sets of 10</p>
                <h3 className="font-serif text-base text-cream">Postcard Sets</h3>
                <p className="text-cream/35 text-xs mt-1 leading-relaxed">Curated sets. Send them, frame them, keep them.</p>
                <div className="mt-2"><NotifyMeButton product="Postcard Sets" /></div>
              </div>
            </div>

            {/* Zine */}
            <div className="flex flex-col opacity-70">
              <div className="aspect-[3/4] bg-surface relative">
                <span className="absolute top-3 right-3 text-[0.55rem] tracking-[0.15em] uppercase text-cream/30 border border-cream/15 px-2 py-1">Coming soon</span>
              </div>
              <div className="mt-4">
                <p className="text-[0.6rem] tracking-[0.18em] uppercase text-terracotta/60 mb-1">Self-published</p>
                <h3 className="font-serif text-base text-cream">Photobook</h3>
                <p className="text-cream/35 text-xs mt-1 leading-relaxed">A small-run edit of the year's work. Printed, bound, numbered.</p>
                <div className="mt-2"><NotifyMeButton product="Photobook" /></div>
              </div>
            </div>

          </div>
        </FadeInSection>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────── */}
      <section className="px-6 md:px-14 py-16 md:py-20 border-t border-cream/[0.07]">
        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {printTestimonials.slice(0, 2).map((t) => (
              <div key={t.name} className="flex flex-col gap-2">
                <p className="font-serif text-cream/45 text-sm leading-snug italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-cream/30 text-xs tracking-wide">{t.name} &mdash; {t.session}</p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* ── WORK TOGETHER ───────────────────────────────────────── */}
      <section id="book" className="px-6 md:px-14 py-24 md:py-32 border-t border-cream/[0.07]">
        <FadeInSection>
          <h2 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl text-cream leading-tight mb-14">
            Work with me.
          </h2>

          <div className="flex flex-col md:flex-row gap-14 md:gap-20">

            {/* Left — the pitch + testimonials */}
            <div className="flex-1 max-w-xl flex flex-col">
              <p className="text-cream/55 text-base leading-relaxed">
                Most people don&rsquo;t realize how valuable these moments are until it&rsquo;s too late. I try to catch them while they&rsquo;re still here.
              </p>

              {/* Session testimonials */}
              <div className="mt-24 ml-12 flex flex-col gap-6 max-w-xs pl-6 border-l border-cream/10">
                {sessionTestimonials.slice(0, 2).map((t) => (
                  <div key={t.name} className="flex flex-col gap-2">
                    <p className="font-serif text-cream/45 text-sm leading-snug italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="text-cream/30 text-xs tracking-wide">{t.name} &mdash; {t.session}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — services list */}
            <div className="shrink-0 md:w-80 flex flex-col pt-1">
              <p className="text-[0.6rem] tracking-[0.2em] uppercase text-cream/25 mb-4">Sessions</p>
              {sessions.map((s) => (
                <Link
                  key={s.slug}
                  href={`/book/${s.slug}`}
                  className="group flex items-center justify-between py-3 border-b border-cream/[0.06] hover:border-terracotta/20 transition-colors duration-200"
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-cream/50 group-hover:text-terracotta text-sm transition-colors duration-200">
                      {s.name}
                    </span>
                    {s.tagline && (
                      <span className="text-cream/25 text-xs leading-snug">
                        {s.tagline}
                      </span>
                    )}
                  </span>
                  <span className="text-cream/15 group-hover:text-terracotta/50 text-xs transition-colors duration-200 shrink-0 ml-4">→</span>
                </Link>
              ))}
              <div className="flex justify-end mt-6">
                <Link
                  href="/book"
                  className="text-xs tracking-[0.18em] uppercase text-terracotta hover:text-terracotta/70 transition-colors duration-200"
                >
                  Start here →
                </Link>
              </div>
            </div>

          </div>
        </FadeInSection>
      </section>

      {/* ── WRITING ─────────────────────────────────────────────── */}
      <section
        id="writing"
        className="px-6 md:px-14 py-24 md:py-32 border-t border-cream/[0.07]"
      >
        <FadeInSection>
          <div className="flex items-baseline justify-between mb-14">
            <h2 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl text-cream leading-tight">
              Writing.
            </h2>
            <Link
              href="/writing"
              className="text-xs tracking-[0.15em] uppercase text-terracotta hover:text-terracotta/70 transition-colors duration-200"
            >
              All essays →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {essays.map((essay) => (
              <Link key={essay.slug} href={`/writing/${essay.slug}`} className="group">
                <article>
                  <div className="border-t border-cream/20 pt-6">
                    <time className="text-[0.65rem] tracking-[0.18em] uppercase text-cream/40">
                      {essay.date}
                    </time>
                    <h3 className="font-serif text-xl md:text-[1.35rem] leading-snug mt-3 text-cream group-hover:text-terracotta group-hover:underline underline-offset-4 transition-colors duration-200">
                      {essay.title}
                    </h3>
                    <p className="text-sm text-cream/50 mt-3 leading-relaxed">
                      {essay.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* ── ABOUT TEASER ────────────────────────────────────────── */}
      <section
        id="about"
        className="px-6 md:px-14 py-20 md:py-32 border-t border-cream/[0.07]"
      >
        <FadeInSection>
          <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16">

            {/* Portrait */}
            <div
              className="overflow-hidden shrink-0 mx-auto md:mx-0 md:mt-8"
              style={{
                borderRadius: "50%",
                width: "clamp(160px, 16vw, 220px)",
                height: "clamp(160px, 16vw, 220px)",
              }}
            >
              <ProtectedImage
                src="/portrait.jpg"
                alt="Juan C. Nava"
                width={220}
                height={220}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-terracotta text-[0.65rem] tracking-[0.22em] uppercase mb-4">
                The photographer
              </p>
              <h2
                className="font-serif font-black text-cream leading-tight"
                style={{ fontSize: "clamp(2rem, 3vw + 1rem, 3.75rem)" }}
              >
                Juan C. Nava
              </h2>
              <p className="text-cream/40 text-xs tracking-wide mt-2">
                Independent photographer. Phoenix, AZ.
              </p>
              <div className="w-8 h-px bg-terracotta/50 my-6" />

              <p className="text-cream/55 text-base md:text-lg leading-relaxed max-w-xl">
                Born and raised in Phoenix. Documenting the people, places,
                and quiet moments that define the desert Southwest. The faces,
                the light, the stories hiding in plain sight.
              </p>

              {/* Bottom row — bottom-aligned */}
              <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">

                {/* Left: read more + signature */}
                <div className="flex flex-col items-start">
                  <Link
                    href="/about"
                    className="text-xs tracking-[0.18em] uppercase text-terracotta hover:text-terracotta/70 transition-colors duration-200"
                  >
                    Read more →
                  </Link>
                  <ProtectedImage
                    src="/signature.png"
                    alt="Juan C. Nava signature"
                    width={480}
                    height={192}
                    style={{ filter: "brightness(0.96) sepia(0.18) saturate(0.7)" }}
                    className="w-[220px] md:w-[300px] h-auto mt-5"
                  />
                </div>

                {/* Right: availability + booking + featured */}
                <div className="flex flex-col items-start md:items-end gap-5">
                  <div className="flex flex-col items-start md:items-end gap-1.5">
                    <Link
                      href="/book"
                      className="px-6 py-3 bg-terracotta text-bg text-xs tracking-[0.18em] uppercase hover:bg-terracotta/80 transition-colors duration-200"
                    >
                      Book Now
                    </Link>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <p className="text-[0.65rem] tracking-[0.22em] uppercase text-cream/30">
                      As featured in
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://www.peerspace.com/resources/street-photographers-phoenix/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-cream/10 hover:border-terracotta/40 text-cream/50 hover:text-terracotta text-xs tracking-[0.12em] uppercase transition-colors duration-200"
                      >
                        Peerspace
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 9L9 1M9 1H3M9 1V7"/>
                        </svg>
                      </a>
                      <a
                        href="https://canvasrebel.com/meet-juan-c/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-cream/10 hover:border-terracotta/40 text-cream/50 hover:text-terracotta text-xs tracking-[0.12em] uppercase transition-colors duration-200"
                      >
                        Canvas Rebel
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 9L9 1M9 1H3M9 1V7"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </FadeInSection>
      </section>

      <SiteFooter />
    </div>
  );
}
