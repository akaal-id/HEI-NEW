import dynamic from 'next/dynamic';
import Hero from './components/Hero/Hero';

const D8Section = dynamic(() => import('./components/D8Section/D8Section'), {
  loading: () => <div style={{ height: '100vh', background: 'var(--background)' }}></div>,
});

export default function Home() {
  return (
    <main>
      <Hero />
      <D8Section />
    </main>
  );
}

