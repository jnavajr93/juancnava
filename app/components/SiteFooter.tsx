import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-terracotta/40 px-6 md:px-14 pt-16 md:pt-20 pb-10">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-px bg-terracotta/50" />
        <a
          href="mailto:contact@juancnava.com"
          className="text-sm text-cream/50 hover:text-terracotta transition-colors duration-200 tracking-wide"
        >
          contact@juancnava.com
        </a>
        <div className="flex gap-5 items-center">
          <a
            href="https://instagram.com/juancnava"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-cream/30 hover:text-terracotta transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a
            href="https://youtube.com/@juancnava"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-cream/30 hover:text-terracotta transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 mt-10">
        <p className="text-cream/20 text-xs tracking-wide">
          © 2026 Juan C. Nava. All rights reserved.
        </p>
        <span className="text-cream/10 text-xs">·</span>
        <Link
          href="/policies"
          className="text-cream/20 hover:text-terracotta text-xs tracking-wide transition-colors duration-200"
        >
          Policies
        </Link>
      </div>
    </footer>
  );
}
