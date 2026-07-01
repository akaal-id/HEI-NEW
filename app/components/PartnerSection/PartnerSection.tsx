'use client';

import { useEffect, useRef } from 'react';
import { homeDisplaySections, partnersPageDisplaySections } from '@/app/data/partners';
import Button from '../Button/Button';
import PartnerCategoriesDisplay from './PartnerCategoriesDisplay';
import styles from './PartnerSection.module.css';

type PartnerSectionProps = {
  hideHeader?: boolean;
  variant?: 'home' | 'full';
};

export default function PartnerSection({
  hideHeader = false,
  variant = 'home',
}: PartnerSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sections = variant === 'full' ? partnersPageDisplaySections : homeDisplaySections;

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let isMounted = true;

    const setupAnimations = async () => {
      const animeModule = await import('animejs');
      if (!isMounted || !sectionRef.current) return;

      const animate = animeModule.animate as (
        target: Element | NodeListOf<Element>,
        params: Record<string, unknown>
      ) => void;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const target = entry.target as HTMLElement;
            const delay = Number(target.dataset.delay ?? 0);

            animate(target, {
              opacity: [0, 1],
              translateY: [24, 0],
              delay: Number.isFinite(delay) ? delay : 0,
              duration: 1200,
              easing: 'easeOutQuad',
            });

            observer?.unobserve(target);
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -10% 0px',
        }
      );

      const animatableItems = sectionRef.current.querySelectorAll('[data-animate="true"]');
      animatableItems.forEach((item) => observer?.observe(item));
    };

    setupAnimations();

    return () => {
      isMounted = false;
      observer?.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${hideHeader ? styles.sectionNoHeader : ''}`}
      id="partners"
    >
      <div className={styles.container}>
        {!hideHeader && (
          <div className={`${styles.header} ${styles.animateItem}`} data-animate="true" data-delay="0">
            <span className={styles.eyebrow}>OUR PARTNERS</span>
            <h2 className={styles.title}>Supported by Global Institutions</h2>
            <p className={styles.description}>
              We are proud to collaborate with a diverse range of partners who share our vision and commitment to fostering international cooperation and development.
            </p>
          </div>
        )}

        <PartnerCategoriesDisplay sections={sections} />

        <div className={`${styles.ctaSection} ${styles.animateItem}`} data-animate="true" data-delay="0">
          <h3 className={styles.ctaTitle}>
            We invite you to explore a strategic partnership with D-8 Halal Expo Indonesia 2026!
          </h3>
          <p className={styles.ctaDescription}>
            This event offers an opportunity to enhance brand visibility, engage with key halal industry stakeholders, and support international business collaboration across D-8 Member States.
          </p>
          <Button
            href="https://wa.me/62895428247935"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sponsorButton}
          >
            Be Our Partner
          </Button>
        </div>
      </div>
    </section>
  );
}
