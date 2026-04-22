import Link from "next/link";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";

export const metadata = {
  title: "Order Confirmed — Juan C. Nava Photography",
  robots: { index: false, follow: false },
};

export default function PrintSuccessPage() {
  return (
    <div className="min-h-screen bg-bg text-cream font-sans">
      <SiteNav />
      <main className="px-6 md:px-14 pt-40 pb-32 max-w-lg">
        <div className="w-8 h-px bg-terracotta mb-10" />
        <h1 className="font-serif font-black text-3xl md:text-4xl text-cream leading-tight mb-6">
          Thank you.
        </h1>
        <p className="text-cream/60 text-base leading-relaxed mb-4">
          Your order is confirmed. You&rsquo;ll receive a receipt by email shortly.
        </p>
        <p className="text-cream/40 text-sm leading-relaxed mb-10">
          Your print will be produced and shipped within two weeks.
          If you have any questions, reach out at{" "}
          <a href="mailto:contact@juancnava.com" className="text-terracotta hover:underline">
            contact@juancnava.com
          </a>.
        </p>
        <Link
          href="/prints"
          className="text-xs tracking-[0.15em] uppercase text-cream/30 hover:text-terracotta transition-colors duration-200"
        >
          ← Back to prints
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
