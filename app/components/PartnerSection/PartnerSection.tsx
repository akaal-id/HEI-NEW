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
    id: 'media-partner',
    label: 'Media Partner',
    partners: [
      { id: 'beranda-news', name: 'Beranda News', logo: '/Media Partner/Logo Beranda News/Beranda News.jpg.jpeg', alt: 'Beranda News' },
      { id: 'berita-info-jitu', name: 'Berita Info Jitu', logo: '/Media Partner/Logo Berita Info Jitu/IMG-20260207-WA0001(1).jpg.jpeg', alt: 'Berita Info Jitu' },
      { id: 'berita-unggulan', name: 'Berita Unggulan', logo: '/Media Partner/LOGO BERITA UNGGULAN/WhatsApp Image 2026-02-26 at 17.31.38.jpeg', alt: 'Berita Unggulan' },
      { id: 'bisnis-com', name: 'Bisnis.com', logo: '/Media Partner/Logo Bisnis.com/Bisniscom Hitam.png', alt: 'Bisnis.com' },
      { id: 'cantika', name: 'Cantika', logo: '/Media Partner/Logo Cantika/000 Logo Cantika 2025-07.png', alt: 'Cantika' },
      { id: 'dunia-mice', name: 'Dunia MICE', logo: '/Media Partner/Logo Dunia MICE/LOGO DUNIA MICE (COLOR).png', alt: 'Dunia MICE' },
      { id: 'getpost', name: 'Getpost', logo: '/Media Partner/Logo Getpost/451718.jpg', alt: 'Getpost' },
      { id: 'hai-sawit-indonesia', name: 'Hai Sawit Indonesia', logo: '/Media Partner/Logo Hai Sawit Indonesia/LOGO HSI HD.PNG', alt: 'Hai Sawit Indonesia' },
      { id: 'halal-i-see-you', name: 'Halal I See You', logo: '/Media Partner/Logo Halal I See You/halalicu-partnership(1).png', alt: 'Halal I See You' },
      { id: 'humaniora', name: 'Humaniora', logo: '/Media Partner/Logo Humaniora/WhatsApp Image 2026-02-06 at 16.17.54_Nero_AI_Image_Upscaler_Photo_Face.jpeg', alt: 'Humaniora' },
      { id: 'klik-warta', name: 'Klik Warta', logo: '/Media Partner/Logo Klik Warta/Logo Klikwarta.com.png', alt: 'Klik Warta' },
      { id: 'metro-tv', name: 'Metro TV', logo: '/Media Partner/Logo Metro TV/Metro TV/SAVE_20260206_162410.jpg.jpeg', alt: 'Metro TV' },
      { id: 'muslim-terkini', name: 'Muslim Terkini', logo: '/Media Partner/Logo Muslim Terkini/Logo MuslimTerkini ID.jpg.jpeg', alt: 'Muslim Terkini' },
      { id: 'scarf-media', name: 'Scarf Media', logo: '/Media Partner/Logo Scarf Media/LOGO SCARF MEDIA black new hires.png', alt: 'Scarf Media' },
      { id: 'tempo', name: 'TEMPO', logo: '/Media Partner/Logo TEMPO/Tempo White RED.png', alt: 'TEMPO' },
      { id: 'the-phrase', name: 'The Phrase', logo: '/Media Partner/Logo The Phrase/the phrase logo - landscape.png', alt: 'The Phrase' },
      { id: 'valid-news', name: 'Valid News', logo: '/Media Partner/Logo Valid News/VALIDNEWS LOGO (WHITE).png', alt: 'Valid News' },
      { id: 'venue-magazine', name: 'Venue Magazine', logo: '/Media Partner/Logo Venue Magazine/logo venue baru kotak.jpg', alt: 'Venue Magazine' },
      { id: 'warta-usaha', name: 'Warta Usaha', logo: '/Media Partner/Logo Warta Usaha/Logo Wartausaha_PNG.png', alt: 'Warta Usaha' },
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
            <div key={category.id} className={`${styles.category} ${category.id === 'organized-by' ? styles.organizedBy : ''} ${category.id === 'media-partner' ? styles.mediaPartnerCategory : ''}`}>
              <div className={styles.categoryLabel}>{category.label}</div>
              <div className={category.id === 'media-partner' ? styles.mediaPartnerGrid : styles.partnerGrid}>
                {category.partners.map((partner) => (
                  <div key={partner.id} className={category.id === 'media-partner' ? styles.mediaPartnerCard : styles.partnerCard}>
                    {partner.website ? (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.partnerLink}
                        aria-label={`Visit ${partner.name} website`}
                      >
                        <div className={category.id === 'media-partner' ? styles.mediaPartnerLogo : styles.partnerLogo}>
                          <Image
                            src={partner.logo}
                            alt={partner.alt}
                            width={category.id === 'media-partner' ? 140 : 200}
                            height={category.id === 'media-partner' ? 72 : 120}
                            className={styles.logoImage}
                          />
                        </div>
                      </a>
                    ) : (
                      <div className={category.id === 'media-partner' ? styles.mediaPartnerLogo : styles.partnerLogo}>
                        <Image
                          src={partner.logo}
                          alt={partner.alt}
                          width={category.id === 'media-partner' ? 140 : 200}
                          height={category.id === 'media-partner' ? 72 : 120}
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
