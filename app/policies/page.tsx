import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies",
  description: "Shipping, returns, and privacy policy for Juan C. Nava Photography prints and shop.",
};

const sections = [
  {
    title: "Shipping",
    items: [
      {
        heading: "Production time",
        body: "All prints are made to order. Please allow 10–14 business days for production before shipment.",
      },
      {
        heading: "Domestic (US)",
        body: "Ships flat in rigid archival packaging via USPS Priority Mail or FedEx Ground. Typically arrives 2–5 business days after shipment. Free shipping on orders over $200.",
      },
      {
        heading: "International",
        body: "International shipping is available. Duties, taxes, and customs fees are the responsibility of the buyer and vary by destination country.",
      },
      {
        heading: "Tracking",
        body: "A tracking number will be emailed once your order ships.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        heading: "Damaged prints",
        body: "If your print arrives damaged, email contact@juancnava.com with photos of the damage within 7 days of delivery. A replacement will be sent at no cost.",
      },
      {
        heading: "All sales final",
        body: "Because prints are made to order, all sales are final. Please read edition sizes and dimensions carefully before purchasing. If you have questions, reach out before ordering.",
      },
      {
        heading: "Edition integrity",
        body: "Once a print edition sells out, it will not be reprinted. Certificates of authenticity are included with all limited edition prints.",
      },
    ],
  },
  {
    title: "Privacy",
    items: [
      {
        heading: "What we collect",
        body: "When you make a purchase or sign up for the newsletter, we collect your name and email address. We do not sell or share your information with third parties.",
      },
      {
        heading: "Analytics",
        body: "This site uses Vercel Analytics to understand traffic patterns. No personally identifiable information is collected. No cookies are used for tracking.",
      },
      {
        heading: "Email",
        body: "If you subscribe to the newsletter, you can unsubscribe at any time via the link in any email. We send infrequently — new work, new prints, and essays when they're ready.",
      },
      {
        heading: "Contact",
        body: "For any privacy-related questions: contact@juancnava.com",
      },
    ],
  },
];

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-bg text-cream font-sans">
      <SiteNav />

      <main className="px-6 md:px-14 pt-32 pb-32 max-w-3xl">

        <p className="text-terracotta text-[0.65rem] tracking-[0.22em] uppercase mb-4">
          The fine print
        </p>
        <h1
          className="font-serif font-black text-cream leading-tight mb-16"
          style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 4rem)" }}
        >
          Policies.
        </h1>

        <div className="flex flex-col gap-20">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-serif font-black text-2xl md:text-3xl text-cream mb-8 pb-5 border-b border-cream/[0.07]">
                {section.title}.
              </h2>
              <div className="flex flex-col gap-8">
                {section.items.map((item) => (
                  <div key={item.heading} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-8">
                    <p className="text-[0.65rem] tracking-[0.18em] uppercase text-cream/35 md:pt-0.5">
                      {item.heading}
                    </p>
                    <p className="text-cream/60 text-sm leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 pt-10 border-t border-cream/[0.07]">
          <p className="text-cream/20 text-xs tracking-wide">
            Last updated April 2026. Questions? Email{" "}
            <a
              href="mailto:contact@juancnava.com"
              className="text-terracotta/60 hover:text-terracotta transition-colors duration-200"
            >
              contact@juancnava.com
            </a>
          </p>
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
