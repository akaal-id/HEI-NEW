import type { Metadata } from 'next';
import Header, { headerTitleAccentClass } from '../header/header';
import HEI from './hei/hei';
import D8HEI from './d8hei/d8hei';
import Cta from '../cta/cta';

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
      <Header
        eyebrow="About HEI"
        title={
          <>
            Halal Expo Indonesia:{' '}
            <span className={headerTitleAccentClass}>The Global B2B Halal Stage</span>
          </>
        }
        subtitle="A leading B2B halal ecosystem platform and strategic global stage for the Islamic economy — bridging local industrial potential with the worldwide halal trade and lifestyle marketplace."
      />
      <HEI />
      <D8HEI />
      <Cta />
    </main>
  );
}
