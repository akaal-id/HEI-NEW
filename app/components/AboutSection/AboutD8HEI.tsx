'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './AboutSection.module.css';

export default function AboutD8HEI() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import('animejs').then((animeModule) => {
              const animate = animeModule.animate as any;
              const stagger = animeModule.stagger;

              const elements = [
                imageRef.current,
                textRef.current,
              ].filter(Boolean);

              if (elements.length > 0) {
                animate(
                  elements,
                  {
                    opacity: [0, 1],
                    translateY: [30, 0],
                    delay: stagger(200),
                    duration: 800,
                    easing: 'easeOutQuad',
                  }
                );
              }
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
    <section ref={sectionRef} className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.container}>
        <div className={`${styles.content} ${styles.contentReverse}`}>
          <div ref={imageRef} className={styles.imageContent}>
            <Image
              src="/D8-assets/KV_D8.png"
              alt="D-8 HEI 2026"
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
          <div ref={textRef} className={styles.textContent}>
            <span className={styles.eyebrow}>ABOUT D8 HEI 2026</span>
            <h2 className={styles.title}>Halal Expo Indonesia 2026</h2>
            <p className={styles.description}>
              Halal Expo Indonesia (HEI) 2026 is a global halal trade, investment, and innovation platform officially aligned as a side event of the D-8 Summit. This prestigious event connects governments, businesses, investors, and youth leaders from around the world to foster international cooperation and development in the halal economy.
            </p>
            <p className={styles.description}>
              HEI 2026 provides a comprehensive platform for showcasing halal products and services, facilitating business matching, investment opportunities, and knowledge sharing. The event serves as a bridge between high-level diplomacy and real-sector business opportunities, creating strategic partnerships that benefit all stakeholders in the halal economy ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
