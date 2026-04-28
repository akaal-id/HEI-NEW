import type { Metadata } from 'next';
import Header, { headerTitleAccentClass } from '../../about/header/header';
import IntroSection from './sections/intro/intro';
import CategorySection from './sections/category/category';
import WhyExhibitSection from './sections/why-exhibit/why-exhibit';
import BrochureSection from './sections/brochure/brochure';
import CtaSection from './sections/cta/cta';

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
      <Header
        eyebrow="Exhibition"
        title={
          <>
            D-8 Halal Expo Indonesia 2026:{' '}
            <span className={headerTitleAccentClass}>Global Platform for Halal Diplomacy</span>
          </>
        }
        subtitle="A strategic global platform dedicated to strengthening collaboration and driving the growth of the global halal economy through robust and sustainable international partnerships."
      />
      <IntroSection />
      <CategorySection />
      <WhyExhibitSection />
      <BrochureSection />
      <CtaSection />
    </main>
  );
}
