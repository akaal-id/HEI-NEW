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
        logo: '/partner-logo/official-host/d-8_logo.png',
        alt: 'D-8 Organization for Economic Cooperation',
        website: 'https://developing8.org/',
      },
      {
        id: 'islamic-economy',
        name: 'Islamic Economy',
        logo: '/partner-logo/official-host/ie_logo.png',
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
        logo: '/partner-logo/strategic-partner/mfa-ri_logo.png',
        alt: 'Ministry of Foreign Affairs Republic of Indonesia',
        website: 'https://kemlu.go.id/',
      },
      {
        id: 'kneks',
        name: 'National Committee of Islamic Economy and Finance',
        logo: '/partner-logo/strategic-partner/kneks-logo.png',
        alt: 'KNEKS - National Committee of Islamic Economy and Finance',
        website: 'https://www.kneks.go.id/',
      },
      {
        id: 'kadin',
        name: 'Indonesian Chamber of Commerce and Industry',
        logo: '/partner-logo/strategic-partner/kadin-logo.png',
        alt: 'KADIN Indonesia - Indonesian Chamber of Commerce and Industry',
        website: 'https://kadin.id/',
      },
      {
        id: 'kpmi',
        name: 'KPMI',
        logo: '/partner-logo/strategic-partner/kpmi-logo.png',
        alt: 'KPMI logo',
        website: 'https://kpmi.or.id/',
      }
    ]
  },
  {
    id: 'event-partner',
    label: 'Event Partner',
    partners: [
      {
        id: 'wasabih',
        name: 'Wasabih',
        logo: '/partner-logo/event-partner/wasabih-logo.png',
        alt: 'Wasabih logo',
        website: 'https://wasabih.com/',
      },
      {
        id: 'akaal',
        name: 'Akaal',
        logo: '/partner-logo/event-partner/akaal-logo.png',
        alt: 'Akaal logo',
        website: 'https://akaal.id/',
      },
      {
        id: 'hegira',
        name: 'Hegira',
        logo: '/partner-logo/event-partner/hegira-logo.png',
        alt: 'Hegira logo',
        website: 'https://hegira.id/',
      },
      {
        id: 'halal-korea',
        name: 'Halal Korea',
        logo: '/partner-logo/event-partner/halalkorea-logo.png',
        alt: 'Halal Korea logo',
        website: 'http://halalkorea.tv/',
      },
      {
        id: 'halal-expo-sarajevo',
        name: 'Halal Expo Sarajevo',
        logo: '/partner-logo/event-partner/halalsarajevo-logo.png',
        alt: 'Halal Expo Sarajevo logo',
        website: 'https://halalexposarajevo.com/',
      }
    ]
  },
  {
    id: 'official-hotel-partner',
    label: 'Official Hotel Partner',
    partners: [
      {
        id: 'hotel-mulia',
        name: 'Hotel Mulia',
        logo: '/partner-logo/official-hotel-partner/hotelmulia-logo.png',
        alt: 'Hotel Mulia logo',
        website: 'https://www.themulia.com/jakarta/hotel-mulia',
      }
    ]
  },
  {
    id: 'promotion-partner',
    label: 'Promotion Partner',
    partners: [
      {
        id: 'jip',
        name: 'JIP',
        logo: '/partner-logo/promotional-partner/jip-logo.png',
        alt: 'JIP logo',
        website: 'https://jiplink.id/',
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
        logo: '/partner-logo/organized-by/skyconnect logo.png',
        alt: 'skyconnection',
        website: 'https://skyconnection.co.id/',
      }
    ]
  }
];

export default function PartnerSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const getPartnerCardClass = (categoryId: string) => {
    if (categoryId === 'strategic-partner') {
      return `${styles.partnerCard} ${styles.strategicPartnerCard}`;
    }

    if (categoryId === 'official-hotel-partner') {
      return `${styles.partnerCard} ${styles.officialHotelPartnerCard}`;
    }

    if (categoryId === 'event-partner') {
      return `${styles.partnerCard} ${styles.eventPartnerCard}`;
    }

    if (categoryId === 'promotion-partner') {
      return `${styles.partnerCard} ${styles.promotionPartnerCard}`;
    }

    return styles.partnerCard;
  };

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let isMounted = true;

    const setupAnimations = async () => {
      const animeModule = await import('animejs');
      if (!isMounted || !sectionRef.current) return;

      const animate = animeModule.animate as any;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const target = entry.target as HTMLElement;
            const delay = Number(target.dataset.delay ?? 0);

            animate(target, {
              opacity: [0, 1],
              translateY: [24, 0],
              delay: Number.isFinite(delay) ? delay : 0,
              duration: 1200,
              easing: 'easeOutQuad',
            });

            observer?.unobserve(target);
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -10% 0px',
        }
      );

      const animatableItems = sectionRef.current.querySelectorAll('[data-animate="true"]');
      animatableItems.forEach((item) => observer?.observe(item));
    };

    setupAnimations();

    return () => {
      isMounted = false;
      observer?.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="partners">
      <div className={styles.container}>
        <div className={`${styles.header} ${styles.animateItem}`} data-animate="true" data-delay="0">
          <span className={styles.eyebrow}>OUR PARTNERS</span>
          <h2 className={styles.title}>Supported by Global Institutions</h2>
          <p className={styles.description}>
            We are proud to collaborate with a diverse range of partners who share our vision and commitment to fostering international cooperation and development.
          </p>
        </div>

        <div className={styles.partnerCategories}>
          {partnerCategories.map((category, index) => (
            <div
              key={category.id}
              className={`${styles.category} ${styles.animateItem} ${category.id === 'organized-by' ? styles.organizedBy : ''} ${category.id === 'media-partner' ? styles.mediaPartnerCategory : ''}`}
              data-animate="true"
              data-delay={String(index * 100)}
            >
              <div className={styles.categoryLabel}>{category.label}</div>
              <div className={category.id === 'media-partner' ? styles.mediaPartnerGrid : styles.partnerGrid}>
                {category.partners.map((partner) => (
                  <div key={partner.id} className={category.id === 'media-partner' ? styles.mediaPartnerCard : getPartnerCardClass(category.id)}>
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

        <div className={`${styles.ctaSection} ${styles.animateItem}`} data-animate="true" data-delay="0">
          <h3 className={styles.ctaTitle}>
          We invite you to explore a strategic partnership with D-8 Halal Expo Indonesia 2026!
          </h3>
          <p className={styles.ctaDescription}>
          This event offers an opportunity to enhance brand visibility, engage with key halal industry stakeholders, and support international business collaboration across D-8 Member States.
          </p>
          <Button 
            href="https://wa.me/62895428247935" 
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sponsorButton}
          >
            Be Our Partner
          </Button>
        </div>
      </div>
    </section>
  );
}
