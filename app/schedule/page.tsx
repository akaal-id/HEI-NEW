import Image from 'next/image';
import type { Metadata } from 'next';
import ScheduleSection from '../components/ScheduleSection/ScheduleSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Event Schedule | HEI 2026 - Halal Expo Indonesia',
  description:
    'Full event schedule for D-8 Halal Expo Indonesia 2026 — HEI Talk sessions, Cultural Festival performances, and Business Matching across 8–12 July 2026 at Senayan Indoor Tennis Complex, Jakarta.',
  keywords: [
    'HEI 2026 schedule',
    'Halal Expo Indonesia program',
    'D-8 Halal Expo agenda',
    'HEI Talk schedule',
    'Cultural Festival HEI 2026',
    'Business Matching HEI',
  ],
  openGraph: {
    title: 'Event Schedule | HEI 2026 - Halal Expo Indonesia',
    description:
      'Browse the full program for D-8 Halal Expo Indonesia 2026 — talks, cultural performances, and business sessions.',
    url: 'https://halalexpoindonesia.com/schedule',
  },
  alternates: {
    canonical: 'https://halalexpoindonesia.com/schedule',
  },
};

export default function SchedulePage() {
  return (
    <main className={styles.page}>
      <section className={styles.heroSection} aria-labelledby="schedule-hero-title">
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
          <span className={styles.eyebrow}>Event Schedule</span>
          <h1 id="schedule-hero-title" className={styles.heroTitle}>
            Plan Your Days at{' '}
            <span className={styles.heroTitleAccent}>D-8 Halal Expo Indonesia</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Explore the full program across HEI Talk, Cultural Festival, and Business Matching — 8 to 12 July 2026 at Senayan Indoor Tennis Complex, Jakarta.
          </p>
        </div>
      </section>

      <ScheduleSection />
    </main>
  );
}
