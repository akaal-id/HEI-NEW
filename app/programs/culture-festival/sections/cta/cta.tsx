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
          <span className={styles.eyebrow}>Join the Celebration</span>
          <h2 className={styles.title}>
            Taste, Watch & Celebrate the{' '}
            <span className={styles.titleAccent}>Heritage of Nine Nations</span>
          </h2>
          <p className={styles.lead}>
            Experience the flavours, performances, and traditions of the D-8 family at the
            most vibrant cultural showcase of 2026.
          </p>

          <div className={styles.subBlock}>
            <h3 className={styles.subTitle}>Plan Your Visit</h3>
            <p className={styles.body}>
              Register for D-8 Halal Expo Indonesia 2026 and bring your family along to the
              Cultural Fest—open to all visitors and delegates.
            </p>
          </div>
        </div>

        <div className={`${styles.callout} ${contentVisible ? styles.visible : ''}`}>
          <a
            href="/programs/culture-festival/register/visitor"
            className={`${buttonStyles.button} ${buttonStyles.yellow} ${styles.ctaButton}`}
          >
            <span className={buttonStyles.text}>Get Your Pass</span>
            <div className={buttonStyles.iconContainer}>
              <ArrowUpRight className={buttonStyles.icon} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
