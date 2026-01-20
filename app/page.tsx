import dynamic from 'next/dynamic';
import Hero from './components/Hero/Hero';

const OverviewSection = dynamic(() => import('./components/OverviewSection/OverviewSection'), {
  loading: () => <div style={{ height: '100vh', background: 'var(--hei26-linearblue)' }}></div>,
});

export default function Home() {
  return (
    <main>
      <Hero />
      <OverviewSection />
    </main>
  );
}

