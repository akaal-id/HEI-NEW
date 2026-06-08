'use client';

import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import styles from './about.module.css';

const WHY_PARTICIPATE = [
  {
    title: 'Curated Deal Flow',
    description:
      'Access a pre-screened pipeline of investment-ready ventures across 10 halal industry sectors, matched to your mandate.',
  },
  {
    title: 'Sharia-Compliant Focus',
    description:
      'Engage with opportunities structured around ethical, sharia-compliant principles and the values of the halal economy.',
  },
  {
    title: 'Institutional Backing',
    description:
      'Participate in a program supported by the Ministry of Foreign Affairs, KNEKS, and KADIN—ensuring credibility and quality.',
  },
  {
    title: 'Global Investor Network',
    description:
      'Connect directly with funds, family offices, and strategic investors from across the D-8 nations and beyond.',
  },
];

const TARGET_PARTICIPANTS = [
  {
    audience: 'Businesses',
    tagline:
      'Pitch directly to qualified investors and secure the capital and partnerships to scale your halal venture.',
  },
  {
    audience: 'Investors',
    tagline:
      'Discover vetted, high-potential opportunities aligned with your investment criteria and values.',
  },
];

export default function AboutSection() {
  const [introRef, introVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [whyRef, whyVisible] = useIntersectionObserver({ threshold: 0.06 });
  const [targetRef, targetVisible] = useIntersectionObserver({ threshold: 0.15 });

  return (
    <>
      {/* ─── INTRO ─── */}
      <section className={styles.introSection}>
        <div
          ref={introRef as React.RefObject<HTMLDivElement>}
          className={`${styles.introInner} ${introVisible ? styles.visible : ''}`}
        >
          <div className={styles.introStatement}>
            <span className={styles.introLabel}>Investment Matchmaking Program</span>
            <h2 className={styles.introHeadline}>
              Connecting <em>Capital</em>
              <br />
              with Visionary Ventures
            </h2>
          </div>

          <div className={styles.introBody}>
            <p>
              Investment Matchmaking at D-8 Halal Expo Indonesia 2026 connects businesses
              seeking funding with investors looking for high-potential opportunities across
              the global halal economy.
            </p>
            <p>
              Through carefully curated sessions, founders present to qualified investors
              while investors discover ventures aligned with their criteria—creating
              win-win partnerships that drive growth and innovation in the halal sector.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHY PARTICIPATE ─── */}
      <section className={styles.whySection}>
        <div className={styles.whyContainer}>
          <div className={styles.whyTop}>
            <div className={styles.whyHeader}>
              <span className={styles.sectionEyebrow}>Why Participate?</span>
              <h3 className={styles.sectionTitle}>
                Strategic Advantages for Capital & Founders
              </h3>
            </div>
            <p className={styles.whyLead}>
              Move beyond chance introductions with a program engineered to align the right
              capital with the right opportunity.
            </p>
          </div>

          <div
            ref={whyRef as React.RefObject<HTMLDivElement>}
            className={`${styles.whyGrid} ${whyVisible ? styles.visible : ''}`}
          >
            {WHY_PARTICIPATE.map((item, i) => (
              <article
                key={item.title}
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
        </div>
      </section>

      {/* ─── TARGET PARTICIPANTS ─── */}
      <section className={styles.targetSection}>
        <div className={styles.targetContainer}>
          <div className={styles.targetHeading}>
            <span className={styles.sectionEyebrow}>Target Participants</span>
            <h3 className={styles.sectionTitle}>Who Should Join?</h3>
          </div>

          <div
            ref={targetRef as React.RefObject<HTMLDivElement>}
            className={`${styles.targetGrid} ${targetVisible ? styles.visible : ''}`}
          >
            {TARGET_PARTICIPANTS.map(({ audience, tagline }, i) => (
              <article
                key={audience}
                className={styles.targetCard}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={styles.targetCardHeader}>
                  <span className={styles.targetBadge}>For {audience}</span>
                </div>
                <div className={styles.targetCardBody}>
                  <h4 className={styles.targetAudience}>{audience}</h4>
                  <p className={styles.targetTagline}>{tagline}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
