import Image from 'next/image';
import PartnerSection from '../components/PartnerSection/PartnerSection';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Partners & Sponsors | HEI 2026 - Halal Expo Indonesia",
  description: "Meet our partners and sponsors supporting the 6th Halal Expo Indonesia 2026. Discover leading organizations, companies, and institutions collaborating to strengthen the D-8 halal economy.",
  keywords: [
    "HEI 2026 Partners",
    "Halal Expo Sponsors",
    "Halal Industry Partners",
    "D-8 Summit Sponsors",
    "Halal Business Partners",
    "Halal Export Partners",
    "Islamic Economy Sponsors",
    "Halal Certification Partners",
    "Halal Trade Partners",
    "Halal Event Sponsors"
  ],
  openGraph: {
    title: "Partners & Sponsors | HEI 2026 - Halal Expo Indonesia",
    description: "Meet our partners and sponsors supporting the 6th Halal Expo Indonesia 2026 and D-8 halal economy.",
    url: "https://halalexpoindonesia.com/partners",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/partners",
  },
};

export default function PartnersPage() {
  return (
    <main className={styles.page}>
      <section className={styles.heroSection} aria-labelledby="partners-hero-title">
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
          <span className={styles.eyebrow}>Partners &amp; Sponsors</span>
          <h1 id="partners-hero-title" className={styles.heroTitle}>
            Supported by{' '}
            <span className={styles.heroTitleAccent}>Global Institutions</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Meet the organizations, companies, and institutions collaborating with D-8 Halal Expo Indonesia 2026 to strengthen the halal economy across member states.
          </p>
        </div>
      </section>

      <div className={styles.content}>
        <PartnerSection hideHeader />
      </div>
    </main>
  );
}
