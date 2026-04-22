import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import BookingWidget from "../../components/BookingWidget";
import sessions from "../../../lib/sessions";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return sessions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const session = sessions.find((s) => s.slug === slug);
  if (!session) return {};
  return {
    title: `${session.name} Photographer Phoenix AZ`,
    description: `${session.shortDescription} Book a ${session.name.toLowerCase()} session with Juan C. Nava in Phoenix, Arizona. ${session.price}.`,
    alternates: { canonical: `https://juancnava.com/book/${session.slug}` },
    openGraph: {
      title: `${session.name} Photography — Juan C. Nava, Phoenix AZ`,
      description: `${session.shortDescription} ${session.price}.`,
      url: `https://juancnava.com/book/${session.slug}`,
      images: [{ url: "/phoenix-arizona-desert-sunset-saguaro-cactus-documentary-photography.jpg", width: 1500, alt: `${session.name} photographer Phoenix AZ — Juan C. Nava` }],
    },
  };
}

export default async function SessionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = sessions.find((s) => s.slug === slug);
  if (!session) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${session.name} Photography — Phoenix, AZ`,
    "description": session.fullDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Juan C. Nava Photography",
      "url": "https://juancnava.com",
      "telephone": null,
      "address": { "@type": "PostalAddress", "addressLocality": "Phoenix", "addressRegion": "AZ", "addressCountry": "US" },
    },
    "areaServed": { "@type": "City", "name": "Phoenix", "addressRegion": "AZ" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": parseInt(session.price.replace(/[^0-9]/g, ""), 10), "priceCurrency": "USD" },
      "url": `https://juancnava.com/book/${session.slug}`,
    },
    "url": `https://juancnava.com/book/${session.slug}`,
  };

  return (
    <div className="min-h-screen bg-bg text-cream font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />

      <main className="px-6 md:px-14 pt-32 pb-32 max-w-7xl mx-auto">

        {/* Mobile: image first, then content */}
        {/* Desktop: 60/40 split, content left, image right */}
        <div className="flex flex-col md:flex-row gap-14 md:gap-20">

          {/* ── LEFT COLUMN (60%) ──────────────────────────────── */}
          <div className="flex-1 md:max-w-[60%]">

            {/* Back link */}
            <Link
              href="/book"
              className="inline-block text-xs tracking-[0.15em] uppercase text-terracotta hover:text-terracotta/70 transition-colors duration-200 mb-12"
            >
              ← All Sessions
            </Link>

            {/* Name + price */}
            <p className="text-terracotta text-[0.65rem] tracking-[0.22em] uppercase mb-4">
              {session.duration}
            </p>
            <h1
              className="font-serif font-black text-cream leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 3.5vw + 0.5rem, 4.5rem)" }}
            >
              {session.name}
            </h1>
            <p className="text-terracotta text-sm tracking-wide mb-8">
              {session.price}
            </p>

            {/* Divider */}
            <div className="w-10 h-px bg-terracotta/40 mb-8" />

            {/* Full description */}
            <p className="text-cream/60 text-base md:text-lg leading-relaxed mb-14 max-w-prose">
              {session.fullDescription}
            </p>

            {/* What You Can Expect */}
            <div className="mb-14">
              <h2 className="font-serif font-black text-cream text-lg md:text-xl mb-8">
                What You Can Expect
              </h2>
              <ul className="flex flex-col gap-7">
                {session.expectations.map((exp) => (
                  <li key={exp.label} className="flex gap-5">
                    <span className="text-terracotta/50 mt-1 shrink-0 text-xs">—</span>
                    <div>
                      <span className="text-cream text-sm font-semibold tracking-wide">
                        {exp.label}.{" "}
                      </span>
                      <span className="text-cream/50 text-sm leading-relaxed">
                        {exp.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>


          </div>

          {/* ── RIGHT COLUMN (40%) ─────────────────────────────── */}
          <div className="w-full md:w-[40%] shrink-0 order-first md:order-last">

            {/* Image placeholder */}
            <div
              className="w-full bg-surface-2"
              style={{
                aspectRatio: session.aspectRatio === "wide" ? "16/9" : "3/4",
              }}
            />

            {/* What's included */}
            <div className="mt-6">
              <div className="w-full h-px bg-terracotta/30 mb-5" />
              <p className="text-[0.6rem] tracking-[0.2em] uppercase text-cream/25 mb-4">
                What&rsquo;s included
              </p>
              <ul className="flex flex-col gap-2.5">
                {session.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-xs text-cream/40 leading-relaxed"
                  >
                    <span className="text-terracotta/40 shrink-0 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* ── BOOKING WIDGET ───────────────────────────────────── */}
        <div className="mt-20 md:mt-28 pt-16 md:pt-20 border-t border-cream/[0.07]">
          <BookingWidget session={session} />
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
