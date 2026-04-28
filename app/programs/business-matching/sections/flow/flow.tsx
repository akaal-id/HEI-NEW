'use client';

import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import styles from './flow.module.css';

const STEPS = [
  {
    step: '01',
    title: 'Digital Profiling',
    description:
      'Register on the D-8 HEI website and fill out your business profile to specify your products, industry category, and partnership goals.',
  },
  {
    step: '02',
    title: 'Strategic Verification',
    description:
      'Our team reviews and verifies all profiles to ensure high-quality leads and professional relevance for every participant.',
  },
  {
    step: '03',
    title: 'Meeting Requests',
    description:
      'Browse the digital directory to discover potential partners and send meeting requests to those who match your business needs.',
  },
  {
    step: '04',
    title: 'Automated Scheduling',
    description:
      'Once a request is accepted, the system generates a pre-scheduled meeting itinerary, ensuring you arrive at the expo with a confirmed agenda.',
  },
  {
    step: '05',
    title: 'On-Site Execution',
    description:
      'Head to the exclusive Business Matching Area for your face-to-face discussions and negotiations.',
  },
  {
    step: '06',
    title: 'Deal Alignment',
    description:
      'Transition your discussions into formalized agreements with the support of our dedicated liaison officers and follow-up tools.',
  },
];

export default function FlowSection() {
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [stepsRef, stepsVisible] = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* ─── Header: left-aligned ─── */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`${styles.header} ${headerVisible ? styles.visible : ''}`}
        >
          <div className={styles.headerTop}>
            <span className={styles.eyebrow}>How It Works</span>
            <h3 className={styles.title}>
              The Curated Business Matching
            </h3>
            <h3 className={styles.titleAccent}>
              D-8 Halal Expo Indonesia
            </h3>
          </div>
          <p className={styles.lead}>
            A streamlined, six-step process designed to ensure every meeting is
            meaningful and every connection drives real business outcomes.
          </p>
        </div>

        {/* ─── Steps — horizontal zigzag timeline ─── */}
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
