'use client';

import { useEffect, useRef } from 'react';
import { sneakPeekSections } from '@/app/data/partners';
import PartnerCategoriesDisplay from '../PartnerSection/PartnerCategoriesDisplay';
import Button from '../Button/Button';
import styles from './PartnerSneakPeek.module.css';
import partnerStyles from '../PartnerSection/PartnerSection.module.css';

export default function PartnerSneakPeek() {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} className={styles.section} id="partner-sneak-peek" aria-label="Partner sneak peek">
      <div className={styles.container}>
        <div
          className={`${styles.header} ${partnerStyles.animateItem}`}
          data-animate="true"
          data-delay="0"
        >
          <span className={styles.eyebrow}>OUR PARTNERS</span>
          <h2 className={styles.title}>Supported by Global Institutions</h2>
        </div>

        <PartnerCategoriesDisplay sections={sneakPeekSections} variant="sneakPeek" />

        <div
          className={`${styles.ctaWrapper} ${partnerStyles.animateItem}`}
          data-animate="true"
          data-delay="300"
        >
          <Button href="#partners" variant="yellow" className={styles.viewAllButton}>
            View All Partners
          </Button>
        </div>
      </div>
    </section>
  );
}
