import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import PrintBuyWidget from "../../components/PrintBuyWidget";
import prints from "../../../lib/prints";
import type { Metadata } from "next";

export function generateStaticParams() {
  return prints.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const print = prints.find((p) => p.id === id);
  if (!print) return {};
  const minPrice = Math.min(...print.sizes.map((s) => s.price));
  const description = `${print.description} Archival pigment print, signed and numbered. From $${(minPrice / 100).toFixed(0)}. Limited edition fine art print by Phoenix photographer Juan C. Nava.`;
  return {
    title: `${print.title} — Limited Edition Fine Art Print`,
    description,
    alternates: { canonical: `https://juancnava.com/prints/${print.id}` },
    openGraph: {
      title: `${print.title} — Limited Edition Print by Juan C. Nava`,
      description,
      url: `https://juancnava.com/prints/${print.id}`,
      type: "website",
      images: [
        {
          url: print.src,
          alt: print.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${print.title} — Limited Edition Fine Art Print`,
      description,
      images: [print.src],
    },
  };
}

export default async function PrintDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const print = prints.find((p) => p.id === id);
  if (!print) notFound();

  const startingPrice = Math.min(...print.sizes.map((s) => s.price));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${print.title} — Limited Edition Fine Art Print`,
    "description": print.description,
    "image": `https://juancnava.com${print.src}`,
    "brand": { "@type": "Brand", "name": "Juan C. Nava Photography" },
    "category": "Fine Art Photography Print",
    "offers": print.sizes.map((size) => ({
      "@type": "Offer",
      "name": size.label,
      "price": (size.price / 100).toFixed(2),
      "priceCurrency": "USD",
      "availability": size.remaining > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
      "seller": { "@type": "Organization", "name": "Juan C. Nava Photography", "url": "https://juancnava.com" },
      "url": `https://juancnava.com/prints/${print.id}`,
      "itemCondition": "https://schema.org/NewCondition",
    })),
  };

  return (
    <div className="min-h-screen bg-bg text-cream font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />

      <main className="pt-24 pb-32">

        {/* Back link */}
        <div className="px-6 md:px-14 mb-10">
          <Link
            href="/prints"
            className="inline-block text-xs tracking-[0.15em] uppercase text-terracotta hover:text-terracotta/70 transition-colors duration-200"
          >
            ← All Prints
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-0 md:gap-20 items-start max-w-6xl mx-auto px-0 md:px-14">

          {/* Image — full bleed on mobile */}
          <div className="w-full md:w-[45%] shrink-0">
            <div className="aspect-[3/4] w-full bg-surface-2 md:sticky md:top-8" />
          </div>

          {/* Details */}
          <div className="flex-1 px-6 md:px-0 mt-8 md:mt-0">
            <p className="text-terracotta text-[0.65rem] tracking-[0.22em] uppercase mb-4">
              Limited Edition Print
            </p>
            <h1
              className="font-serif font-black text-cream leading-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 3.5rem)" }}
            >
              {print.title}
            </h1>
            <p className="text-cream/50 text-base leading-relaxed mb-10 max-w-md">
              {print.description}
            </p>

            <div className="w-8 h-px bg-terracotta/40 mb-10" />

            <PrintBuyWidget sizes={print.sizes} />

            <div className="mt-14 pt-10 border-t border-cream/[0.07]">
              <p className="text-cream/20 text-xs leading-relaxed max-w-sm">
                Produced on Hahnem&uuml;hle Photo Rag Baryta paper using archival inks.
                Editions are strictly limited and will not be reprinted once sold out.
                Ships flat in archival protective packaging within two weeks.{" "}
                <Link href="/policies" className="text-terracotta/40 hover:text-terracotta transition-colors duration-200">
                  Shipping & return policy →
                </Link>
              </p>
            </div>
          </div>

        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
