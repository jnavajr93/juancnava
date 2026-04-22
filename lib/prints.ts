export interface PrintSize {
  label: string;
  price: number; // in cents
  edition: string;
  remaining: number; // update manually or sync from your inventory
  stripePriceId: string; // set in Stripe dashboard, add to .env.local
}

export interface Print {
  id: string;
  title: string;
  description: string;
  sizes: PrintSize[];
  src: string; // placeholder until real image added
  alt: string;
}

const prints: Print[] = [
  {
    id: "phoenix-dusk",
    title: "Phoenix, Dusk",
    description: "The last light catching the edges of the city before dark.",
    src: "/gallery/phoenix-2024-01.jpg",
    alt: "Phoenix Arizona at dusk — fine art limited edition print by Juan C. Nava Photography",
    sizes: [
      { label: "8×10 in",  price: 18000, edition: "Ed. of 50", remaining: 31, stripePriceId: process.env.STRIPE_PRICE_PHOENIX_DUSK_8X10 ?? "" },
      { label: "11×14 in", price: 28000, edition: "Ed. of 40", remaining: 14, stripePriceId: process.env.STRIPE_PRICE_PHOENIX_DUSK_11X14 ?? "" },
      { label: "16×20 in", price: 38000, edition: "Ed. of 25", remaining: 4,  stripePriceId: process.env.STRIPE_PRICE_PHOENIX_DUSK_16X20 ?? "" },
    ],
  },
  {
    id: "the-wait",
    title: "The Wait",
    description: "Patience, stillness, and the ordinary weight of passing time.",
    src: "/gallery/tempe-2023-01.jpg",
    alt: "The Wait — Tempe Arizona, fine art limited edition print by Juan C. Nava Photography",
    sizes: [
      { label: "8×10 in",  price: 16000, edition: "Ed. of 50", remaining: 22, stripePriceId: process.env.STRIPE_PRICE_THE_WAIT_8X10 ?? "" },
      { label: "11×14 in", price: 22000, edition: "Ed. of 40", remaining: 9,  stripePriceId: process.env.STRIPE_PRICE_THE_WAIT_11X14 ?? "" },
      { label: "16×20 in", price: 32000, edition: "Ed. of 25", remaining: 3,  stripePriceId: process.env.STRIPE_PRICE_THE_WAIT_16X20 ?? "" },
    ],
  },
  {
    id: "unnamed-road-maricopa",
    title: "Unnamed Road, Maricopa",
    description: "A straight line into the desert that goes farther than it looks.",
    src: "/gallery/maricopa-2024-01.jpg",
    alt: "Unnamed Road Maricopa Arizona desert — fine art limited edition print by Juan C. Nava Photography",
    sizes: [
      { label: "11×14 in", price: 32000, edition: "Ed. of 40", remaining: 18, stripePriceId: process.env.STRIPE_PRICE_MARICOPA_11X14 ?? "" },
      { label: "16×20 in", price: 48000, edition: "Ed. of 25", remaining: 7,  stripePriceId: process.env.STRIPE_PRICE_MARICOPA_16X20 ?? "" },
      { label: "20×24 in", price: 58000, edition: "Ed. of 15", remaining: 2,  stripePriceId: process.env.STRIPE_PRICE_MARICOPA_20X24 ?? "" },
    ],
  },
  {
    id: "nogales",
    title: "Nogales",
    description: "Two cities, one name, and everything in between.",
    src: "/gallery/nogales-2023-01.jpg",
    alt: "Nogales Arizona-Mexico border town — fine art limited edition print by Juan C. Nava Photography",
    sizes: [
      { label: "8×10 in",  price: 18000, edition: "Ed. of 50", remaining: 41, stripePriceId: process.env.STRIPE_PRICE_NOGALES_8X10 ?? "" },
      { label: "11×14 in", price: 28000, edition: "Ed. of 40", remaining: 11, stripePriceId: process.env.STRIPE_PRICE_NOGALES_11X14 ?? "" },
      { label: "16×20 in", price: 42000, edition: "Ed. of 25", remaining: 5,  stripePriceId: process.env.STRIPE_PRICE_NOGALES_16X20 ?? "" },
    ],
  },
];

export default prints;
