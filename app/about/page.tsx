import dynamic from 'next/dynamic';

const AboutD8Summit = dynamic(() => import('../components/AboutSection/AboutD8Summit'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const AboutD8HEI = dynamic(() => import('../components/AboutSection/AboutD8HEI'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const AboutOrganizer = dynamic(() => import('../components/AboutSection/AboutOrganizer'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

export default function AboutPage() {
  return (
    <main>
      <AboutD8Summit />
      <AboutD8HEI />
      <AboutOrganizer />
    </main>
  );
}
