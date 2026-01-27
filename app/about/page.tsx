import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

const AboutD8Summit = dynamic(() => import('../components/AboutSection/AboutD8Summit'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const AboutD8HEI = dynamic(() => import('../components/AboutSection/AboutD8HEI'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const AboutOrganizer = dynamic(() => import('../components/AboutSection/AboutOrganizer'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

export const metadata: Metadata = {
  title: "About HEI 2026 | D-8 Halal Expo Indonesia - Our Mission & Vision",
  description: "Learn about the 6th Halal Expo Indonesia 2026, D-8 Summit, our mission to strengthen the halal economy, event organizers, and our commitment to international collaboration in the halal industry.",
  keywords: [
    "About Halal Expo Indonesia",
    "HEI 2026 About",
    "D-8 Summit Information",
    "Halal Expo Organizers",
    "Halal Economy Mission",
    "Halal Industry Vision",
    "D-8 Countries Collaboration",
    "Halal Export Indonesia About",
    "Islamic Economy Summit",
    "Halal Business Conference"
  ],
  openGraph: {
    title: "About HEI 2026 | D-8 Halal Expo Indonesia",
    description: "Learn about the 6th Halal Expo Indonesia 2026, D-8 Summit, and our mission to strengthen the halal economy.",
    url: "https://halalexpoindonesia.com/about",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutD8Summit />
      <AboutD8HEI />
      <AboutOrganizer />
    </main>
  );
}
