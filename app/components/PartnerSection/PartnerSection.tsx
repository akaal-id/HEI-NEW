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
        alt: 'D-8 Organization for Economic Cooperation'
      },
      {
        id: 'islamic-economy',
        name: 'Islamic Economy',
        logo: '/Partner Logo/Islamic Economy logo.svg',
        alt: 'Islamic Economy'
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
        alt: 'Ministry of Foreign Affairs Republic of Indonesia'
      },
      {
        id: 'kneks',
        name: 'National Committee of Islamic Economy and Finance',
        logo: '/Partner Logo/KNEKS Icon.svg',
        alt: 'KNEKS - National Committee of Islamic Economy and Finance'
      },
      {
        id: 'kadin',
        name: 'Indonesian Chamber of Commerce and Industry',
        logo: '/Partner Logo/Frame 12.svg',
        alt: 'KADIN Indonesia - Indonesian Chamber of Commerce and Industry'
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
        alt: 'skyconnection'
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
                    <div className={styles.partnerLogo}>
                      <Image
                        src={partner.logo}
                        alt={partner.alt}
                        width={200}
                        height={120}
                        className={styles.logoImage}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className={styles.ctaSection}>
          <h3 className={styles.ctaTitle}>
            We invite you to become a sponsor for the D8 Halal Expo Indonesia!
          </h3>
          <p className={styles.ctaDescription}>
            This event is a fantastic opportunity to showcase your brand to a diverse audience and connect with key players in the halal industry. Join us in promoting halal products and services while gaining valuable exposure. Let&apos;s work together to make this event a success!
          </p>
          <Button 
            href="#sponsor" 
            variant="primary"
            className={styles.sponsorButton}
          >
            Become Our Sponsors
          </Button>
        </div>
      </div>
    </section>
  );
}
