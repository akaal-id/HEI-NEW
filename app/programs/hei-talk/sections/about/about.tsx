'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import styles from './about.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.label}`,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      );

      gsap.fromTo(
        `.${styles.headlineLine} > span`,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 72%' },
        },
      );

      gsap.fromTo(
        `.${styles.body} p`,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.body}`, start: 'top 80%' },
        },
      );

      gsap.fromTo(
        `.${styles.pullQuote}`,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.pullQuote}`, start: 'top 85%' },
        },
      );

      // Gentle parallax drift on the two editorial images
      gsap.utils.toArray<HTMLElement>(`.${styles.imageCard}`).forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: i === 0 ? 60 : 110, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: `.${styles.imageRow}`, start: 'top 82%' },
          },
        );

        const img = card.querySelector(`.${styles.image}`);
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <span className={styles.label}>About the Forum</span>
          <h2 className={styles.headline}>
            <span className={styles.headlineLine}>
              <span>Insights That</span>
            </span>
            <span className={styles.headlineLine}>
              <span>
                <em>Shape</em> the Halal Economy
              </span>
            </span>
          </h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.body}>
            <p>
              D-8 HEI Talk brings together approximately 15 sessions of discussions,
              presentations, and panel forums led by industry experts, thought leaders,
              and policymakers from across the D-8 member states and beyond.
            </p>
            <p>
              Spanning market trends, regulation, innovation, Islamic finance, and the
              next generation of halal entrepreneurs, the program is designed as a
              knowledge engine—turning expert dialogue into actionable strategy for
              everyone building in the global halal industry.
            </p>
          </div>

          <figure className={styles.pullQuote}>
            <Quote size={28} strokeWidth={1.5} className={styles.quoteIcon} />
            <blockquote>
              A knowledge engine for the $5.2 trillion halal economy—one stage, every
              voice that matters.
            </blockquote>
          </figure>
        </div>

        <div className={styles.imageRow}>
          <div className={styles.imageCard}>
            <Image
              src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1800&auto=format&fit=crop"
              alt="Keynote speaker addressing a packed conference hall"
              fill
              sizes="(max-width: 860px) 100vw, 60vw"
              className={styles.image}
            />
            <figcaption className={styles.imageCaption}>The Main Stage</figcaption>
          </div>
          <div className={`${styles.imageCard} ${styles.imageCardTall}`}>
            <Image
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop"
              alt="Delegates in discussion between sessions"
              fill
              sizes="(max-width: 860px) 100vw, 38vw"
              className={styles.image}
            />
            <figcaption className={styles.imageCaption}>Between Sessions</figcaption>
          </div>
        </div>
      </div>
    </section>
  );
}
