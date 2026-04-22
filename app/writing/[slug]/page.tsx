import { notFound } from "next/navigation";
import Link from "next/link";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import EmailSignup from "../../components/EmailSignup";
import essays from "../../../lib/essays";

export function generateStaticParams() {
  return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = essays.find((e) => e.slug === slug);
  if (!essay) return {};
  return {
    title: essay.title,
    description: essay.excerpt,
    alternates: { canonical: `https://juancnava.com/writing/${slug}` },
    openGraph: {
      title: essay.title,
      description: essay.excerpt,
      url: `https://juancnava.com/writing/${essay.slug}`,
      type: "article",
      publishedTime: essay.date,
      images: [
        {
          url: "/phoenix-arizona-desert-sunset-saguaro-cactus-documentary-photography.jpg",
          width: 1500,
          alt: essay.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: essay.title,
      description: essay.excerpt,
      images: ["/phoenix-arizona-desert-sunset-saguaro-cactus-documentary-photography.jpg"],
    },
  };
}

const dateToIso: Record<string, string> = {
  "November 2025": "2025-11-01",
  "January 2026": "2026-01-01",
  "March 2026": "2026-03-01",
};

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = essays.find((e) => e.slug === slug);
  if (!essay) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": essay.title,
    "description": essay.excerpt,
    "datePublished": dateToIso[essay.date] ?? essay.date,
    "dateModified": dateToIso[essay.date] ?? essay.date,
    "author": {
      "@type": "Person",
      "name": "Juan C. Nava",
      "url": "https://juancnava.com",
      "jobTitle": "Documentary Photographer",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Juan C. Nava Photography",
      "url": "https://juancnava.com",
      "logo": { "@type": "ImageObject", "url": "https://juancnava.com/logo.png" },
    },
    "url": `https://juancnava.com/writing/${essay.slug}`,
    "image": "https://juancnava.com/phoenix-arizona-desert-sunset-saguaro-cactus-documentary-photography.jpg",
    "articleSection": essay.category,
    "keywords": ["photography", "documentary photography", "Phoenix photographer", "visual storytelling"],
    "inLanguage": "en-US",
  };

  const paragraphs = essay.body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const readTime = Math.max(1, Math.ceil(essay.body.split(/\s+/).length / 200));

  // Drop cap: split first paragraph into first char + rest
  const firstPara = paragraphs[0] ?? "";
  const dropCapLetter = firstPara.charAt(0);
  const firstParaRest = firstPara.slice(1);
  const restParagraphs = paragraphs.slice(1);

  return (
    <div className="min-h-screen text-cream font-sans" style={{ backgroundColor: "#141210" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />

      <main className="px-6 md:px-14 pt-28 pb-0">
        <div className="max-w-[65ch] mx-auto">

          {/* Back */}
          <Link
            href="/writing"
            className="text-xs tracking-[0.15em] uppercase text-cream/30 hover:text-terracotta transition-colors duration-200 mb-12 inline-block"
          >
            ← Writing
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[0.65rem] tracking-[0.22em] uppercase text-cream/25">
              {essay.category}
            </span>
            <span className="text-cream/15 text-[0.65rem]">·</span>
            <time className="text-[0.65rem] tracking-[0.18em] uppercase text-cream/30">
              {essay.date}
            </time>
            <span className="text-cream/15 text-[0.65rem]">·</span>
            <span className="text-[0.65rem] tracking-[0.18em] uppercase text-cream/25">
              {readTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif font-black text-3xl md:text-4xl lg:text-5xl text-cream leading-[1.08] mb-6">
            {essay.title}
          </h1>

          {/* Excerpt */}
          <p className="text-cream/40 text-base italic font-serif mb-10">{essay.excerpt}</p>

          <div className="w-8 h-px bg-terracotta/50 mb-12" />

          {/* Body */}
          <div className="flex flex-col gap-6 text-cream/75 text-base md:text-[1.05rem] leading-[1.85]">

            {/* First paragraph with drop cap */}
            <p>
              <span
                className="float-left font-serif font-black text-terracotta leading-[0.85] mr-2 mt-1 select-none"
                style={{ fontSize: "clamp(3.5rem, 6vw, 4.5rem)" }}
                aria-hidden="true"
              >
                {dropCapLetter}
              </span>
              {(() => {
                const parts = firstParaRest.split(/(\*[^*]+\*)/g);
                return parts.map((part, j) =>
                  part.startsWith("*") && part.endsWith("*") ? (
                    <em key={j}>{part.slice(1, -1)}</em>
                  ) : (
                    part
                  )
                );
              })()}
            </p>

            {/* Remaining paragraphs */}
            {restParagraphs.map((p, i) => {
              const parts = p.split(/(\*[^*]+\*)/g);
              return (
                <p key={i}>
                  {parts.map((part, j) =>
                    part.startsWith("*") && part.endsWith("*") ? (
                      <em key={j}>{part.slice(1, -1)}</em>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-terracotta/30 mt-20 mb-0" />

        </div>
      </main>

      {/* ── END-OF-ESSAY SUBSCRIBE ───────────────────────────────── */}
      <section className="px-6 md:px-14 py-20 md:py-28">
        <div className="max-w-[65ch] mx-auto">
          <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-20">

            <div className="flex-1">
              <h2
                className="font-serif font-black text-cream leading-tight"
                style={{ fontSize: "clamp(2rem, 3.5vw + 0.5rem, 3.25rem)" }}
              >
                Stay in the work.
              </h2>
              <p className="font-serif italic text-cream/35 text-sm mt-3 max-w-xs">
                New essays when they&rsquo;re ready. Nothing else. No noise.
              </p>
            </div>

            <div className="w-full md:w-[340px] shrink-0">
              <EmailSignup context="writing" variant="block" />
            </div>

          </div>

          <div className="w-full h-px bg-terracotta/20 mt-16 mb-10" />

          <Link
            href="/writing"
            className="text-xs tracking-[0.15em] uppercase text-cream/30 hover:text-terracotta transition-colors duration-200"
          >
            ← More writing
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
