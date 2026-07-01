'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { runAnimeReveal } from '../../lib/animeReveal';
import styles from './AboutSection.module.css';

export default function AboutD8Summit() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import('animejs').then((animeModule) => {
              runAnimeReveal(animeModule, [textRef.current, imageRef.current], {
                opacity: [0, 1],
                translateY: [30, 0],
                delay: animeModule.stagger(200),
                duration: 800,
                easing: 'easeOutQuad',
              });
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div ref={textRef} className={styles.textContent}>
            <span className={styles.eyebrow}>ABOUT D8 SUMMIT</span>
            <h2 className={styles.title}>D-8 Organization for Economic Cooperation</h2>
            <p className={styles.description}>
              The D-8 Organization for Economic Cooperation, also known as Developing-8, is an organization for development cooperation among the following countries: Bangladesh, Egypt, Indonesia, Iran, Malaysia, Nigeria, Pakistan, and Turkey. The objectives of D-8 are to improve member states&apos; position in the global economy, diversify and create new opportunities in trade relations, enhance participation in decision-making at the international level, and provide better standards of living.
            </p>
            <p className={styles.description}>
              The D-8 Summit serves as a platform for high-level dialogue and cooperation among member states, focusing on economic development, trade facilitation, and strategic partnerships that benefit all member countries and contribute to global economic stability.
            </p>
          </div>
          <div ref={imageRef} className={styles.imageContent}>
            <Image
              src="/D8-assets/D8-summit.svg"
              alt="D-8 Summit"
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
