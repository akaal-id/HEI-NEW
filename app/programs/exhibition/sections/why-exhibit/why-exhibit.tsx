'use client';

import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import styles from './why-exhibit.module.css';

const REASONS = [
  {
    title: 'Connect with international delegations',
    description: 'and government leaders through our official partnership with the Ministry of Foreign Affairs, D-8 Secretariat, KNEKS, KADIN, and Bank Indonesia.',
  },
  {
    title: 'Business Matching & Investment Matchmaking',
    description: 'to facilitate serious trade discussions and high-value transactions.',
  },
  {
    title: 'Thought Leadership & Industry Insights',
    description: 'with D-8 HEI Talk featuring world-renowned experts and innovators.',
  },
  {
    title: 'Future-Proofing Next Generation',
    description: 'with specialized Youth Programs dedicated to nurturing tomorrow\'s halal industry leaders.',
  },
  {
    title: 'Cultural Diplomacy',
    description: 'in the Culture Fest, fostering international relations through heritage and culinary arts.',
  },
];

export default function WhyExhibitSection() {
  const [whyRef, whyVisible] = useIntersectionObserver({ threshold: 0.06 });

  return (
    <section className={styles.whySection}>
      <div className={styles.whyContainer}>
        
        <div className={styles.whyTop}>
          <div className={styles.whyHeader}>
            <span className={styles.sectionEyebrow}>Why Exhibit?</span>
            <h3 className={styles.sectionTitle}>
              The Right Stage for Global Commerce
            </h3>
          </div>
          <p className={styles.whyLead}>
            In a market valued at $5.2 Trillion, standing out requires more than just a booth—it requires the right stage. D-8 Halal Expo Indonesia 2026 provides an unparalleled platform where high-level diplomacy meets global commerce.
          </p>
        </div>

        <div
          ref={whyRef as React.RefObject<HTMLDivElement>}
          className={`${styles.whyGrid} ${whyVisible ? styles.visible : ''}`}
        >
          {REASONS.map((item, i) => (
            <article
              key={i}
              className={styles.whyCell}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className={styles.whyIndex}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className={styles.whyCellText}>
                <h4 className={styles.whyCellTitle}>{item.title}</h4>
                <p className={styles.whyCellDesc}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.whyFooter}>
          <p>
            While exhibitors showcase excellence, buyers gain access to a pre-vetted, high-quality sourcing hub. By bringing together the best from 9 D-8 member countries under one roof, we offer buyers a streamlined, high-trust environment to discover innovative products and secure reliable supply chains—making D-8 Halal Expo Indonesia 2026 the most efficient sourcing event in the region.
          </p>
        </div>

      </div>
    </section>
  );
}
