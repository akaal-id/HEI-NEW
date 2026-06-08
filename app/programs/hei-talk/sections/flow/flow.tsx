'use client';

import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import styles from './flow.module.css';

const STEPS = [
  {
    step: '01',
    title: 'Opening Keynote',
    description:
      'The day begins with a headline address that frames the strategic outlook for the global halal economy.',
  },
  {
    step: '02',
    title: 'Expert Panels',
    description:
      'Cross-sector leaders debate the most pressing themes—from regulation to innovation—in moderated discussions.',
  },
  {
    step: '03',
    title: 'Deep-Dive Talks',
    description:
      'Focused sessions unpack specialised topics with case studies, data, and practical frameworks.',
  },
  {
    step: '04',
    title: 'Audience Dialogue',
    description:
      'Interactive Q&A and live polling turn the stage into a two-way conversation with the room.',
  },
  {
    step: '05',
    title: 'Networking Breaks',
    description:
      'Curated intervals let you connect directly with speakers, delegates, and fellow industry players.',
  },
  {
    step: '06',
    title: 'Closing Insights',
    description:
      'Each session wraps with key takeaways and forward-looking actions you can bring back to your business.',
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
            <span className={styles.eyebrow}>The Experience</span>
            <h3 className={styles.title}>How a Session Unfolds</h3>
            <h3 className={styles.titleAccent}>D-8 Halal Expo Indonesia</h3>
          </div>
          <p className={styles.lead}>
            A carefully paced format that balances big-picture vision with hands-on
            insight—and the time to connect with the people behind it.
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
