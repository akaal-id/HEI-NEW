'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Button from '../Button/Button';
import styles from './PartnerSection.module.css';

interface Partner {
  id: string;
  name: string;
  logo: string;
  alt: string;
  website?: string;
}

interface PartnerCategory {
  id: string;
  label: string;
  partners: Partner[];
}

const partnerCategories: PartnerCategory[] = [
  {
    id: 'official-host',
    label: 'Official Host',
    partners: [
      {
        id: 'd8',
        name: 'D-8 Organization for Economic Cooperation',
        logo: '/Partner Logo/D8 Icon.svg',
        alt: 'D-8 Organization for Economic Cooperation',
        website: 'https://developing8.org/',
      },
      {
        id: 'islamic-economy',
        name: 'Islamic Economy',
        logo: '/Partner Logo/Islamic Economy logo.svg',
        alt: 'Islamic Economy',
        website: 'https://islamic-economy.org/',
      }
    ]
  },
  {
    id: 'strategic-partner',
    label: 'Strategic Partner',
    partners: [
      {
        id: 'kemlu',
        name: 'Ministry of Foreign Affairs Republic of Indonesia',
        logo: '/Partner Logo/Kemlu RI logo.svg',
        alt: 'Ministry of Foreign Affairs Republic of Indonesia',
        website: 'https://kemlu.go.id/',
      },
      {
        id: 'kneks',
        name: 'National Committee of Islamic Economy and Finance',
        logo: '/Partner Logo/KNEKS Icon.svg',
        alt: 'KNEKS - National Committee of Islamic Economy and Finance',
        website: 'https://www.kneks.go.id/',
      },
      {
        id: 'kadin',
        name: 'Indonesian Chamber of Commerce and Industry',
        logo: '/Partner Logo/Frame 12.svg',
        alt: 'KADIN Indonesia - Indonesian Chamber of Commerce and Industry',
        website: 'https://kadin.id/',
      }
    ]
  },
  {
    id: 'organized-by',
    label: 'Organized by',
    partners: [
      {
        id: 'skyconnect',
        name: 'skyconnection',
        logo: '/Partner Logo/skyconnect logo.svg',
        alt: 'skyconnection',
        website: 'https://skyconnection.co.id/',
      }
    ]
  }
];

export default function PartnerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
                categoriesRef.current,
                ctaRef.current,
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
    <section ref={sectionRef} className={styles.section} id="partners">
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>OUR PARTNERS</span>
          <h2 className={styles.title}>Supported by Global Institutions</h2>
          <p className={styles.description}>
            We are proud to collaborate with a diverse range of partners who share our vision and commitment to fostering international cooperation and development.
          </p>
        </div>

        <div ref={categoriesRef} className={styles.partnerCategories}>
          {partnerCategories.map((category) => (
            <div key={category.id} className={`${styles.category} ${category.id === 'organized-by' ? styles.organizedBy : ''}`}>
              <div className={styles.categoryLabel}>{category.label}</div>
              <div className={styles.partnerGrid}>
                {category.partners.map((partner) => (
                  <div key={partner.id} className={styles.partnerCard}>
                    {partner.website ? (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.partnerLink}
                        aria-label={`Visit ${partner.name} website`}
                      >
                        <div className={styles.partnerLogo}>
                          <Image
                            src={partner.logo}
                            alt={partner.alt}
                            width={200}
                            height={120}
                            className={styles.logoImage}
                          />
                        </div>
                      </a>
                    ) : (
                      <div className={styles.partnerLogo}>
                        <Image
                          src={partner.logo}
                          alt={partner.alt}
                          width={200}
                          height={120}
                          className={styles.logoImage}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className={styles.ctaSection}>
          <h3 className={styles.ctaTitle}>
          We invite you to explore a strategic partnership with D-8 Halal Expo Indonesia 2026!
          </h3>
          <p className={styles.ctaDescription}>
          This event offers an opportunity to enhance brand visibility, engage with key halal industry stakeholders, and support international business collaboration across D-8 Member States.
          </p>
          <Button 
            href="#sponsor" 
            variant="primary"
            className={styles.sponsorButton}
          >
            Explore Partnership Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
}
