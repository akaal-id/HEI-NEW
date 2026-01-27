import type { Metadata } from 'next';
import AboutD8Expo from '../../components/AboutSection/AboutD8Expo';

export const metadata: Metadata = {
  title: "D-8 Halal Expo Indonesia 2026 | About the Event",
  description: "Learn about D-8 Halal Expo Indonesia 2026, an international B2B halal exhibition and strategic global platform that advances the halal economy while supporting the objectives of the D-8 Organization for Economic Cooperation.",
  keywords: [
    "D-8 Halal Expo Indonesia 2026",
    "HEI 2026 Event",
    "Halal Exhibition",
    "B2B Halal Platform",
    "D-8 Summit Side Event",
    "Halal Economy Platform",
    "International Halal Trade",
    "Halal Business Matching",
    "Halal Investment",
    "Global Halal Economy"
  ],
  openGraph: {
    title: "D-8 Halal Expo Indonesia 2026 | About the Event",
    description: "Learn about D-8 Halal Expo Indonesia 2026, an international B2B halal exhibition and strategic global platform.",
    url: "https://halalexpoindonesia.com/about/d8-expo",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/about/d8-expo",
  },
};

export default function D8ExpoPage() {
  return (
    <main>
      <AboutD8Expo />
    </main>
  );
}
