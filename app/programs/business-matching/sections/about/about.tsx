'use client';

import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import styles from './about.module.css';

const WHY_PARTICIPATE = [
  {
    title: 'Precision Matchmaking',
    description:
      'Move beyond chance encounters with a system that aligns your business profile with the most relevant partners across 10 diverse halal industry sectors.',
  },
  {
    title: 'Pre-Scheduled Efficiency',
    description:
      'Maximize your time at the expo through a digital portal that allows you to review buyer profiles and confirm meetings before the event even begins.',
  },
  {
    title: 'Diplomatic & Institutional Support',
    description:
      'Benefit from a program backed by the Ministry of Foreign Affairs, KNEKS, and KADIN, ensuring a high standard of participants and international delegates.',
  },
  {
    title: 'Result-Oriented Discussions',
    description:
      'Engage in deep, focused negotiations in an environment designed to foster long-term commercial relationships and cross-border investment.',
  },
];

const TARGET_PARTICIPANTS = [
  {
    audience: 'Exhibitors',
    tagline:
      'A chance to showcase innovation to a global audience and secure export contracts.',
  },
  {
    audience: 'Buyers',
    tagline:
      'An efficient gateway to discover new suppliers, premium halal products, and cutting-edge digital solutions.',
  },
];

export default function AboutSection() {
  const [introRef, introVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [whyRef, whyVisible] = useIntersectionObserver({ threshold: 0.06 });
  const [targetRef, targetVisible] = useIntersectionObserver({ threshold: 0.15 });

  return (
    <>
      {/* ─── INTRO — large statement + body copy ─── */}
      <section className={styles.introSection}>
        <div
          ref={introRef as React.RefObject<HTMLDivElement>}
          className={`${styles.introInner} ${introVisible ? styles.visible : ''}`}
        >
          <div className={styles.introStatement}>
            <span className={styles.introLabel}>Business Matching Program</span>
            <h2 className={styles.introHeadline}>
              Where <em>Strategic</em> Connections{' '}
              <br />
              Become Deals
            </h2>
          </div>

          <div className={styles.introBody}>
            <p>
              The D-8 Halal Expo Indonesia 2026 Business Matching program is a
              premium, high-impact platform designed to transform networking into
              tangible commercial success.
            </p>
            <p>
              This initiative serves as a strategic bridge, facilitating exclusive,
              face-to-face interactions between international level exhibitors and a
              curated pool of international qualified buyers.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHY PARTICIPATE — bordered cell grid ─── */}
      <section className={styles.whySection}>
        <div className={styles.whyContainer}>
          <div className={styles.whyTop}>
            <div className={styles.whyHeader}>
              <span className={styles.sectionEyebrow}>Why Participate?</span>
              <h3 className={styles.sectionTitle}>
                Strategic Advantages for Your Enterprise
              </h3>
            </div>
            <p className={styles.whyLead}>
              Maximize your ROI by connecting directly with high-profile
              stakeholders across D-8 nations and beyond.
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

      {/* ─── TARGET PARTICIPANTS — featured card grid ─── */}
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
                  <span className={styles.targetBadge}>
                    For {audience}
                  </span>
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
