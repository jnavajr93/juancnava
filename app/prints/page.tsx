import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import PrintCard from "../components/PrintCard";
import prints from "../../lib/prints";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Limited Edition Fine Art Prints — Phoenix Documentary Photography",
  description: "Limited edition archival pigment prints, signed and numbered. Fine art photography prints by Juan C. Nava, documentary photographer in Phoenix, Arizona.",
  alternates: { canonical: "https://juancnava.com/prints" },
  openGraph: {
    title: "Limited Edition Fine Art Prints — Juan C. Nava Photography",
    description: "Archival pigment prints, signed and numbered. Fine art photography from Phoenix, Arizona.",
    url: "https://juancnava.com/prints",
    images: [{ url: "/phoenix-arizona-desert-sunset-saguaro-cactus-documentary-photography.jpg", width: 1500, alt: "Fine art limited edition photography prints — Juan C. Nava" }],
  },
};

export default function PrintsPage() {
  return (
    <div className="min-h-screen bg-bg text-cream font-sans">
      <SiteNav />

      <main className="px-6 md:px-14 pt-28 pb-24">
        {/* Hero statement */}
        <div className="mb-16 md:mb-20 max-w-xl">
          <h1
            className="font-serif font-black text-cream leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 5vw + 1rem, 5.5rem)" }}
          >
            Own the work.
          </h1>
          <p className="text-cream/40 text-sm mt-5 leading-relaxed">
            Archival pigment prints. Limited editions. Signed and numbered.<br />
            Each print ships within two weeks of purchase.
          </p>
        </div>

        <div className="w-12 h-px bg-terracotta/50 mb-16" />

        {/* Print grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {prints.map((print) => (
            <PrintCard key={print.id} print={print} />
          ))}
        </div>

        {/* Fine print */}
        <p className="mt-20 text-cream/20 text-xs tracking-wide max-w-md leading-relaxed">
          All prints are produced on Hahnem&uuml;hle Photo Rag Baryta paper using archival inks.
          Editions are strictly limited. Once sold out, they will not be reprinted.
          Prints ship flat in archival protective packaging.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
