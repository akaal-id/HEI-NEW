import type { Metadata } from 'next';
import Header, { headerTitleAccentClass } from '../../about/header/header';
import AboutSection from './sections/about/about';
import FlowSection from './sections/flow/flow';
import CtaSection from './sections/cta/cta';

export const metadata: Metadata = {
  title: "D-8 HEI Cultural Fest | D-8 Halal Expo Indonesia 2026 - Programs",
  description: "Celebrate the cultural heritage and diversity of D-8 Member States at the D-8 HEI Cultural Fest during HEI 2026.",
  keywords: [
    "D-8 HEI Cultural Fest",
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
    title: "D-8 HEI Cultural Fest | D-8 Halal Expo Indonesia 2026",
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
      <Header
        eyebrow="Programs"
        title={
          <>
            D-8 HEI Cultural Fest:{' '}
            <span className={headerTitleAccentClass}>Celebrating the Heritage of Nine Nations</span>
          </>
        }
        subtitle="A vibrant celebration of the cultural heritage and diversity of the D-8 member states—where authentic cuisine, traditional performances, and shared traditions become a bridge for cultural diplomacy."
      />
      <AboutSection />
      <FlowSection />
      <CtaSection />
    </main>
  );
}
