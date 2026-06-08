'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import { ArrowUpRight } from 'lucide-react';
import buttonStyles from '../../../../components/Button/Button.module.css';
import styles from './cta.module.css';

export default function CtaSection() {
  const [contentRef, contentVisible] = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section className={styles.section}>
      <div className={styles.decoration} aria-hidden="true">
        <Image
          src="/D8-assets/circle_D8.svg"
          alt=""
          width={1200}
          height={1200}
          className={styles.decorationImage}
        />
      </div>

      <div className={styles.container}>
        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          className={`${styles.content} ${contentVisible ? styles.visible : ''}`}
        >
          <span className={styles.eyebrow}>Reserve Your Seat</span>
          <h2 className={styles.title}>
            Learn From the Voices{' '}
            <span className={styles.titleAccent}>Shaping the Halal Future</span>
          </h2>
          <p className={styles.lead}>
            Join 15 expert-led sessions and gain direct access to the insights, strategies,
            and people driving the global halal economy forward.
          </p>

          <div className={styles.subBlock}>
            <h3 className={styles.subTitle}>Secure Your Pass Today</h3>
            <p className={styles.body}>
              Seats for D-8 HEI Talk are limited. Register now to lock in your place at the
              most influential halal industry forum of 2026.
            </p>
          </div>
        </div>

        <div className={`${styles.callout} ${contentVisible ? styles.visible : ''}`}>
          <a
            href="/register"
            className={`${buttonStyles.button} ${buttonStyles.yellow} ${styles.ctaButton}`}
          >
            <span className={buttonStyles.text}>Register Now</span>
            <div className={buttonStyles.iconContainer}>
              <ArrowUpRight className={buttonStyles.icon} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
