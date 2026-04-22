import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import sessions from "../../lib/sessions";
import { sessionTestimonials } from "../../lib/testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Session — Phoenix Portrait & Wedding Photographer",
  description:
    "Book a photography session with Juan C. Nava in Phoenix, AZ — headshots, portraits, maternity, senior portraits, weddings, and events. Documentary approach.",
  alternates: { canonical: "https://juancnava.com/book" },
  openGraph: {
    title: "Book a Photography Session — Juan C. Nava, Phoenix AZ",
    description: "Book headshots, portraits, maternity, graduations, weddings, or events with Phoenix documentary photographer Juan C. Nava.",
    url: "https://juancnava.com/book",
    images: [{ url: "/phoenix-arizona-desert-sunset-saguaro-cactus-documentary-photography.jpg", width: 1500, alt: "Book a photography session — Juan C. Nava, Phoenix AZ" }],
  },
};

export default function BookPage() {
  return (
    <div className="min-h-screen bg-bg text-cream font-sans">
      <SiteNav />

      <main className="pb-32">

        {/* ── PAGE HEADER ──────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col">
          <div className="flex flex-col justify-end px-6 md:px-14 pb-8 pt-32 w-full flex-1">
            <div className="max-w-2xl">
              <h1
                className="font-serif font-black leading-[1.06] tracking-tight text-cream"
                style={{ fontSize: "clamp(2rem, 4.5vw + 1.5rem, 6.5rem)" }}
              >
                Photography is about capturing souls, not smiles.
              </h1>
              <p className="mt-8 text-cream/50 text-sm md:text-base tracking-wide max-w-sm">
                Documentary. Intentional. Personal.
              </p>
              <div className="w-12 h-px bg-terracotta/50 my-6" />
              <p className="text-terracotta text-[0.65rem] tracking-[0.22em] uppercase">
                Work Together
              </p>
            </div>
          </div>

          {/* Session type nav — truly full-width centered */}
          <div className="w-full pb-10 md:pb-14 flex flex-wrap justify-center gap-x-10 gap-y-3 px-6 md:px-14">
            {sessions.map((s) => (
              <Link
                key={s.slug}
                href={`/book/${s.slug}`}
                className="text-cream/30 hover:text-terracotta text-[0.65rem] tracking-[0.18em] uppercase transition-colors duration-200"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
        <div className="border-t border-cream/[0.07] px-6 md:px-14 py-16 md:py-20">
          <p className="text-terracotta text-[0.65rem] tracking-[0.22em] uppercase mb-12">
            How it works
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {[
              { step: "01", label: "Reach out", body: "Tell me what you're thinking. No commitment, no pressure. Just a message." },
              { step: "02", label: "We connect", body: "A quick email exchange to talk through what you're looking for and find the right fit." },
              { step: "03", label: "The session", body: "Relaxed, unhurried, and real. I handle everything. You just show up." },
              { step: "04", label: "Your gallery", body: "A private online gallery delivered within the agreed window. Full resolution, ready to print." },
            ].map(({ step, label, body }) => (
              <div key={step} className="flex flex-col gap-4">
                <span className="text-terracotta/40 text-xs tracking-[0.2em] font-mono">{step}</span>
                <h3 className="font-serif font-black text-cream text-xl">{label}</h3>
                <p className="text-cream/40 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TESTIMONIALS ─────────────────────────────────────── */}
        <div className="border-t border-cream/[0.07] px-6 md:px-14 py-16 md:py-20">
          <p className="text-terracotta text-[0.65rem] tracking-[0.22em] uppercase mb-14">
            Kind words
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {sessionTestimonials.map((t) => (
              <div key={t.name} className="flex flex-col gap-5">
                <p className="font-serif text-cream/80 text-lg md:text-xl leading-snug">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-cream text-xs tracking-wide font-semibold">{t.name}</p>
                  <p className="text-cream/30 text-xs tracking-wide mt-0.5">{t.session}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SESSION CARDS ─────────────────────────────────────── */}
        <div className="flex flex-col">
          {sessions.map((session, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={session.slug}
                className="border-t border-cream/[0.07] px-6 md:px-14 py-16 md:py-24"
              >
                <div
                  className={`flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-12 md:gap-20 items-start`}
                >
                  {/* Image placeholder */}
                  <div className="w-full md:w-2/5 shrink-0">
                    <div
                      className="w-full bg-surface-2"
                      style={{
                        aspectRatio:
                          session.aspectRatio === "wide" ? "16/9" : "3/4",
                      }}
                    />
                  </div>

                  {/* Text content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-terracotta text-xs tracking-[0.18em] uppercase mb-4">
                      {session.duration}
                    </p>
                    <h2
                      className="font-serif font-black text-cream leading-tight mb-3"
                      style={{ fontSize: "clamp(1.75rem, 2.5vw + 0.5rem, 3rem)" }}
                    >
                      {session.name}
                    </h2>
                    <p className="text-terracotta text-sm tracking-wide mb-6">
                      {session.price}
                    </p>
                    <p className="text-cream/55 text-base leading-relaxed mb-8 max-w-lg">
                      {session.shortDescription}
                    </p>

                    {/* What's included */}
                    <ul className="flex flex-col gap-2 mb-10">
                      {session.includes.slice(0, 3).map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-xs text-cream/35 tracking-wide"
                        >
                          <span className="text-terracotta/60 mt-0.5 shrink-0">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/book/${session.slug}`}
                      className="self-start px-6 py-3 border border-terracotta/60 text-terracotta hover:bg-terracotta hover:text-bg text-xs tracking-[0.18em] uppercase transition-colors duration-200"
                    >
                      Book This Session →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <div className="border-t border-cream/[0.07] px-6 md:px-14 py-20 md:py-28">
          <p className="text-terracotta text-[0.65rem] tracking-[0.22em] uppercase mb-12">
            Common questions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 max-w-4xl">
            {[
              {
                q: "Do you travel outside Phoenix?",
                a: "Yes, within the Southwest. Travel fees may apply for locations beyond 50 miles from Phoenix.",
              },
              {
                q: "What should I wear?",
                a: "Whatever feels like you. Avoid busy patterns. We can talk it through before your session.",
              },
              {
                q: "How do I pay?",
                a: "A deposit holds your date. The remaining balance is due before your session.",
              },
              {
                q: "What if the weather is bad?",
                a: "We reschedule. No fees, no stress. Weather happens, especially in the desert.",
              },
              {
                q: "Can I print my photos?",
                a: "Yes. Every gallery comes with a full personal print release. Print wherever you like.",
              },
              {
                q: "How long until I get my photos?",
                a: "Turnaround time depends on the session type. Each session page lists the exact timeframe.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="flex flex-col gap-2">
                <p className="font-serif text-cream text-base font-bold">{q}</p>
                <p className="text-cream/45 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM CTA ───────────────────────────────────────── */}
        <div className="border-t border-cream/[0.07] px-6 md:px-14 pt-20 md:pt-28 flex flex-col items-center text-center gap-4">
          <div className="w-8 h-px bg-terracotta/40" />
          <p className="text-cream/50 text-base mt-2">
            Not sure what you need? That&rsquo;s okay.
          </p>
          <a
            href="mailto:contact@juancnava.com"
            className="text-sm tracking-[0.12em] text-terracotta hover:text-terracotta/70 transition-colors duration-200"
          >
            Send me a message and we&rsquo;ll figure it out →
          </a>
          <p className="text-cream/25 text-xs tracking-wide">
            I respond within 48 hours.
          </p>
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
