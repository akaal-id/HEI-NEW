import dynamic from 'next/dynamic';
import Hero from './components/Hero/Hero';

const OverviewSection = dynamic(() => import('./components/OverviewSection/OverviewSection'), {
  loading: () => <div style={{ height: '100vh', background: 'var(--hei26-linearblue)' }}></div>,
});

const ProgramSection = dynamic(() => import('./components/ProgramSection/ProgramSection'), {
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

