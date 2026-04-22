import Link from "next/link";
import SiteNav from "./components/SiteNav";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-cream font-sans flex flex-col">
      <SiteNav />
      <main className="flex-1 flex flex-col justify-end px-6 md:px-14 pb-20 md:pb-28 pt-32">
        <div className="max-w-2xl">
          <p className="text-terracotta text-[0.65rem] tracking-[0.22em] uppercase mb-6">
            404
          </p>
          <h1
            className="font-serif font-black text-cream leading-[1.06] tracking-tight mb-8"
            style={{ fontSize: "clamp(2rem, 4.5vw + 1.5rem, 6.5rem)" }}
          >
            This frame doesn&rsquo;t exist.
          </h1>
          <p className="text-cream/40 text-sm md:text-base tracking-wide max-w-sm mb-12">
            The page you&rsquo;re looking for isn&rsquo;t here. It may have moved or never existed.
          </p>
          <div className="flex flex-wrap gap-8">
            <Link
              href="/"
              className="text-xs tracking-[0.18em] uppercase text-terracotta hover:text-terracotta/70 transition-colors duration-200"
            >
              Back to home →
            </Link>
            <Link
              href="/gallery"
              className="text-xs tracking-[0.18em] uppercase text-cream/30 hover:text-cream/60 transition-colors duration-200"
            >
              View gallery →
            </Link>
          </div>
        </div>
        <div className="mt-16 md:mt-20 w-12 h-px bg-terracotta" />
      </main>
    </div>
  );
}
