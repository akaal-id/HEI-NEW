import type { Metadata } from 'next';
import Header, { headerTitleAccentClass } from '../../about/header/header';
import AboutSection from './sections/about/about';
import FlowSection from './sections/flow/flow';
import CtaSection from './sections/cta/cta';

export const metadata: Metadata = {
  title: "Investment Matchmaking | D-8 Halal Expo Indonesia 2026 - Programs",
  description: "Connect businesses seeking funding with investors looking for halal economy opportunities at D-8 Halal Expo Indonesia 2026.",
  keywords: [
    "Investment Matchmaking",
    "Halal Investment",
    "Business Funding",
    "Investment Opportunities",
    "Halal Economy Investment",
    "Sharia-Compliant Investment",
    "Investor Relations",
    "Startup Funding",
    "Halal Sector Investment",
    "Investment Partnerships"
  ],
  openGraph: {
    title: "Investment Matchmaking | D-8 Halal Expo Indonesia 2026",
    description: "Connect businesses seeking funding with investors looking for halal economy opportunities.",
    url: "https://halalexpoindonesia.com/programs/investment",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/programs/investment",
  },
};

export default function InvestmentPage() {
  return (
    <main>
      <Header
        eyebrow="Programs"
        title={
          <>
            Investment Matchmaking:{' '}
            <span className={headerTitleAccentClass}>Where Capital Meets Halal Opportunity</span>
          </>
        }
        subtitle="A curated platform connecting businesses seeking funding with investors looking for high-potential, sharia-compliant opportunities across the global halal economy."
      />
      <AboutSection />
      <FlowSection />
      <CtaSection />
    </main>
  );
}
