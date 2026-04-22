export interface Essay {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  category: string;
}

const essays: Essay[] = [
  {
    slug: "the-weight-of-witness",
    title: "The Weight of Witness",
    date: "March 2026",
    excerpt: "On what it means to photograph grief without exploiting it.",
    category: "Documentary",
    body: `There is a particular silence that settles over a room after loss. Not the silence of absence, but the silence of presence — the weighted, pressurized stillness of people who are trying to hold themselves together.

I have stood in those rooms with a camera. I have raised it to my eye and felt the question arrive before I could stop it: *should I?*

That question is the whole thing. Not the technique, not the light, not even the subject. The question is the practice.

Photography of grief is not inherently exploitative. But it can become that the moment the photographer stops asking the question — stops feeling its weight — and starts treating the room as a set. I have seen that happen. I have felt myself edging toward it, the professional detachment sliding in like a slow anesthetic. You stop seeing the person and start seeing the frame.

The photographers I most respect are the ones who stay uncomfortable. Who shoot with permission, even when permission is implicit and unspoken. Who know the difference between bearing witness and extracting.

Bearing witness asks nothing. It offers presence. The camera becomes a kind of attention, a form of saying: *this happened, and it mattered.*

Extracting takes. It turns someone's worst moment into content. It treats grief as texture, as interesting light, as an opportunity for a portfolio image.

The difference is invisible in the final photograph. Two images, side by side, might look identical. But the photographer knows. And eventually, so does the subject.

I don't have a rule for this. I don't think a rule would work. What I have is the question, kept alive, kept uncomfortable. What I have is the commitment to keep asking it, every time I raise the camera, in every room where the silence is that kind.`,
  },
  {
    slug: "light-at-the-edge-of-the-frame",
    title: "Light at the Edge of the Frame",
    date: "January 2026",
    excerpt: "Why the most honest photographs are made in the spaces we overlook.",
    category: "Reflection",
    body: `The center of the frame is the most dishonest place in photography.

I don't mean technically. I mean that we are trained — by magazines, by social media, by every piece of visual culture we've absorbed since childhood — to point toward the thing that is obviously worth seeing. The subject in the middle, properly lit, facing the camera or at least aware of it. Clean, composed, intentional.

But the world doesn't arrange itself that way. The world is mostly edge.

The most alive photographs I have ever taken were accidents of peripheral vision. A hand moving out of the frame. A face half-swallowed by shadow. A figure in the background of a shot I was taking of something else entirely, living their life with complete indifference to my lens.

That indifference is the thing. When someone doesn't know they're being watched, or has forgotten they're being watched, they stop performing. The body goes back to what it actually does. The face relaxes into itself.

The edge is where that lives. The center is where the performance happens.

This is why I've started shooting wider, framing looser, accepting more of what the world offers and controlling less of it. The technically imperfect frame — the one where the subject is off-center, where something unexpected is entering or leaving — is often the one that feels most true.

We talk about "capturing a moment" as if the moment is a fixed thing that just needs to be snapped. But moments are not fixed. They are the edges of other moments, constantly becoming something else. The most honest photograph is the one that knows that — that doesn't try to freeze time so much as acknowledge its movement.

Look at the edges. That's where the real things are.`,
  },
  {
    slug: "against-the-perfect-shot",
    title: "Against the Perfect Shot",
    date: "November 2025",
    excerpt: "The myth of the decisive moment and how chasing it kills your work.",
    category: "Essay",
    body: `Cartier-Bresson's "decisive moment" is probably the most damaging idea in the history of photography.

Not because it's wrong. It's right in a narrow, specific sense that applies to a narrow, specific kind of street photography made by a narrow, specific kind of genius with decades of intuition wired into his fingers.

The problem is what it became: a justification for the relentless, anxious hunting that passes for documentary photography in a lot of portfolios. The idea that every shot is a contest you might win or lose. That the camera is a trap you're setting for the perfect configuration of light and motion and meaning, and your job is to spring it at exactly the right millisecond.

That mode of shooting produces certain kinds of images. Dynamic, decisive, technically sharp. Dramatic. The kind of thing that reads well in a magazine spread.

It also produces photographers who can't sit still.

The photographs that have changed how I see — the ones I return to, the ones that feel like they're still happening — are almost never about speed. They're about duration. Someone spent time somewhere, and the image is what emerged from that time. Not what they caught, but what they allowed.

Presence is the practice. Not the decisive moment, but the extended one. Being somewhere long enough that you stop being a stranger. Long enough that people stop performing for the camera. Long enough that you can feel when something is about to happen, not because your reflexes are fast but because you've been paying attention.

The perfect shot doesn't exist to be caught. It exists to be earned.`,
  },
];

export default essays;
