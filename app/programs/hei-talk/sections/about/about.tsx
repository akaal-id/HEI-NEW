'use client';

import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import styles from './about.module.css';

const FEATURED_THEMES = [
  {
    title: 'Global Market Trends',
    description:
      'Explore the trajectory of the $5.2 Trillion halal economy, emerging consumer behaviour, and high-growth export corridors across D-8 nations.',
  },
  {
    title: 'Regulation & Halal Standards',
    description:
      'Understand evolving certification frameworks, mutual recognition, and the path toward harmonized halal standards worldwide.',
  },
  {
    title: 'Innovation & Technology',
    description:
      'From blockchain traceability to AI-driven manufacturing, discover the technologies redefining how halal products are made and verified.',
  },
  {
    title: 'Islamic Finance & Investment',
    description:
      'Unpack sharia-compliant capital, takaful, and trade finance instruments fuelling the next wave of halal enterprise.',
  },
  {
    title: 'Sustainability & ESG',
    description:
      'Examine how ethical, inclusive, and environmentally responsible practices are becoming a competitive advantage.',
  },
  {
    title: 'Youth & Future Talent',
    description:
      'Spotlight the young founders and creative innovators shaping the future leadership of the global halal industry.',
  },
];

const SESSION_FORMATS = [
  {
    audience: 'Keynotes',
    tagline:
      'Visionary addresses from ministers, global executives, and thought leaders setting the agenda for the halal economy.',
  },
  {
    audience: 'Panels',
    tagline:
      'Dynamic, multi-perspective discussions where experts debate the opportunities and challenges shaping the industry.',
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
            <span className={styles.introLabel}>D-8 HEI Talk Program</span>
            <h2 className={styles.introHeadline}>
              Insights That <em>Shape</em>
              <br />
              the Halal Economy
            </h2>
          </div>

          <div className={styles.introBody}>
            <p>
              D-8 HEI Talk brings together approximately 15 sessions of discussions,
              presentations, and panel forums led by industry experts, thought leaders,
              and policymakers from across the D-8 member states and beyond.
            </p>
            <p>
              Spanning market trends, regulation, innovation, and Islamic finance, the
              program is designed as a knowledge engine—turning expert dialogue into
              actionable strategy for everyone building in the global halal industry.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FEATURED THEMES ─── */}
      <section className={styles.whySection}>
        <div className={styles.whyContainer}>
          <div className={styles.whyTop}>
            <div className={styles.whyHeader}>
              <span className={styles.sectionEyebrow}>Featured Themes</span>
              <h3 className={styles.sectionTitle}>
                The Conversations That Matter Most
              </h3>
            </div>
            <p className={styles.whyLead}>
              Every session is curated around the forces reshaping the halal economy—so
              you leave with insight you can act on.
            </p>
          </div>

          <div
            ref={whyRef as React.RefObject<HTMLDivElement>}
            className={`${styles.whyGrid} ${whyVisible ? styles.visible : ''}`}
          >
            {FEATURED_THEMES.map((item, i) => (
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

      {/* ─── SESSION FORMATS ─── */}
      <section className={styles.targetSection}>
        <div className={styles.targetContainer}>
          <div className={styles.targetHeading}>
            <span className={styles.sectionEyebrow}>Session Formats</span>
            <h3 className={styles.sectionTitle}>How You&apos;ll Learn</h3>
          </div>

          <div
            ref={targetRef as React.RefObject<HTMLDivElement>}
            className={`${styles.targetGrid} ${targetVisible ? styles.visible : ''}`}
          >
            {SESSION_FORMATS.map(({ audience, tagline }, i) => (
              <article
                key={audience}
                className={styles.targetCard}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={styles.targetCardHeader}>
                  <span className={styles.targetBadge}>{audience}</span>
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
