import type { Metadata } from 'next';
import Header, { headerTitleAccentClass } from '../../about/header/header';
import AboutSection from './sections/about/about';
import FlowSection from './sections/flow/flow';
import CtaSection from './sections/cta/cta';

export const metadata: Metadata = {
  title: "D-8 HEI Talk | D-8 Halal Expo Indonesia 2026 - Programs",
  description: "Join approximately 15 sessions of insightful discussions, presentations, and panel sessions led by industry experts at D-8 HEI Talk.",
  keywords: [
    "D-8 HEI Talk",
    "Halal Industry Conference",
    "Knowledge Sharing",
    "Panel Discussions",
    "Industry Experts",
    "Halal Economy Insights",
    "Business Conference",
    "Thought Leadership",
    "Halal Industry Trends",
    "Expert Presentations"
  ],
  openGraph: {
    title: "D-8 HEI Talk | D-8 Halal Expo Indonesia 2026",
    description: "Join approximately 15 sessions of insightful discussions, presentations, and panel sessions.",
    url: "https://halalexpoindonesia.com/programs/hei-talk",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/programs/hei-talk",
  },
};

export default function HEITalkPage() {
  return (
    <main>
      <Header
        eyebrow="Programs"
        title={
          <>
            D-8 HEI Talk:{' '}
            <span className={headerTitleAccentClass}>Where Halal Industry Leaders Convene</span>
          </>
        }
        subtitle="Approximately 15 expert-led sessions of discussions, presentations, and panel forums—turning the dialogue of policymakers, innovators, and industry leaders into actionable insight for the global halal economy."
      />
      <AboutSection />
      <FlowSection />
      <CtaSection />
    </main>
  );
}
