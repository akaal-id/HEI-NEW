'use client';

import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import styles from './intro.module.css';

export default function IntroSection() {
  const [b2bRef, b2bVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [b2cRef, b2cVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className={styles.introSection}>
      
      {/* B2B Segment */}
      <div
        ref={b2bRef as React.RefObject<HTMLDivElement>}
        className={`${styles.introInner} ${b2bVisible ? styles.visible : ''}`}
      >
        <div className={styles.introStatement}>
          <span className={styles.introLabel}>The B2B Engine</span>
          <h2 className={styles.introHeadline}>
            Global Platform for<br />
            <em>Halal Diplomacy</em> & Economic Growth
          </h2>
        </div>

        <div className={styles.introBody}>
          <p>
            D-8 Halal Expo Indonesia 2026 serves as a strategic global platform dedicated to strengthening collaboration and driving the growth of the global halal economy through robust and sustainable international partnerships.
          </p>
          <p>
            As a part of the D-8 Summit, fully supported by the Ministry of Foreign Affairs of the Republic of Indonesia, this B2B exhibition brings together government leaders and industry players to foster <strong>&ldquo;Halal Diplomacy.&rdquo;</strong> This platform further solidifies Indonesia’s position as a global hub for sustainable halal trade.
          </p>
        </div>
      </div>

      <div className={styles.spacer} />

      {/* B2C Segment */}
      <div
        ref={b2cRef as React.RefObject<HTMLDivElement>}
        className={`${styles.introB2C} ${b2cVisible ? styles.visible : ''}`}
      >
        <div className={styles.b2cLeft}>
          <span className={styles.introLabel}>The B2C Showcase</span>
          <h2 className={styles.introHeadline}>
            D-8 Halal<br />
            <em>Cultural Fest</em>
          </h2>
        </div>

        <div className={styles.b2cRight}>
          <p className={styles.b2cLead}>
            To complement the business objectives, the Cultural Fest highlights the rich heritage of the D-8 member nations.
          </p>
          <p>
            A key feature of this segment is the live cooking competition featuring expert chefs from across the D-8. Visitors and delegates are invited to experience authentic flavors from three continents, a vibrant showcase designed to promote D-8 culinary tourism and cultural exchange.
          </p>
        </div>
      </div>

    </section>
  );
}
