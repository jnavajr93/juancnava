"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Archive", href: "/gallery" },
  { label: "Shop", href: "/shop" },
  { label: "Book", href: "/book" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
] as const;

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  // Close menu on route change (escape key too)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-bg border-b border-cream/10 flex items-center justify-between px-6 md:px-14 py-4">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center shrink-0">
          {/* Plain img avoids next/image wrapper compositing layer that blocks grain overlay */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Juan C. Nava"
            className="h-7 md:h-9 w-auto hover:opacity-70 transition-opacity duration-300"
            style={{ filter: "brightness(0) saturate(100%) invert(94%) sepia(10%) saturate(350%) hue-rotate(345deg) brightness(103%)" }}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 text-xs tracking-[0.15em] uppercase text-cream/50">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className="hover:text-terracotta transition-colors duration-200">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 shrink-0"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`block w-5 h-px bg-cream/60 transition-all duration-300 origin-center ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-cream/60 transition-all duration-200 ${
              open ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-cream/60 transition-all duration-300 origin-center ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-bg/90"
          onClick={() => setOpen(false)}
        />

        {/* Menu panel — slides down from nav */}
        <div
          className={`absolute top-[57px] left-0 right-0 bg-bg border-b border-cream/10 transition-transform duration-300 ease-out ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <ul className="flex flex-col px-6 py-6 gap-1">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm tracking-[0.15em] uppercase text-cream/60 hover:text-terracotta transition-colors duration-200 border-b border-cream/[0.06] last:border-0"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
