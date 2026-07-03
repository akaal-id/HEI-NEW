import Image from 'next/image';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import GuideContactSection from '../components/GuideContactSection/GuideContactSection';
import styles from './page.module.css';

const VenueProfileSection = dynamic(
  () => import('../components/VenueProfileSection/VenueProfileSection'),
  { loading: () => <div style={{ minHeight: '320px' }} /> }
);

const OurDelegatesSection = dynamic(
  () => import('../components/OurDelegates/OurDelegatesSection'),
  { loading: () => <div style={{ minHeight: '280px', background: 'white' }} /> }
);

const OfficialHotelPartnerSection = dynamic(
  () => import('../components/OfficialHotelPartnerSection/OfficialHotelPartnerSection'),
  { loading: () => <div style={{ minHeight: '360px', background: 'var(--hei26-cream)' }} /> }
);

const FAQSection = dynamic(() => import('../components/FAQSection/FAQSection'), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});

export const metadata: Metadata = {
  title: 'Visitor Guide | HEI 2026 - Halal Expo Indonesia',
  description:
    'Your complete visitor guide to D-8 Halal Expo Indonesia 2026 — venue details, official hotel partners, frequently asked questions, and contact information.',
  keywords: [
    'HEI 2026 guide',
    'D-8 Halal Expo visitor guide',
    'Halal Expo Indonesia venue',
    'Halal Expo hotel partners',
    'Halal Expo Indonesia contact',
  ],
  openGraph: {
    title: 'Visitor Guide | HEI 2026 - Halal Expo Indonesia',
    description:
      'Venue profile, hotel partners, FAQs, and contact details for D-8 Halal Expo Indonesia 2026.',
    url: 'https://halalexpoindonesia.com/guide',
  },
  alternates: {
    canonical: 'https://halalexpoindonesia.com/guide',
  },
};

export default function GuidePage() {
  return (
    <main className={styles.page}>
      <section className={styles.heroSection} aria-labelledby="guide-hero-title">
        <div className={styles.decoration} aria-hidden="true">
          <Image
            src="/D8-assets/circle_D8.svg"
            alt=""
            width={1000}
            height={1000}
            className={styles.decorationImage}
            priority
          />
        </div>

        <div className={styles.heroContainer}>
          <span className={styles.eyebrow}>Visitor Guide</span>
          <h1 id="guide-hero-title" className={styles.heroTitle}>
            Everything You Need for{' '}
            <span className={styles.heroTitleAccent}>D-8 Halal Expo Indonesia</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Plan your visit with venue directions, official hotel partners, answers to common questions, and direct contact channels for our team.
          </p>
        </div>
      </section>

      <VenueProfileSection />
      <OurDelegatesSection preview />
      <OfficialHotelPartnerSection />
      <FAQSection
        limit={0}
        showViewAll={false}
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Tap any question to expand the answer."
      />
      <GuideContactSection />
    </main>
  );
}
