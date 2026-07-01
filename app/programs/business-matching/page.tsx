import type { Metadata } from 'next';
import Header, { headerTitleAccentClass } from '../../about/header/header';
import AboutSection from './sections/about/about';
import FlowSection from './sections/flow/flow';

export const metadata: Metadata = {
  title: "Business Matching | D-8 Halal Expo Indonesia 2026 - Programs",
  description: "Facilitate direct connections between exhibitors and qualified buyers through pre-scheduled meetings at D-8 Halal Expo Indonesia 2026.",
  keywords: [
    "Business Matching",
    "B2B Networking",
    "Halal Business Connections",
    "Trade Meetings",
    "Business Partnerships",
    "Halal Industry Networking",
    "B2B Matchmaking",
    "Commercial Relationships",
    "Halal Trade",
    "Business Opportunities"
  ],
  openGraph: {
    title: "Business Matching | D-8 Halal Expo Indonesia 2026",
    description: "Facilitate direct connections between exhibitors and qualified buyers through pre-scheduled meetings.",
    url: "https://halalexpoindonesia.com/programs/business-matching",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/programs/business-matching",
  },
};

export default function BusinessMatchingPage() {
  return (
    <main>
      <Header
        eyebrow="Programs"
        title={
          <>
            Business Matching:{' '}
            <span className={headerTitleAccentClass}>Precision Partnerships for Global Halal Trade</span>
          </>
        }
        subtitle="A premium, high-impact platform transforming networking into tangible commercial success through curated, face-to-face interactions between international exhibitors and qualified buyers."
      />
      <AboutSection />
      <FlowSection />
      {/* <Cta /> */}
    </main>
  );
}
