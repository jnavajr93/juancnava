export interface Testimonial {
  quote: string;
  name: string;
  session: string;
}

export const sessionTestimonials: Testimonial[] = [
  {
    quote:
      "Working with Juan was the most relaxed photo experience I've ever had. He made our whole family forget there was even a camera in the room.",
    name: "Maria T.",
    session: "Family Session",
  },
  {
    quote:
      "I've had headshots done three times before. These are the first ones I actually want to use.",
    name: "David R.",
    session: "Headshots",
  },
  {
    quote:
      "He documented our elopement in a way I didn't know was possible. Every photo feels like a memory, not a photo.",
    name: "Sofia & James",
    session: "Elopement",
  },
];

export const printTestimonials: Testimonial[] = [
  {
    quote:
      "Hung it in my office. Three people have asked who took it in the first week. Didn't expect that.",
    name: "Daniel F.",
    session: "Limited Edition Print",
  },
  {
    quote:
      "We put it in the hallway and it changed the whole feel of the space. Hard to explain but it just works.",
    name: "Claire & Marcus O.",
    session: "Limited Edition Print",
  },
  {
    quote:
      "Got it as a gift for my dad. He's not really an art person but he keeps talking about it, so I think that says enough.",
    name: "Renata S.",
    session: "Limited Edition Print",
  },
];

export default sessionTestimonials;
