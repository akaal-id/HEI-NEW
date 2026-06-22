import type { Metadata } from 'next';
import HeroSection from './sections/hero/hero';
import MarqueeStrip from './sections/marquee/marquee';
import AboutSection from './sections/about/about';
import ThemesSection from './sections/themes/themes';
import LineupSection from './sections/lineup/lineup';
import CarouselSection from './sections/carousel/carousel';
import FlowSection from './sections/flow/flow';
import CtaSection from './sections/cta/cta';

export const metadata: Metadata = {
  title: "D-8 HEI Talk | D-8 Halal Expo Indonesia 2026 - Programs",
  description: "Join approximately 15 sessions of insightful discussions, presentations, and panel sessions led by industry experts at D-8 HEI Talk—including D-8 HEI Youth, the Young Entrepreneur Meetup and Panel Discussion.",
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
    "Expert Presentations",
    "D-8 HEI Youth",
    "Young Entrepreneur Meetup",
    "Young Entrepreneur Panel Discussion"
  ],
  openGraph: {
    title: "D-8 HEI Talk | D-8 Halal Expo Indonesia 2026",
    description: "Join approximately 15 sessions of insightful discussions, presentations, and panel sessions—including the D-8 HEI Youth program.",
    url: "https://halalexpoindonesia.com/programs/hei-talk",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/programs/hei-talk",
  },
};

export default function HEITalkPage() {
  return (
    <main>
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <ThemesSection />
      <LineupSection />
      <CarouselSection />
      <FlowSection />
      <CtaSection />
    </main>
  );
}
