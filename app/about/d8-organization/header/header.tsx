'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './header.module.css';

export default function Header() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`${styles.heroSection} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.decoration} aria-hidden="true">
        <Image
          src="/D8-assets/circle_D8.svg"
          alt=""
          width={1000}
          height={1000}
          className={styles.decorationImage}
        />
      </div>

      <div className={styles.heroContainer}>
        <span className={styles.eyebrow}>About D-8</span>
        <h1 className={styles.heroTitle}>
          D-8 Organization for{' '}
          <span className={styles.heroTitleAccent}>Economic Cooperation</span>
        </h1>
        <p className={styles.heroSubtitle}>
          A nine-nation economic forum advancing global trade, sustainable development,
          and shared prosperity across Asia, Africa, and Europe.
        </p>
      </div>
    </section>
  );
}
