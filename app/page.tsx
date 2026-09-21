import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Hero from './components/Hero/Hero';
import BusinessMatchingHome from './components/BusinessMatching/BusinessMatchingHome';
import D8Hei2026Archive from './components/D8Hei2026Archive/D8Hei2026Archive';
import { getHeroSlides } from './lib/heroSlides';

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

export default async function Home() {
  const heroSlides = await getHeroSlides();

  return (
    <main>
      <Hero slides={heroSlides} />
      <BusinessMatchingHome />
      <ArticleSection />
      <D8Hei2026Archive />
    </main>
  );
}
