'use client';

import { useState, useEffect, useRef } from 'react';
import { runAnimeReveal } from '../../lib/animeReveal';
import styles from './FAQSection.module.css';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import buttonStyles from '../Button/Button.module.css';
import { faqItems, HOMEPAGE_FAQ_LIMIT } from '../../data/faq';

interface FAQSectionProps {
  /** Max number of questions to render. Defaults to the homepage limit. Pass `0` for all. */
  limit?: number;
  /** Whether to show the "View all questions" link to the dedicated FAQ page. */
  showViewAll?: boolean;
  /** Override the eyebrow + heading copy (used by the standalone /faq page). */
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function FAQSection({
  limit = HOMEPAGE_FAQ_LIMIT,
  showViewAll = true,
  eyebrow = 'MORE FOR YOU',
  title = 'Frequently Ask Question',
  description = 'for more question, feel free to ask!',
}: FAQSectionProps) {
  const visibleItems = limit && limit > 0 ? faqItems.slice(0, limit) : faqItems;
  const [expandedId, setExpandedId] = useState<string>(visibleItems[0]?.id ?? '');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import('animejs').then((animeModule) => {
              runAnimeReveal(animeModule, [headerRef.current, faqListRef.current], {
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

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? '' : id);
  };

  return (
    <section ref={sectionRef} className={styles.section} id="faq">
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.buttonGroup}>
            <a 
              href="https://wa.me/62895428247935" 
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonStyles.button} ${buttonStyles.primary} ${styles.contactButton}`}
            >
              <span className={buttonStyles.text}>Contact Marketing</span>
              <div className={buttonStyles.iconContainer}>
                <ArrowUpRight className={buttonStyles.icon} />
              </div>
            </a>
            <a 
              href="https://wa.me/62895403824515" 
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonStyles.button} ${buttonStyles.yellow} ${styles.contactSalesLink}`}
            >
              <span className={buttonStyles.text}>Contact Sales</span>
              <div className={buttonStyles.iconContainer}>
                <ArrowUpRight className={buttonStyles.icon} />
              </div>
            </a>
          </div>
        </div>

        <div ref={faqListRef} className={styles.faqList}>
          {visibleItems.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`${styles.faqItem} ${isExpanded ? styles.faqItemExpanded : ''}`}
                onClick={() => toggleFAQ(item.id)}
              >
                <div className={styles.faqHeader}>
                  <h3 className={styles.faqQuestion}>{item.question}</h3>
                  <div className={styles.faqIcon}>
                    <ChevronDown className={styles.icon} />
                  </div>
                </div>
                {isExpanded && (
                  <div className={styles.faqAnswer}>
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showViewAll && faqItems.length > visibleItems.length && (
          <div className={styles.viewAllWrapper}>
            <a href="/faq" className={styles.viewAllLink}>
              <span>View all {faqItems.length} questions</span>
              <ArrowUpRight className={styles.viewAllIcon} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
