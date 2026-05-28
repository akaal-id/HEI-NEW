'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './AboutPage.module.css';

export default function AboutOrganizerPage() {
  const [heroRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [contentRef, isContentVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [textRef, isTextVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [imageRef, isImageVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef as React.RefObject<HTMLElement>} className={`${styles.heroSection} ${isHeroVisible ? styles.fadeIn : ''}`}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Skyconnection (Official Organizer)</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef as React.RefObject<HTMLElement>} className={styles.section}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div ref={textRef as React.RefObject<HTMLDivElement>} className={`${styles.textContent} ${isTextVisible ? styles.fadeInUp : ''}`}>
              <p className={styles.description}>
                <strong>Decade of Delivering Impactful Events.</strong> Skyconnection by PT. Angan
                Kreasi Semesta is an event management and business development company that has
                been operating since 2010. Specializing in MICE (Meeting, Incentive, Conference,
                and Exhibition), Skyconnection has built a strong reputation in delivering
                large-scale national and international events from government-commissioned programs
                and state sporting events to international trade exhibitions and signature halal
                economy platforms.
              </p>
              <p className={styles.description}>
                <strong>Trusted by Leading Institutions Across Sectors.</strong> Over more than a
                decade, Skyconnection has earned the trust of major clients spanning government
                ministries, state-owned enterprises, and multinational corporations including
                Pertamina, BPJS Ketenagakerjaan, Kementerian Dalam Negeri, Kementerian Pemuda dan
                Olahraga, Schlumberger, Indosat, and many more. This breadth of experience across
                diverse sectors reflects the company&apos;s capacity to manage complex, high-stakes
                events with professionalism and precision.
              </p>
              <p className={styles.description}>
                <strong>A Proven Track Record in the Halal Economy.</strong> The halal economy is
                at the heart of Skyconnection&apos;s signature work. Since 2018, Skyconnection has
                been the driving force behind Halal Expo Indonesia (HEI) one of Indonesia&apos;s most
                prominent halal industry platforms, successfully held across multiple editions in
                2018, 2019, 2023, 2024, and 2025. Each edition has grown in scale and impact,
                connecting thousands of businesses, buyers, and stakeholders within Indonesia&apos;s
                rapidly expanding halal ecosystem.
              </p>
              <p className={styles.description}>
                <strong>Organizing D-8 Halal Expo Indonesia 2026.</strong> As the organizer of D-8
                Halal Expo Indonesia 2026, Skyconnection brings its full expertise in end-to-end
                event execution from concept development and stakeholder coordination to on-site
                operations and international business facilitation. Aligned with Indonesia&apos;s
                Presidency of D-8 for 2026–2027, Skyconnection is committed to delivering a
                world-class platform that elevates Indonesia&apos;s role as a global leader in the
                halal economy.
              </p>
            </div>
            <div ref={imageRef as React.RefObject<HTMLDivElement>} className={`${styles.imageContent} ${isImageVisible ? styles.fadeInUp : ''}`}>
              <div className={styles.placeholderImage}>
                <Image
                  src="/partner-logo/organized-by/skyconnect logo.png"
                  alt="Skyconnection Logo"
                  width={400}
                  height={300}
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
