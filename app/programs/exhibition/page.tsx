import type { Metadata } from 'next';
import ProgramExhibition from '../../components/ProgramPages/ProgramExhibition';

export const metadata: Metadata = {
  title: "Exhibition | D-8 Halal Expo Indonesia 2026 - Programs",
  description: "Explore the comprehensive B2B halal exhibition at D-8 Halal Expo Indonesia 2026. Connect with halal industry players from D-8 member nations and the international community.",
  keywords: [
    "Halal Exhibition",
    "B2B Halal Trade",
    "Halal Products Exhibition",
    "Halal Industry Expo",
    "Halal Food Exhibition",
    "Halal Technology",
    "Islamic Finance Expo",
    "Halal Certification",
    "Halal Tourism",
    "Halal Manufacturing"
  ],
  openGraph: {
    title: "Exhibition | D-8 Halal Expo Indonesia 2026",
    description: "Explore the comprehensive B2B halal exhibition at D-8 Halal Expo Indonesia 2026.",
    url: "https://halalexpoindonesia.com/programs/exhibition",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/programs/exhibition",
  },
};

export default function ExhibitionPage() {
  return (
    <main>
      <ProgramExhibition />
    </main>
  );
}
