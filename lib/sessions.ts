export interface SessionExpectation {
  label: string;
  description: string;
}

export interface Session {
  slug: string;
  name: string;
  price: string;
  duration: string;
  tagline?: string;
  shortDescription: string;
  fullDescription: string;
  includes: string[];
  expectations: SessionExpectation[];
  imageUrl: string | null;
  aspectRatio: "portrait" | "wide";
}

const sessions: Session[] = [
  {
    slug: "headshots",
    name: "Headshots",
    price: "From $250",
    duration: "1 hour",
    tagline: "Clean, confident, and true to who you are",
    shortDescription:
      "Clean, confident, and true to who you are. Whether for LinkedIn, your business, or your personal brand, we make it feel like you.",
    fullDescription:
      "A headshot should feel like a handshake. Confident, genuine, and immediately you. We keep it relaxed and unhurried, moving through locations and looks until we find the frames that actually feel right. No stiff poses, no generic backdrops. Just you, lit well, looking like yourself.",
    includes: [
      "1 hour session",
      "Up to 2 locations",
      "20 fully edited images",
      "Online gallery delivered within 7 days",
    ],
    expectations: [
      {
        label: "Scheduling",
        description:
          "We'll pick a time that works for your energy. Morning light or golden hour depending on your goals.",
      },
      {
        label: "Locations",
        description:
          "Up to 2 locations within the Phoenix metro. We'll scout together or use spots that already mean something to you.",
      },
      {
        label: "Direction",
        description:
          "Minimal posing. I'll guide you through natural movement so nothing feels stiff or forced.",
      },
      {
        label: "Delivery",
        description:
          "20 fully edited images in a private online gallery within 7 days of your session.",
      },
    ],
    imageUrl: null,
    aspectRatio: "portrait",
  },
  {
    slug: "portraits",
    name: "Portraits & Family",
    price: "From $350",
    duration: "1.5 hours",
    tagline: "Relaxed, unhurried, and real — no forced anything",
    shortDescription:
      "Relaxed, unhurried, and real. No posing, no awkward direction. Just you, your people, and genuine moments.",
    fullDescription:
      "The best family photos don't happen when everyone is standing still and saying cheese. They happen in between. I'll spend time with you, letting things unfold naturally, following the moments that matter. By the end, you'll have images that feel like a memory, not a performance.",
    includes: [
      "1.5 hour session",
      "30 fully edited images",
      "Online gallery delivered within 14 days",
    ],
    expectations: [
      {
        label: "Pace",
        description:
          "No rushing. 1.5 hours gives us room to breathe, wander, and let real moments happen.",
      },
      {
        label: "Direction",
        description:
          "I'll guide loosely. You'll forget I'm there faster than you think.",
      },
      {
        label: "Location",
        description:
          "Anywhere that feels like you. Your backyard, a park, a city street, the desert.",
      },
      {
        label: "Delivery",
        description:
          "30 edited images in a private online gallery within 14 days of your session.",
      },
    ],
    imageUrl: null,
    aspectRatio: "portrait",
  },
  {
    slug: "maternity",
    name: "Maternity",
    price: "From $400",
    duration: "1.5 hours",
    tagline: "Honoring this season with care and intention",
    shortDescription:
      "Honoring this season with care and intention. Indoor or outdoor, editorial or intimate. Your call.",
    fullDescription:
      "This season deserves to be documented with the same care and intention you're putting into everything else. Whether you want something editorial and moody or soft and intimate, we'll build the session around how you want to feel. You don't need to do anything except show up. I'll take care of the rest.",
    includes: [
      "1.5 hour session",
      "Up to 2 outfit changes",
      "30 fully edited images",
      "Online gallery delivered within 14 days",
    ],
    expectations: [
      {
        label: "Comfort first",
        description:
          "We'll move at your pace and plan around what feels right for your body and stage.",
      },
      {
        label: "Style",
        description:
          "Editorial, intimate, or somewhere in between. You set the tone and I'll build around it.",
      },
      {
        label: "Outfits",
        description:
          "Up to 2 outfit changes are included. Bring what makes you feel most yourself.",
      },
      {
        label: "Delivery",
        description:
          "30 edited images in a private online gallery within 14 days of your session.",
      },
    ],
    imageUrl: null,
    aspectRatio: "portrait",
  },
  {
    slug: "graduations",
    name: "Seniors & Graduations",
    price: "From $250",
    duration: "1 hour",
    tagline: "You earned this — let's make something worth keeping",
    shortDescription:
      "You earned this. Let's make something worth framing and worth remembering.",
    fullDescription:
      "You've worked for this, and these photos should feel like it. I'll follow your lead. Your locations, your style, your story. Whether it's the desert at golden hour or the campus you called home for four years, we'll make something that actually reflects who you are right now, in this moment.",
    includes: [
      "1 hour session",
      "1 to 2 locations",
      "25 fully edited images",
      "Online gallery delivered within 14 days",
    ],
    expectations: [
      {
        label: "You lead",
        description:
          "Tell me where you want to go, what you want to wear, how you want to be remembered.",
      },
      {
        label: "Locations",
        description:
          "1 to 2 locations per session. Campus, desert, city, wherever fits you.",
      },
      {
        label: "Print-ready",
        description:
          "Every image delivered at full resolution, ready for printing, framing, or announcement cards.",
      },
      {
        label: "Delivery",
        description:
          "25 edited images in a private online gallery within 14 days of your session.",
      },
    ],
    imageUrl: null,
    aspectRatio: "portrait",
  },
  {
    slug: "weddings",
    name: "Weddings & Elopements",
    price: "From $2,000",
    duration: "Full day",
    tagline: "One day that deserves to last forever",
    shortDescription:
      "Full day coverage or intimate elopements. Documentary approach. Real moments, not performances. No forced poses.",
    fullDescription:
      "I don't stop your wedding for photos. I follow the day as it unfolds. The nervous energy before the ceremony, the quiet moment after the vows, the dancing, the toasts, the small glances between you two that no one else noticed. Full day coverage or intimate elopements, from start to finish. No forced poses. No interruptions. Just your day, documented honestly.",
    includes: [
      "Full day coverage",
      "Second photographer available on request",
      "500+ fully edited images",
      "Private online gallery delivered within 30 days",
    ],
    expectations: [
      {
        label: "Documentary approach",
        description:
          "No stopping the day for photo moments. I follow, observe, and document as things unfold.",
      },
      {
        label: "Coverage",
        description:
          "From getting ready through the last dance. Or an intimate elopement from start to finish.",
      },
      {
        label: "Second photographer",
        description:
          "Available on request for larger weddings. We'll discuss what makes sense for your day.",
      },
      {
        label: "Delivery",
        description:
          "500+ edited images in a private gallery within 30 days. Print release included.",
      },
    ],
    imageUrl: null,
    aspectRatio: "wide",
  },
  {
    slug: "events",
    name: "Events",
    price: "From $500",
    duration: "2 hours minimum",
    tagline: "Professional coverage for moments worth documenting",
    shortDescription:
      "Corporate events, community gatherings, cultural celebrations. Discreet, thorough, professional.",
    fullDescription:
      "Whether it's a product launch, a community gathering, a corporate conference, or a cultural celebration, I cover it with the same documentary approach I bring to everything. Quietly, thoroughly, and with an eye for the moments that tell the real story. You'll receive a complete edited gallery with commercial usage rights, ready to use however you need.",
    includes: [
      "Coverage starting at 2 hours",
      "Edited gallery delivered within 14 days",
      "Commercial usage rights included",
    ],
    expectations: [
      {
        label: "Discreet coverage",
        description:
          "I blend in, document what matters, and stay out of the way of your event.",
      },
      {
        label: "Timeline",
        description:
          "Coverage scales with your event. Starting at 2 hours, up to full day coverage.",
      },
      {
        label: "Usage rights",
        description:
          "Commercial usage rights included. Use the images for marketing, press, or social. No restrictions.",
      },
      {
        label: "Delivery",
        description:
          "Complete edited gallery delivered within 14 days of your event.",
      },
    ],
    imageUrl: null,
    aspectRatio: "wide",
  },
];

export default sessions;
