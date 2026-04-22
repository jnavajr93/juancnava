import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import GalleryGrid from "../components/GalleryGrid";
import gallery from "../../lib/gallery";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery — Documentary Photography",
  description: "Photo gallery by Juan C. Nava — documentary portraits, desert landscapes, and street photography from Phoenix, Arizona and the Southwest.",
  alternates: { canonical: "https://juancnava.com/gallery" },
  openGraph: {
    title: "Photo Gallery — Juan C. Nava Photography",
    description: "Documentary portraits, desert landscapes, and street photography from Phoenix, Arizona.",
    url: "https://juancnava.com/gallery",
    images: [{ url: "/phoenix-arizona-desert-sunset-saguaro-cactus-documentary-photography.jpg", width: 1500, alt: "Documentary photography — Juan C. Nava, Phoenix AZ" }],
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-bg text-cream font-sans">
      <SiteNav />

      <main className="px-6 md:px-14 pt-28 pb-24">
        <div className="flex items-baseline justify-between mb-10">
          <h1 className="font-serif font-black text-4xl md:text-5xl text-cream leading-tight">Gallery.</h1>
          <span className="text-xs tracking-[0.15em] uppercase text-cream/30">
            {gallery.length} photographs
          </span>
        </div>

        <GalleryGrid images={gallery} />
      </main>

      <SiteFooter />
    </div>
  );
}
