'use client';

import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import styles from './flow.module.css';

const STEPS = [
  {
    step: '01',
    title: 'Grand Opening',
    description:
      'The festival launches with a ceremonial welcome celebrating the unity and diversity of the D-8 family.',
  },
  {
    step: '02',
    title: 'Cultural Parade',
    description:
      'A colourful procession of traditional dress, music, and symbols representing each member nation.',
  },
  {
    step: '03',
    title: 'Live Cooking Showdown',
    description:
      'Expert chefs compete live, transforming authentic ingredients into signature dishes from three continents.',
  },
  {
    step: '04',
    title: 'Heritage Performances',
    description:
      'Stage shows of music, dance, and storytelling spotlight the living traditions of the D-8 nations.',
  },
  {
    step: '05',
    title: 'Artisan Market',
    description:
      'Wander the bazaar to discover handcrafted textiles, crafts, and culinary treasures from D-8 artisans.',
  },
  {
    step: '06',
    title: 'Closing Celebration',
    description:
      'A shared finale that brings visitors and delegates together in a spirit of friendship and exchange.',
  },
];

export default function FlowSection() {
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [stepsRef, stepsVisible] = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`${styles.header} ${headerVisible ? styles.visible : ''}`}
        >
          <div className={styles.headerTop}>
            <span className={styles.eyebrow}>The Journey</span>
            <h3 className={styles.title}>A Day at the Cultural Fest</h3>
            <h3 className={styles.titleAccent}>D-8 Halal Expo Indonesia</h3>
          </div>
          <p className={styles.lead}>
            From the opening ceremony to the closing celebration, every moment is an
            invitation to taste, watch, and take part.
          </p>
        </div>

        <div
          ref={stepsRef as React.RefObject<HTMLDivElement>}
          className={`${styles.timeline} ${stepsVisible ? styles.visible : ''}`}
        >
          <div className={styles.timelineTrack} aria-hidden="true" />

          {STEPS.map(({ step, title, description }, i) => (
            <article
              key={step}
              className={styles.stepItem}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={styles.stepDot}>
                <span className={styles.stepNumber}>{step}</span>
              </div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>{title}</h4>
                <p className={styles.stepDesc}>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
