'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import styles from './ProgramSection.module.css';
import { ArrowUpRight } from 'lucide-react';

interface Program {
  id: string;
  title: string;
  image: string;
}

const programs: Program[] = [
  { id: 'exhibition', title: 'Exhibition', image: '/images/overview.jpg' },
  { id: 'business-matching', title: 'Business Matching', image: '/images/overview.jpg' },
  { id: 'investment', title: 'Investment Match Making', image: '/images/overview.jpg' },
  { id: 'youth', title: 'Youth Event', image: '/images/overview.jpg' },
  { id: 'd8-talk', title: 'D-8 HEI Talk', image: '/images/overview.jpg' },
  { id: 'd8-culture', title: 'D8 Culture Festival', image: '/images/overview.jpg' },
];

export default function ProgramSection() {
  // Track which card is expanded (only one card is expanded, others are default)
  // Initially: exhibition is expanded, all others are default
  const [expandedCard, setExpandedCard] = useState<string>('exhibition');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCardHover = (programId: string) => {
    // When hovering a default card, it becomes expanded
    // When hovering an expanded card, it stays expanded (no change)
    if (expandedCard !== programId) {
      // Hovering a default card - make it expanded
      setExpandedCard(programId);
    }
  };

  const handleCardLeave = () => {
    // When mouse leaves, keep the current expanded card (or reset to exhibition)
    // This prevents flickering when moving between cards
  };

  // Exhibition is expanded initially, all others are default
  const getIsExpanded = (programId: string) => {
    if (!mounted) {
      // During SSR, match the initial client state: exhibition is expanded, others are default
      return programId === 'exhibition';
    }
    // After mount: check if this card is the expanded one
    return expandedCard === programId;
  };

  return (
    <section className={styles.section} id="programs">
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.eyebrow}>KEY PROGRAMS</span>
          <h2 className={styles.title}>What's On D8 HEI 2026?</h2>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.description}>
            HEI 2026 bridges high-level diplomacy and real-sector business through a dual-venue ecosystem, combining ministerial dialogue with concrete B2B transactions.
          </p>
          <Button href="#all-programs" variant="primary" className={styles.viewAllButton}>
            View All Programs
          </Button>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {programs.map((program) => {
          const isExpanded = getIsExpanded(program.id);
          return (
            <div
              key={program.id}
              className={`${styles.card} ${isExpanded ? styles.cardExpanded : styles.cardDefault}`}
              onMouseEnter={() => handleCardHover(program.id)}
              onMouseLeave={handleCardLeave}
            >
              <div className={styles.cardImageContainer}>
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className={styles.cardImage}
                  priority={false}
                />
                <div className={styles.cardOverlay}></div>
              </div>
              <div className={styles.cardContent}>
                {isExpanded ? (
                  <>
                    <h3 className={styles.cardTitle}>{program.title}</h3>
                    <Button
                      href={`#${program.id}`}
                      variant="secondary"
                      className={styles.cardButton}
                      textClassName={styles.cardButtonText}
                      iconClassName={styles.cardButtonIcon}
                    >
                      Discover More
                    </Button>
                  </>
                ) : (
                  <div className={styles.cardIconButton}>
                    <ArrowUpRight className={styles.cardIcon} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
