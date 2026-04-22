export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  location?: string;
  year?: string;
  printId?: string; // links to a print in lib/prints.ts
}

const gallery: GalleryImage[] = [
  {
    src: "/gallery/phoenix-2024-01.jpg",
    alt: "Phoenix Arizona street documentary photography — last light over the city, 2024",
    caption: "Phoenix, 2024",
    location: "Phoenix",
    year: "2024",
    printId: "phoenix-dusk",
  },
  {
    src: "/gallery/nogales-2023-01.jpg",
    alt: "Portrait documentary photography at the Nogales Arizona-Mexico border, 2023",
    caption: "Nogales, 2023",
    location: "Nogales",
    year: "2023",
    printId: "nogales",
  },
  {
    src: "/gallery/maricopa-2024-01.jpg",
    alt: "Unnamed desert road stretching into the horizon, Maricopa Arizona documentary photography, 2024",
    caption: "Maricopa, 2024",
    location: "Maricopa",
    year: "2024",
    printId: "unnamed-road-maricopa",
  },
  {
    src: "/gallery/tempe-2023-01.jpg",
    alt: "Evening light documentary photography, Tempe Arizona — stillness and patience, 2023",
    caption: "Tempe, 2023",
    location: "Tempe",
    year: "2023",
    printId: "the-wait",
  },
  {
    src: "/gallery/phoenix-2025-01.jpg",
    alt: "Documentary photography Phoenix Arizona — desert Southwest street photography, 2025",
    caption: "Phoenix, 2025",
    location: "Phoenix",
    year: "2025",
  },
  {
    src: "/gallery/mesa-2024-01.jpg",
    alt: "Documentary portrait photography Mesa Arizona, 2024",
    caption: "Mesa, 2024",
    location: "Mesa",
    year: "2024",
  },
  {
    src: "/gallery/phoenix-2024-02.jpg",
    alt: "Portrait documentary photography Phoenix Arizona, 2024",
    caption: "Phoenix, 2024",
    location: "Phoenix",
    year: "2024",
  },
  {
    src: "/gallery/nogales-2023-02.jpg",
    alt: "Nogales border town Arizona-Mexico documentary street photography, 2023",
    caption: "Nogales, 2023",
    location: "Nogales",
    year: "2023",
  },
  {
    src: "/gallery/scottsdale-2024-01.jpg",
    alt: "Documentary photography Scottsdale Arizona desert Southwest, 2024",
    caption: "Scottsdale, 2024",
    location: "Scottsdale",
    year: "2024",
  },
  {
    src: "/gallery/tucson-2023-01.jpg",
    alt: "Desert light documentary photography Tucson Arizona Sonoran Desert, 2023",
    caption: "Tucson, 2023",
    location: "Tucson",
    year: "2023",
  },
  {
    src: "/gallery/chandler-2024-01.jpg",
    alt: "Documentary photography Chandler Arizona, 2024",
    caption: "Chandler, 2024",
    location: "Chandler",
    year: "2024",
  },
  {
    src: "/gallery/phoenix-2025-02.jpg",
    alt: "Phoenix Arizona dusk documentary photography — desert Southwest light, 2025",
    caption: "Phoenix, 2025",
    location: "Phoenix",
    year: "2025",
  },
];

export default gallery;
