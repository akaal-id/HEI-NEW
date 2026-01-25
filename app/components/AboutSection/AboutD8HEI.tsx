'use client';

import Image from 'next/image';
import styles from './AboutSection.module.css';

export default function AboutD8HEI() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.container}>
        <div className={`${styles.content} ${styles.contentReverse}`}>
          <div className={styles.imageContent}>
            <Image
              src="/D8-assets/KV_D8.png"
              alt="D-8 HEI 2026"
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
          <div className={styles.textContent}>
            <span className={styles.eyebrow}>ABOUT D8 HEI 2026</span>
            <h2 className={styles.title}>Halal Expo Indonesia 2026</h2>
            <p className={styles.description}>
              Halal Expo Indonesia (HEI) 2026 is a global halal trade, investment, and innovation platform officially aligned as a side event of the D-8 Summit. This prestigious event connects governments, businesses, investors, and youth leaders from around the world to foster international cooperation and development in the halal economy.
            </p>
            <p className={styles.description}>
              HEI 2026 provides a comprehensive platform for showcasing halal products and services, facilitating business matching, investment opportunities, and knowledge sharing. The event serves as a bridge between high-level diplomacy and real-sector business opportunities, creating strategic partnerships that benefit all stakeholders in the halal economy ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
