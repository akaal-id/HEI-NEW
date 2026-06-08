'use client';

import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import styles from './flow.module.css';

const STEPS = [
  {
    step: '01',
    title: 'Register & Profile',
    description:
      'Sign up on the D-8 HEI portal and build your investor or venture profile, detailing focus areas and goals.',
  },
  {
    step: '02',
    title: 'Verification',
    description:
      'Our team reviews every profile to ensure a high standard of credibility and relevance for all participants.',
  },
  {
    step: '03',
    title: 'Deal Screening',
    description:
      'Ventures are screened and curated against investor mandates to surface the most promising opportunities.',
  },
  {
    step: '04',
    title: 'Smart Matchmaking',
    description:
      'The system pairs investors with founders and generates a pre-scheduled meeting itinerary before the event.',
  },
  {
    step: '05',
    title: 'Pitch Sessions',
    description:
      'Founders present face-to-face in the dedicated matchmaking area, with focused time for due-diligence dialogue.',
  },
  {
    step: '06',
    title: 'Deal Alignment',
    description:
      'Move from conversation to commitment with the support of liaison officers and structured follow-up tools.',
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
            <span className={styles.eyebrow}>How It Works</span>
            <h3 className={styles.title}>The Matchmaking Process</h3>
            <h3 className={styles.titleAccent}>D-8 Halal Expo Indonesia</h3>
          </div>
          <p className={styles.lead}>
            A streamlined, six-step journey designed to turn capital and ambition into
            real, high-value partnerships.
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
