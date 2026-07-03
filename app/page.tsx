import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Hero from './components/Hero/Hero';
import HomePromoPopup from './components/HomePromoPopup/HomePromoPopup';

const PartnerSneakPeek = dynamic(() => import('./components/PartnerSneakPeek/PartnerSneakPeek'), {
  loading: () => <div style={{ minHeight: '400px', background: 'white' }}></div>,
});

const OverviewSection = dynamic(() => import('./components/OverviewSection/OverviewSection'), {
  loading: () => <div style={{ height: '100vh', background: 'var(--hei26-linearblue)' }}></div>,
});

const ProgramSection = dynamic(() => import('./components/ProgramSection/ProgramSection'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const OurDelegatesSection = dynamic(
  () => import('./components/OurDelegates/OurDelegatesSection'),
  { loading: () => <div style={{ minHeight: '280px', background: 'white' }}></div> }
);

const VenueProfileSection = dynamic(() => import('./components/VenueProfileSection/VenueProfileSection'), {
  loading: () => <div style={{ minHeight: '320px' }}></div>,
});

const OfficialHotelPartnerSection = dynamic(
  () => import('./components/OfficialHotelPartnerSection/OfficialHotelPartnerSection'),
  { loading: () => <div style={{ minHeight: '360px', background: 'var(--hei26-cream)' }}></div> }
);

const BrochureSection = dynamic(() => import('./components/BrochureSection/BrochureSection'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const FAQSection = dynamic(() => import('./components/FAQSection/FAQSection'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const PartnerSection = dynamic(() => import('./components/PartnerSection/PartnerSection'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const ArticleSection = dynamic(() => import('./components/ArticleSection/ArticleSection'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

export const metadata: Metadata = {
  title: "HEI 2026 - The 6th Halal Expo Indonesia | Home",
  description: "Join the 6th Halal Expo Indonesia 2026 in Jakarta. Strengthening D-8 Halal Economy Through International Collaboration. Discover halal products, services, business opportunities, and networking events. April 2026.",
  keywords: [
    "Halal Expo Indonesia 2026",
    "HEI 2026 Jakarta",
    "D-8 Halal Economy Summit",
    "Halal Exhibition Indonesia",
    "Halal Products Trade Fair",
    "Halal Business Conference",
    "Islamic Economy Indonesia",
    "Halal Certification Event",
    "Halal Export Indonesia",
    "Halal Industry Jakarta"
  ],
  openGraph: {
    title: "HEI 2026 - The 6th Halal Expo Indonesia | Home",
    description: "Join the 6th Halal Expo Indonesia 2026 in Jakarta. Strengthening D-8 Halal Economy Through International Collaboration.",
    url: "https://halalexpoindonesia.com",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com",
  },
};

export default function Home() {
  return (
    <main>
      <HomePromoPopup />
      <Hero/>
      <OurDelegatesSection preview />
      <PartnerSneakPeek />
      <OverviewSection />
      <ProgramSection />
      <VenueProfileSection />
      <OfficialHotelPartnerSection />
      <BrochureSection />
      <FAQSection />
      <PartnerSection />
      <ArticleSection />
    </main>
  );
}
