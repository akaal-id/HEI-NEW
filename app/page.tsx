import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Hero from './components/Hero/Hero';
import BusinessMatchingHome from './components/BusinessMatching/BusinessMatchingHome';
import BrochureSection from './components/BrochureSection/BrochureSection';
import D8Hei2026Archive from './components/D8Hei2026Archive/D8Hei2026Archive';
import { getHeroSlides } from './lib/heroSlides';

const ArticleSection = dynamic(() => import('./components/ArticleSection/ArticleSection'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

export const metadata: Metadata = {
  title: "HEI 2027 | D-8 Halal Expo Indonesia",
  description: "Join D-8 Halal Expo Indonesia 2027 in Jakarta. Discover halal products, international trade opportunities, business matching, investment, and industry networking.",
  keywords: [
    "Halal Expo Indonesia 2027",
    "HEI 2027 Jakarta",
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
    title: "HEI 2027 | D-8 Halal Expo Indonesia",
    description: "Join D-8 Halal Expo Indonesia 2027 in Jakarta for international halal trade, business matching, investment, and industry collaboration.",
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
      <BrochureSection mode="preview" />
      <ArticleSection />
      <D8Hei2026Archive />
    </main>
  );
}
