'use client';

import Image from 'next/image';
import styles from './ProgramDetailSection.module.css';

export default function BusinessMatching() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.container}>
        <div className={`${styles.content} ${styles.contentReverse}`}>
          <div className={styles.imageContent}>
            <Image
              src="/images/overview.jpg"
              alt="Business Matching"
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
          <div className={styles.textContent}>
            <span className={styles.eyebrow}>BUSINESS MATCHING</span>
            <h2 className={styles.title}>Strategic B2B Connections</h2>
            <p className={styles.description}>
              The Business Matching program at HEI 2026 facilitates direct connections between exhibitors and qualified buyers through pre-scheduled meetings. This program enables businesses to engage in meaningful discussions, explore partnership opportunities, and establish long-term commercial relationships.
            </p>
            <p className={styles.description}>
              With approximately 100 business matching sessions expected, participants can maximize their networking opportunities and accelerate their business growth in the halal market. Our platform ensures that each meeting is strategically aligned with participants&apos; business objectives and market interests.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
