import dynamic from 'next/dynamic';
import Hero from './components/Hero/Hero';
import ProgramSection from './components/ProgramSection/ProgramSection';
import FAQSection from './components/FAQSection/FAQSection';
import PartnerSection from './components/PartnerSection/PartnerSection';
import ArticleSection from './components/ArticleSection/ArticleSection';

const OverviewSection = dynamic(() => import('./components/OverviewSection/OverviewSection'), {
  loading: () => <div style={{ height: '100vh', background: 'var(--hei26-linearblue)' }}></div>,
});

export default function Home() {
  return (
    <main>
      <Hero />
      <OverviewSection />
      <ProgramSection />
      <FAQSection />
      <PartnerSection />
      <ArticleSection />
    </main>
  );
}

