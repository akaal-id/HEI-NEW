import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

const Exhibition = dynamic(() => import('../components/ProgramDetailSection/Exhibition'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const BusinessMatching = dynamic(() => import('../components/ProgramDetailSection/BusinessMatching'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const InvestmentMatchMaking = dynamic(() => import('../components/ProgramDetailSection/InvestmentMatchMaking'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const D8HEITalk = dynamic(() => import('../components/ProgramDetailSection/D8HEITalk'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const D8CultureFestival = dynamic(() => import('../components/ProgramDetailSection/D8CultureFestival'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

export const metadata: Metadata = {
  title: "Programs & Events | HEI 2026 - Halal Expo Indonesia",
  description: "Explore comprehensive programs at HEI 2026 including exhibitions, business matching, investment matchmaking, D-8 HEI Talk, and cultural festivals. Join us in Jakarta, April 2026.",
  keywords: [
    "HEI 2026 Programs",
    "Halal Expo Events",
    "Business Matching Indonesia",
    "Investment Matchmaking Jakarta",
    "D-8 HEI Talk",
    "Halal Exhibition Programs",
    "Halal Business Conference",
    "Halal Cultural Fest",
    "Halal Industry Summit"
  ],
  openGraph: {
    title: "Programs & Events | HEI 2026 - Halal Expo Indonesia",
    description: "Explore comprehensive programs at HEI 2026 including exhibitions, business matching, investment matchmaking, and cultural festivals.",
    url: "https://halalexpoindonesia.com/programs",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/programs",
  },
};

export default function ProgramsPage() {
  return (
    <main>
      <Exhibition />
      <BusinessMatching />
      <InvestmentMatchMaking />
      <D8HEITalk />
      <D8CultureFestival />
    </main>
  );
}
