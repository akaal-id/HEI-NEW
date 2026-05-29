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
      },
      {
        id: 'asean-expo',
        name: 'ASEAN Expo Saudi Arabia',
        logo: '/partner-logo/event-partner/aseanexpo-logo.png',
        alt: 'ASEAN Expo Saudi Arabia logo',
        website: 'https://aseanexpo.org/',
      },
      {
        id: 'jeddah-vision',
        name: 'Jeddah Vision for Expo & Conferences',
        logo: '/partner-logo/event-partner/jvfe-logo.png',
        alt: 'Jeddah Vision for Expo & Conferences logo',
      },
      {
        id: 'kolej-uniti',
        name: 'Kolej UNITI',
        logo: '/partner-logo/event-partner/kolejuniti-logo.png',
        alt: 'Kolej UNITI logo',
      },
      {
        id: 'mihas',
        name: 'MIHAS',
        logo: '/partner-logo/event-partner/mihas-logo.png',
        alt: 'MIHAS - Malaysia International Halal Showcase logo',
        website: 'https://www.mihas.com.my/',
      },
      {
        id: 'talents-mapping',
        name: 'Talents Mapping',
        logo: '/partner-logo/event-partner/tm-logo.png',
        alt: 'Talents Mapping logo',
      },
      {
        id: 'uhac',
        name: 'Uniti Halal Centre',
        logo: '/partner-logo/event-partner/uhac-logo.png',
        alt: 'Uniti Halal Centre (UHAC) logo',
        website: 'https://unitihalalcentre.com/',
      },
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
      { id: 'beranda-news', name: 'Beranda News', logo: '/partner-logo/media-partner/berandanews-logo.png', alt: 'Beranda News' },
      { id: 'berita-info-jitu', name: 'Berita Info Jitu', logo: '/partner-logo/media-partner/beritainfojitu-logo.png', alt: 'Berita Info Jitu' },
      { id: 'berita-unggulan', name: 'Berita Unggulan', logo: '/partner-logo/media-partner/beritaunggulan-logo.png', alt: 'Berita Unggulan' },
      { id: 'bisnis-com', name: 'Bisnis.com', logo: '/partner-logo/media-partner/bisnis-logo.png', alt: 'Bisnis.com' },
      { id: 'bisnis-indonesia', name: 'Bisnis Indonesia', logo: '/partner-logo/media-partner/bisnisindonesia-logo.png', alt: 'Bisnis Indonesia' },
      { id: 'cantika', name: 'Cantika', logo: '/partner-logo/media-partner/cantika-logo.png', alt: 'Cantika' },
      { id: 'cyber-islam', name: 'Cyber Islam', logo: '/partner-logo/media-partner/cyberislam-logo.png', alt: 'Cyber Islam' },
      { id: 'dunia-mice', name: 'Dunia MICE', logo: '/partner-logo/media-partner/duniamice-logo.png', alt: 'Dunia MICE' },
      { id: 'getpost', name: 'Getpost', logo: '/partner-logo/media-partner/getpost-logo.png', alt: 'Getpost' },
      { id: 'hai-sawit-indonesia', name: 'Hai Sawit Indonesia', logo: '/partner-logo/media-partner/haisawitindonesia-logo.png', alt: 'Hai Sawit Indonesia' },
      { id: 'halal-i-see-you', name: 'Halal I See You', logo: '/partner-logo/media-partner/halaliseeyou-logo.png', alt: 'Halal I See You' },
      { id: 'humaniora', name: 'Humaniora', logo: '/partner-logo/media-partner/humaniora-logo.png', alt: 'Humaniora' },
      { id: 'indonesia-window-news', name: 'Indonesia Window News', logo: '/partner-logo/media-partner/indonesiawindownews-logo.png', alt: 'Indonesia Window News' },
      { id: 'inilah', name: 'Inilah', logo: '/partner-logo/media-partner/inilah-logo.png', alt: 'Inilah' },
      { id: 'infobrand', name: 'Infobrand', logo: '/partner-logo/media-partner/infobrand-logo.png', alt: 'Infobrand' },
      { id: 'info-filantropi', name: 'Info Filantropi', logo: '/partner-logo/media-partner/infofilantropi-logo.png', alt: 'Info Filantropi' },
      { id: 'klik-warta', name: 'Klik Warta', logo: '/partner-logo/media-partner/klikwarta-logo.png', alt: 'Klik Warta' },
      { id: 'medcom', name: 'Medcom', logo: '/partner-logo/media-partner/medcom-logo.png', alt: 'Medcom' },
      { id: 'metro-tv', name: 'Metro TV', logo: '/partner-logo/media-partner/metrotv-logo.png', alt: 'Metro TV' },
      { id: 'metro-tv-news', name: 'Metro TV News', logo: '/partner-logo/media-partner/metrotvnews-logo.png', alt: 'Metro TV News' },
      { id: 'muslim-terkini', name: 'Muslim Terkini', logo: '/partner-logo/media-partner/muslimterkini-logo.png', alt: 'Muslim Terkini' },
      { id: 'radar-baru', name: 'Radar Baru', logo: '/partner-logo/media-partner/radarbaru-logo.png', alt: 'Radar Baru' },
      { id: 'scraf-media', name: 'Scraf Media', logo: '/partner-logo/media-partner/scrafmedia-logo.png', alt: 'Scraf Media' },
      { id: 'suara-merdeka', name: 'Suara Merdeka', logo: '/partner-logo/media-partner/suaramerdeka-logo.png', alt: 'Suara Merdeka' },
      { id: 'suara-merdeka-tv', name: 'Suara Merdeka TV', logo: '/partner-logo/media-partner/suaramerdekatv-logo.png', alt: 'Suara Merdeka TV' },
      { id: 'tempo', name: 'TEMPO', logo: '/partner-logo/media-partner/tempo-logo.png', alt: 'TEMPO' },
      { id: 'telusur', name: 'Telusur', logo: '/partner-logo/media-partner/telusur-logo.png', alt: 'Telusur' },
      { id: 'the-phrase', name: 'The Phrase', logo: '/partner-logo/media-partner/thephrase-logo.png', alt: 'The Phrase' },
      { id: 'tvri-news', name: 'TVRI News', logo: '/partner-logo/media-partner/tvrinews-logo.png', alt: 'TVRI News' },
      { id: 'ummat-tv', name: 'Ummat TV', logo: '/partner-logo/media-partner/ummattv-logo.png', alt: 'Ummat TV' },
      { id: 'valid-news', name: 'Valid News', logo: '/partner-logo/media-partner/validnews-logo.png', alt: 'Valid News' },
      { id: 'venue-magazine', name: 'Venue Magazine', logo: '/partner-logo/media-partner/venuemagazine-logo.png', alt: 'Venue Magazine' },
      { id: 'warta-usaha', name: 'Warta Usaha', logo: '/partner-logo/media-partner/wartausaha-logo.png', alt: 'Warta Usaha' },
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

type PartnerSectionProps = {
  hideHeader?: boolean;
};

export default function PartnerSection({ hideHeader = false }: PartnerSectionProps) {
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
    <section
      ref={sectionRef}
      className={`${styles.section} ${hideHeader ? styles.sectionNoHeader : ''}`}
      id="partners"
    >
      <div className={styles.container}>
        {!hideHeader && (
          <div className={`${styles.header} ${styles.animateItem}`} data-animate="true" data-delay="0">
            <span className={styles.eyebrow}>OUR PARTNERS</span>
            <h2 className={styles.title}>Supported by Global Institutions</h2>
            <p className={styles.description}>
              We are proud to collaborate with a diverse range of partners who share our vision and commitment to fostering international cooperation and development.
            </p>
          </div>
        )}

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
