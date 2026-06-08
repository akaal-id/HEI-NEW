'use client';

import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import styles from './about.module.css';

const FESTIVAL_HIGHLIGHTS = [
  {
    title: 'Live Cooking Competition',
    description:
      'Expert chefs from across the D-8 go head-to-head, serving authentic flavours from three continents in a vibrant culinary showdown.',
  },
  {
    title: 'Traditional Performances',
    description:
      'Music, dance, and theatrical showcases bring the living heritage of nine member nations to the main stage.',
  },
  {
    title: 'Heritage Pavilions',
    description:
      'Immersive national pavilions invite visitors to explore the customs, crafts, and stories of each D-8 country.',
  },
  {
    title: 'Modest Fashion Showcase',
    description:
      'A curated runway celebrating modest fashion and textile traditions reimagined for the global stage.',
  },
  {
    title: 'Artisan Bazaar',
    description:
      'A marketplace of handcrafted goods, textiles, and cultural treasures sourced directly from D-8 artisans.',
  },
  {
    title: 'Culinary Tourism',
    description:
      'Tastings and demonstrations designed to promote D-8 culinary tourism and authentic cultural exchange.',
  },
];

const EXPERIENCES = [
  {
    audience: 'Visitors',
    tagline:
      'A free, family-friendly journey through the food, art, and traditions of nine nations—all under one roof.',
  },
  {
    audience: 'Delegates',
    tagline:
      'A platform for cultural diplomacy, where heritage becomes a bridge for international relations and partnership.',
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
            <span className={styles.introLabel}>D-8 HEI Cultural Fest</span>
            <h2 className={styles.introHeadline}>
              A Living Showcase
              <br />
              of <em>D-8 Heritage</em>
            </h2>
          </div>

          <div className={styles.introBody}>
            <p>
              The D-8 HEI Cultural Fest celebrates the cultural heritage and diversity of
              the D-8 member states—Bangladesh, Egypt, Indonesia, Iran, Malaysia, Nigeria,
              Pakistan, and Türkiye, with Azerbaijan joining the family.
            </p>
            <p>
              Through performances, exhibitions, and a signature live cooking competition,
              the festival complements the expo&apos;s business objectives with vibrant
              cultural diplomacy and shared celebration.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FESTIVAL HIGHLIGHTS ─── */}
      <section className={styles.whySection}>
        <div className={styles.whyContainer}>
          <div className={styles.whyTop}>
            <div className={styles.whyHeader}>
              <span className={styles.sectionEyebrow}>Festival Highlights</span>
              <h3 className={styles.sectionTitle}>
                Nine Nations, One Celebration
              </h3>
            </div>
            <p className={styles.whyLead}>
              Every corner of the festival is a doorway into the rich traditions that
              unite the D-8 community.
            </p>
          </div>

          <div
            ref={whyRef as React.RefObject<HTMLDivElement>}
            className={`${styles.whyGrid} ${whyVisible ? styles.visible : ''}`}
          >
            {FESTIVAL_HIGHLIGHTS.map((item, i) => (
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

      {/* ─── WHAT YOU'LL EXPERIENCE ─── */}
      <section className={styles.targetSection}>
        <div className={styles.targetContainer}>
          <div className={styles.targetHeading}>
            <span className={styles.sectionEyebrow}>What You&apos;ll Experience</span>
            <h3 className={styles.sectionTitle}>A Festival for Everyone</h3>
          </div>

          <div
            ref={targetRef as React.RefObject<HTMLDivElement>}
            className={`${styles.targetGrid} ${targetVisible ? styles.visible : ''}`}
          >
            {EXPERIENCES.map(({ audience, tagline }, i) => (
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
