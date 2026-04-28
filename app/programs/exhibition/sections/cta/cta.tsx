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
          <span className={styles.eyebrow}>Take The Next Step</span>
          <h2 className={styles.title}>
            Ready to Scale Your Business to the{' '}
            <span className={styles.titleAccent}>Global Halal Stage?</span>
          </h2>
          <p className={styles.lead}>
            Don’t miss your chance to be part of the most influential halal sourcing event of 2026. Whether you are looking to exhibit your products or source from the best, the journey starts here.
          </p>

          <div className={styles.subBlock}>
            <h3 className={styles.subTitle}>Book Your Prime Spot Today</h3>
            <p className={styles.body}>
              Secure your exhibition space and gain direct access to international delegations and $5.2 Trillion market opportunities.
            </p>
          </div>
        </div>

        <div className={`${styles.callout} ${contentVisible ? styles.visible : ''}`}>
          <a
            href="/register"
            className={`${buttonStyles.button} ${buttonStyles.yellow} ${styles.ctaButton}`}
          >
            <span className={buttonStyles.text}>Secure Your Space</span>
            <div className={buttonStyles.iconContainer}>
              <ArrowUpRight className={buttonStyles.icon} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
