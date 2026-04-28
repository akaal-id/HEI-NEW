'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './FAQSection.module.css';
import { ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import buttonStyles from '../Button/Button.module.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 'what-is-hei',
    question: 'What is D-8 Halal Expo Indonesia 2026?',
    answer: 'D-8 Halal Expo Indonesia 2026 is an international B2B platform and as a part of the 2026 D-8 Summit, designed to connect businesses, investors, regulators, and key stakeholders in order to strengthen trade among D-8 Nations, enhance resilient halal value chains, and advance economic cooperation, investment, and sustainable development among D-8 Nations.'
  },
  {
    id: 'd8-summit',
    question: 'How is D-8 Halal Expo Indonesia 2026 related to the 2026 D-8 Summit?',
    answer: 'D-8 Halal Expo Indonesia 2026 is officially aligned as a part of the 2026 D-8 Summit, creating a strategic platform that bridges high-level diplomacy with real-sector business opportunities. Unique networking opportunities with policy-makers who shape the regulations of the $5.2 Trillion global halal market.'
  },
  {
    id: 'who-should-attend',
    question: 'Who should attend D-8 Halal Expo Indonesia 2026?',
    answer: 'D-8 Halal Expo Indonesia 2026 is designed for governments, businesses, investors, and youth leaders interested in the halal economy, trade, and investment opportunities.'
  },
  {
    id: 'exhibitor',
    question: 'Who can become an exhibitor?',
    answer: 'Companies and organizations involved in halal products, services, and solutions can become exhibitors at D-8 Halal Expo Indonesia 2026.'
  },
  {
    id: 'exhibitor-benefits',
    question: 'What are the benefits of exhibiting at D-8 Halal Expo Indonesia 2026?',
    answer: 'Exhibitors gain access to global buyers, investors, and government officials, participate in business matching sessions, and showcase their products to a targeted halal market audience.'
  },
  {
    id: 'buyer',
    question: 'Who qualifies as a buyer?',
    answer: 'Buyers include retailers, distributors, importers, and businesses looking to source halal products and services for their markets.'
  },
  {
    id: 'business-matching',
    question: 'How does the Business Matching program work?',
    answer: 'The Business Matching program connects exhibitors with qualified buyers through pre-scheduled meetings, facilitating direct B2B transactions and partnerships.'
  },
  {
    id: 'investment-matchmaking',
    question: 'What is Investment Matchmaking?',
    answer: 'Investment Matchmaking connects businesses seeking funding with investors looking for halal economy opportunities, facilitating strategic investment partnerships.'
  },
  {
    id: 'youth-summit',
    question: 'What is the Youth Summit?',
    answer: 'The Youth Program is a dedicated platform for young leaders and entrepreneurs to engage with the halal economy, featuring networking, mentorship, and innovation showcases.'
  },
  {
    id: 'register',
    question: 'How do I register for D-8 Halal Expo Indonesia 2026?',
    answer: 'You can register for D-8 Halal Expo Indonesia 2026 through our official website. Different registration options are available for exhibitors, buyers, and general attendees.'
  },
  {
    id: 'media',
    question: 'Is media accreditation available?',
    answer: 'Yes, media accreditation is available for journalists and media professionals. Please contact our media relations team for more information.'
  },
  {
    id: 'cultural-festival',
    question: 'What is the Cultural Festival?',
    answer: 'The Cultural Festival is a dedicated platform for showcasing the rich culture and heritage of the D-8 Nations, featuring traditional performances, art exhibitions, and cultural workshops.'
  }
];

export default function FAQSection() {
  const [expandedId, setExpandedId] = useState<string>('what-is-hei');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);

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
                faqListRef.current,
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

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? '' : id);
  };

  return (
    <section ref={sectionRef} className={styles.section} id="faq">
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>MORE FOR YOU</span>
          <h2 className={styles.title}>Frequently Ask Question</h2>
          <p className={styles.description}>for more question, feel free to ask!</p>
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
          {faqItems.map((item) => {
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
                    {isExpanded ? (
                      <ChevronDown className={styles.icon} />
                    ) : (
                      <ChevronDown className={styles.icon} />
                    )}
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
      </div>
    </section>
  );
}
