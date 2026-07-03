import Image from 'next/image';
import type { Metadata } from 'next';
import OurDelegatesSection from '../components/OurDelegates/OurDelegatesSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Our Delegates — D-8 Halal Expo Indonesia 2026',
  description:
    'Browse the full list of exhibitors and international buyers attending D-8 Halal Expo Indonesia 2026. Search by company, filter by booth zone, and view buyer attendance status.',
  keywords: [
    'HEI 2026 delegates',
    'Halal Expo Indonesia exhibitors',
    'D-8 Halal Expo buyers',
    'Halal Expo Indonesia 2026 participants',
  ],
  openGraph: {
    title: 'Our Delegates — D-8 Halal Expo Indonesia 2026',
    description:
      'Meet the exhibitors and international buyers attending D-8 Halal Expo Indonesia 2026.',
    url: 'https://halalexpoindonesia.com/our-delegates',
  },
  alternates: {
    canonical: 'https://halalexpoindonesia.com/our-delegates',
  },
};

export default function OurDelegatesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.heroSection} aria-labelledby="delegates-hero-title">
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
          <span className={styles.eyebrow}>Our Delegates</span>
          <h1 id="delegates-hero-title" className={styles.heroTitle}>
            Exhibitors &amp;{' '}
            <span className={styles.heroTitleAccent}>Buyers</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Explore the companies showcasing at D-8 Halal Expo Indonesia 2026 and the international buyers joining business matching sessions.
          </p>
        </div>
      </section>

      <OurDelegatesSection />
    </main>
  );
}
