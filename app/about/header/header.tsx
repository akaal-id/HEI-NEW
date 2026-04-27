'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './header.module.css';

export const headerTitleAccentClass = styles.heroTitleAccent;

type HeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
};

export default function Header({ eyebrow, title, subtitle }: HeaderProps) {
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
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
      </div>
    </section>
  );
}
