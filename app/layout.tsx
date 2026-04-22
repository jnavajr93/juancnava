import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const BASE = "https://juancnava.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Juan C. Nava — Documentary Photography | Phoenix, AZ",
    template: "%s — Juan C. Nava Photography",
  },
  description:
    "Juan C. Nava is a documentary photographer and visual storyteller based in Phoenix, Arizona. Capturing authentic moments, portraits, and desert landscapes on film and digital.",
  keywords: [
    "documentary photographer Phoenix AZ",
    "Juan C. Nava photography",
    "Phoenix Arizona photographer",
    "documentary photography",
    "film photography Arizona",
    "desert photography",
    "portrait photographer Phoenix",
    "visual storytelling",
  ],
  authors: [{ name: "Juan C. Nava", url: BASE }],
  creator: "Juan C. Nava",
  openGraph: {
    title: "Juan C. Nava — Documentary Photography",
    description: "Documentary photography & visual storytelling from Phoenix, AZ",
    url: BASE,
    siteName: "Juan C. Nava Photography",
    images: [
      {
        url: "/phoenix-arizona-desert-sunset-saguaro-cactus-documentary-photography.jpg",
        width: 1500,
        alt: "Saguaro cactus silhouette at Arizona desert sunset — Juan C. Nava Photography",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan C. Nava — Documentary Photography",
    description: "Documentary photography & visual storytelling from Phoenix, AZ",
    images: ["/phoenix-arizona-desert-sunset-saguaro-cactus-documentary-photography.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32 16x16", type: "image/x-icon" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Photographer"],
  "@id": "https://juancnava.com",
  "name": "Juan C. Nava Photography",
  "description": "Documentary photographer and visual storyteller based in Phoenix, Arizona. Specializing in portraits, families, maternity, weddings, and fine art limited edition prints.",
  "url": "https://juancnava.com",
  "email": "contact@juancnava.com",
  "image": "https://juancnava.com/phoenix-arizona-desert-sunset-saguaro-cactus-documentary-photography.jpg",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Phoenix",
    "addressRegion": "AZ",
    "addressCountry": "US",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.4484,
    "longitude": -112.0740,
  },
  "areaServed": [
    { "@type": "City", "name": "Phoenix", "sameAs": "https://en.wikipedia.org/wiki/Phoenix,_Arizona" },
    { "@type": "City", "name": "Scottsdale" },
    { "@type": "City", "name": "Tempe" },
    { "@type": "City", "name": "Mesa" },
    { "@type": "City", "name": "Chandler" },
    { "@type": "City", "name": "Tucson" },
    { "@type": "State", "name": "Arizona" },
  ],
  "sameAs": [
    "https://instagram.com/juancnava",
    "https://youtube.com/@juancnava",
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Photography Sessions — Phoenix, AZ",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Headshots Photography — Phoenix AZ", "description": "Professional headshots for LinkedIn, business, or personal brand. 1 hour, 20 edited images." },
        "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": 250, "priceCurrency": "USD" },
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Portrait & Family Photography — Phoenix AZ", "description": "Relaxed, documentary-style family portraits. 1.5 hours, 30 edited images." },
        "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": 350, "priceCurrency": "USD" },
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Maternity Photography — Phoenix AZ", "description": "Maternity sessions, indoor or outdoor. 1.5 hours, 30 edited images." },
        "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": 400, "priceCurrency": "USD" },
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Senior & Graduation Photography — Phoenix AZ", "description": "Senior portraits and graduation photography. 1 hour, 25 edited images." },
        "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": 250, "priceCurrency": "USD" },
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Wedding Photography — Phoenix AZ", "description": "Full day wedding and elopement coverage. Documentary approach, no forced poses." },
        "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": 2000, "priceCurrency": "USD" },
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Event Photography — Phoenix AZ", "description": "Corporate events, community gatherings, and cultural celebrations." },
        "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": 500, "priceCurrency": "USD" },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
