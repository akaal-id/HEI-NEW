'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Button from '../Button/Button';
import styles from './ProgramSection.module.css';
import { ArrowUpRight } from 'lucide-react';

interface Program {
  id: string;
  title: string;
  image: string;
  description: string;
  href: string;
}

const programs: Program[] = [
  {
    id: 'exhibition',
    title: 'Exhibition',
    image: '/images/Programs/1-Exhibition.png',
    description: 'Showcase your halal products and services to global buyers, investors, and government delegations on the main expo floor.',
    href: '/programs/exhibition',
  },
  {
    id: 'business-matching',
    title: 'Business Matching',
    image: '/images/Programs/2-Business Matching.png',
    description: 'Pre-scheduled, curated B2B meetings that turn introductions into cross-border deals across the D-8 halal market.',
    href: '/programs/business-matching',
  },
  {
    id: 'investment',
    title: 'Investment Matchmaking',
    image: '/images/Programs/3-Investment Matchmaking.png',
    description: 'Connect high-potential ventures with the investors and capital funding the next wave of the halal economy.',
    href: '/programs/investment',
  },
  {
    id: 'hei-talk',
    title: 'D-8 HEI Talkshow',
    image: '/images/Programs/5-D-8 HEI Talkshow.png',
    description: 'Insights from policymakers and industry leaders shaping the regulations of the global halal trade.',
    href: '/programs/hei-talk',
  },
  {
    id: 'culture-festival',
    title: 'D-8 HEI Cultural Fest',
    image: '/images/Programs/6-Culture Festival.png',
    description: 'Celebrate the rich heritage of the D-8 nations through performances, art, and cultural showcases.',
    href: '/programs/culture-festival',
  },
];

export default function ProgramSection() {
  // Track which card is expanded (only one card is expanded, others are default)
  // Initially: exhibition is expanded, all others are default
  const [expandedCard, setExpandedCard] = useState<string>('exhibition');
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import('animejs').then((animeModule) => {
              const animate = animeModule.animate as any;
              const stagger = animeModule.stagger;

              const elements = [
                headerRef.current,
                cardsRef.current,
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

  const handleSelect = (programId: string) => {
    setExpandedCard(programId);
  };

  // Exhibition is active initially; before mount match SSR state.
  const activeId = mounted ? expandedCard : 'exhibition';
  const activeProgram = programs.find((p) => p.id === activeId) ?? programs[0];

  return (
    <section ref={sectionRef} className={styles.section} id="programs">
      <div className={`${styles.inner} hei-container`}>
        {/* 1. Centered main title */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>KEY PROGRAMS</span>
          <h2 className={styles.title}>What&apos;s On D-8 HEI 2026?</h2>
        </div>

        {/* 2. Program elements — one large image container with the selector nested inside */}
        <div ref={cardsRef} className={styles.showcase}>
          <div className={styles.showcaseStage}>
            {programs.map((program) => (
              <div
                key={program.id}
                className={`${styles.showcaseImage} ${program.id === activeId ? styles.showcaseImageActive : ''}`}
                aria-hidden={program.id !== activeId}
              >
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className={styles.showcaseImageEl}
                  priority={program.id === 'exhibition'}
                />
              </div>
            ))}
            <div className={styles.showcaseOverlay} />

            <div className={styles.showcaseContent}>
              <h3 className={styles.showcaseTitle}>{activeProgram.title}</h3>
              <p className={styles.showcaseSubtext}>{activeProgram.description}</p>
              <Button
                href={activeProgram.href}
                variant="secondary"
                className={styles.showcaseButton}
                textClassName={styles.cardButtonText}
                iconClassName={styles.cardButtonIcon}
              >
                Discover More
              </Button>
            </div>
          </div>

          {/* Nested program selector */}
          <div className={styles.selector} role="tablist" aria-label="Programs">
            {programs.map((program) => {
              const isActive = program.id === activeId;
              return (
                <button
                  key={program.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.selectorItem} ${isActive ? styles.selectorItemActive : ''}`}
                  onMouseEnter={() => handleSelect(program.id)}
                  onFocus={() => handleSelect(program.id)}
                  onClick={() => handleSelect(program.id)}
                >
                  <span className={styles.selectorItemText}>{program.title}</span>
                  <span className={styles.selectorItemIcon}>
                    <ArrowUpRight className={styles.cardIcon} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Descriptive sub-text & actionable CTA */}
        <div className={styles.footer}>
          <p className={styles.description}>
            D-8 Halal Expo Indonesia 2026 bridges high-level D-8 economic diplomacy and real-sector halal business by connecting policy dialogue with concrete B2B collaboration, investment, and trade.
          </p>
          <Button href="/programs" variant="primary" className={styles.viewAllButton}>
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
}
