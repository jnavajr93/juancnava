import Link from "next/link";
import type { Metadata } from "next";
import ProtectedImage from "../components/ProtectedImage";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "About — Phoenix Documentary Photographer",
  description:
    "Juan C. Nava is an independent documentary photographer born and raised in Phoenix, Arizona — capturing the people, places, and quiet moments of the desert Southwest.",
  alternates: { canonical: "https://juancnava.com/about" },
  openGraph: {
    title: "About Juan C. Nava — Phoenix Documentary Photographer",
    description: "Independent documentary photographer born and raised in Phoenix, AZ. Portraits, families, weddings, and fine art prints.",
    url: "https://juancnava.com/about",
    images: [{ url: "/portrait.jpg", alt: "Juan C. Nava — documentary photographer, Phoenix AZ" }],
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-bg text-cream font-sans">
      <SiteNav />

      {/* ── MAIN ────────────────────────────────────────────────── */}
      <main className="px-6 md:px-14 pt-32 pb-24 md:pb-32 max-w-6xl mx-auto">

        {/* Portrait + name row */}
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 mb-12 md:mb-16">
          <div
            className="overflow-hidden shrink-0 self-center md:self-auto"
            style={{
              borderRadius: "50%",
              width: "clamp(160px, 18vw, 220px)",
              height: "clamp(160px, 18vw, 220px)",
            }}
          >
            <ProtectedImage
              src="/portrait.jpg"
              alt="Juan C. Nava — documentary photographer, Phoenix AZ"
              width={220}
              height={220}
              priority
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <h1 className="font-serif font-black text-cream text-3xl md:text-4xl leading-tight">
              Juan C. Nava
            </h1>
            <p className="text-terracotta text-xs tracking-[0.18em] uppercase mt-2">
              Documentary Photographer. Phoenix, AZ.
            </p>
          </div>
        </div>

        {/* Terracotta rule */}
        <div className="w-12 h-px bg-terracotta/50 mb-6 md:mb-8" />

        {/* Casual intro line — sits above the grid so both columns start evenly */}
        <p className="font-serif text-cream text-xl md:text-2xl leading-snug mb-10 md:mb-12">
          Hi, thanks for being here.
        </p>

        {/* Two-column bio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 text-cream/70 text-base leading-relaxed mb-14">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <p>
              I am an independent photographer born and raised in Phoenix, Arizona.
              I am passionate about photography because it allows me to share expressions
              of my soul within every image, creating a connection that resonates with others.
              It teaches me to pause, be observant, and appreciate the evolving, unceasing
              complexity of life for a single moment, turning fleeting moments into beautiful memories.
            </p>
            <p>
              To me, photography is about preserving the moments that define us, the ones that
              often go unnoticed in the rush of life: the fleeting expressions, the quiet
              interactions, the emotions that pass in an instant. I focus on freezing these
              moments so you can hold onto them forever.
            </p>
            <p>
              I love capturing the art of life.<br />
              It sounds clich&eacute;, sure. But it&rsquo;s as simple as that.
            </p>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <p>
              Besides photography, I spend my time with my beautiful wife and son,
              working in ophthalmology, exercising, watching documentaries, and learning
              new things. Between my career in eye care and photography, I&rsquo;ve come to
              appreciate the subtle details most people overlook: the way light moves,
              the fleeting nature of a moment, the simple things that hold the most meaning.
            </p>
            <p>
              I&rsquo;ve learned that life isn&rsquo;t about chasing perfect moments; it&rsquo;s about living
              in the real ones, the raw seconds that slip unnoticed. Those are the moments
              that truly define us.
            </p>
            <p>
              Now that you know a little about me and my story, I would love to capture yours.
              Whether it&rsquo;s capturing a milestone, a quiet morning with your loved ones,
              or simply every day moments that matter, I&rsquo;ll bring my camera to capture your
              fleeting moments and help you transform them into something you will cherish forever.
            </p>
          </div>
        </div>

        {/* Signature + Book Now + As Featured In */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16 md:mb-20">

          {/* Left: signature */}
          <ProtectedImage
            src="/signature.png"
            alt="Juan C. Nava signature"
            width={480}
            height={192}
            style={{ filter: "brightness(0.96) sepia(0.18) saturate(0.7)" }}
            className="w-[260px] md:w-[420px] h-auto"
          />

          {/* Right: Book Now + As Featured In */}
          <div className="flex flex-col items-start md:items-end gap-5">
            <Link
              href="/book"
              className="px-6 py-3 bg-terracotta text-bg text-xs tracking-[0.18em] uppercase hover:bg-terracotta/80 transition-colors duration-200"
            >
              Book Now
            </Link>
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


      </main>

      <SiteFooter />
    </div>
  );
}
