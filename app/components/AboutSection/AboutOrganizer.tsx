'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './AboutSection.module.css';

export default function AboutOrganizer() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import('animejs').then((animeModule) => {
              const animate = animeModule.animate as any;
              const stagger = animeModule.stagger;

              const elements = [
                textRef.current,
                imageRef.current,
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
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div ref={textRef} className={styles.textContent}>
            <span className={styles.eyebrow}>ABOUT ORGANIZER</span>
            <h2 className={styles.title}>skyconnection</h2>
            <p className={styles.description}>
              skyconnection is a leading event management and business development company specializing in creating impactful international events and fostering strategic business partnerships. With a strong focus on the halal economy and international trade, skyconnection has established itself as a trusted partner for governments, businesses, and organizations seeking to expand their global reach.
            </p>
            <p className={styles.description}>
              As the organizer of HEI 2026, skyconnection brings years of expertise in event management, business facilitation, and international cooperation. The company is committed to delivering exceptional experiences that connect stakeholders, create opportunities, and drive sustainable growth in the halal economy sector.
            </p>
          </div>
          <div ref={imageRef} className={styles.imageContent}>
            <Image
              src="/partner-logo/organized-by/skyconnect logo.png"
              alt="skyconnection"
              width={400}
              height={300}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
