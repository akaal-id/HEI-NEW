import type { Metadata } from 'next';
import ProgramCultureFestival from '../../components/ProgramPages/ProgramCultureFestival';

export const metadata: Metadata = {
  title: "D-8 HEI Culture Festival | D-8 Halal Expo Indonesia 2026 - Programs",
  description: "Celebrate the cultural heritage and diversity of D-8 Member States at the D-8 HEI Culture Festival during HEI 2026.",
  keywords: [
    "D-8 HEI Culture Festival",
    "Cultural Heritage",
    "D-8 Member States Culture",
    "Cultural Diversity",
    "Cultural Performances",
    "Cultural Exchange",
    "International Culture",
    "Halal Culture",
    "Cultural Events",
    "Multicultural Festival"
  ],
  openGraph: {
    title: "D-8 HEI Culture Festival | D-8 Halal Expo Indonesia 2026",
    description: "Celebrate the cultural heritage and diversity of D-8 Member States.",
    url: "https://halalexpoindonesia.com/programs/culture-festival",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/programs/culture-festival",
  },
};

export default function CultureFestivalPage() {
  return (
    <main>
      <ProgramCultureFestival />
    </main>
  );
}
