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
      },
      {
        id: 'halal-indonesia',
        name: 'Halal Indonesia',
        logo: '/partner-logo/strategic-partner/halal-logo.png',
        alt: 'Halal Indonesia',
        website: 'https://bpjph.halal.go.id/',
      },
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
        id: 'bpjph',
        name: 'Badan Penyelenggara Jaminan Produk Halal',
        logo: '/partner-logo/strategic-partner/bpjph-logo.png',
        alt: 'BPJPH - Badan Penyelenggara Jaminan Produk Halal',
        website: 'https://bpjph.halal.go.id/',
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
      }
    ]
  },
  {
    id: 'sponsor',
    label: 'Sponsor',
    partners: [
      {
        id: 'bpkh',
        name: 'Badan Pengelola Keuangan Haji',
        logo: '/partner-logo/sponsor/bpkh-logo.png',
        alt: 'BPKH - Badan Pengelola Keuangan Haji',
        website: 'https://www.bpkh.go.id/',
      },
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
        id: 'kpmi',
        name: 'KPMI',
        logo: '/partner-logo/strategic-partner/kpmi-logo.png',
        alt: 'KPMI logo',
        website: 'https://kpmi.or.id/',
      },
      {
        id: 'jip',
        name: 'JIP',
        logo: '/partner-logo/promotional-partner/jip-logo.png',
        alt: 'JIP logo',
        website: 'https://jiplink.id/',
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
        id: 'akaal',
        name: 'Akaal',
        logo: '/partner-logo/event-partner/akaal-logo.png',
        alt: 'Akaal logo',
        website: 'https://akaal.id/',
      },
      {
        id: 'mihas',
        name: 'MIHAS',
        logo: '/partner-logo/event-partner/mihas-logo.png',
        alt: 'MIHAS - Malaysia International Halal Showcase logo',
        website: 'https://www.mihas.com.my/',
      }
    ]
  },
  {
    id: 'community-partner',
    label: 'Community Partner',
    partners: [
      {
        id: 'mcc',
        name: 'Muslim Consumer Council of Canada',
        logo: '/partner-logo/international-partner/mcc-logo.png',
        alt: 'Muslim Consumer Council of Canada logo',
        website: 'https://mcc-ca.org/',
      },
      {
        id: 'inspigo',
        name: 'Inspigo',
        logo: '/partner-logo/local-community-partner/inspigo-logopng.png',
        alt: 'Inspigo logo',
        website: 'https://inspigo.id/',
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
    id: 'official-contractor-partner',
    label: 'Official Contractor Partner',
    partners: [
      {
        id: 'kuat',
        name: 'Kuat',
        logo: '/partner-logo/official-contractor-partner/kuat-logo.png',
        alt: 'Kuat logo',
      },
    ]
  },
  {
    id: 'official-freight-forwarder-partner',
    label: 'Official Freight Forwarder Partner',
    partners: [
      {
        id: 'vissasa',
        name: 'PT Vissasa Parama Ñati',
        logo: '/partner-logo/official-freight-forwarder-partner/vissasa-logo.png',
        alt: 'PT Vissasa Parama Ñati logo',
        website: 'https://vissasa.id/',
      },
    ]
  },
  {
    id: 'business-matching-platform',
    label: 'Business Matching Platform',
    partners: [
      {
        id: 'appsaya',
        name: 'Appsaya',
        logo: '/partner-logo/business-matching-platform/appsaya-logo.png',
        alt: 'Appsaya logo',
        website: 'https://appsaya.com/',
      },
    ]
  },
  {
    id: 'registration-partner',
    label: 'Official Registration Partner',
    partners: [
      {
        id: 'hegira',
        name: 'Hegira',
        logo: '/partner-logo/event-partner/hegira-logo.png',
        alt: 'Hegira logo',
        website: 'https://hegira.id/',
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
      { id: 'katadata', name: 'Katadata', logo: '/partner-logo/media-partner/katadata-logo.png', alt: 'Katadata', website: 'https://katadata.co.id/' },
      { id: 'databooks', name: 'Databooks', logo: '/partner-logo/media-partner/databooks-logo.png', alt: 'Databooks', website: 'https://databooks.co.id/' },
      { id: 'republika', name: 'Republika', logo: '/partner-logo/media-partner/republika-logo.png', alt: 'Republika', website: 'https://republika.co.id/' },
      { id: 'bisnis-indonesia', name: 'Bisnis Indonesia', logo: '/partner-logo/media-partner/bisnisindonesia-logo.png', alt: 'Bisnis Indonesia' },
      { id: 'bisnis-com', name: 'Bisnis.com', logo: '/partner-logo/media-partner/bisnis-logo.png', alt: 'Bisnis.com' },
      { id: 'metro-tv', name: 'Metro TV', logo: '/partner-logo/media-partner/metrotv-logo.png', alt: 'Metro TV' },
      { id: 'metro-tv-news', name: 'Metro TV News', logo: '/partner-logo/media-partner/metrotvnews-logo.png', alt: 'Metro TV News' },
      { id: 'medcom', name: 'Medcom', logo: '/partner-logo/media-partner/medcom-logo.png', alt: 'Medcom' },
      { id: 'tvri-news', name: 'TVRI News', logo: '/partner-logo/media-partner/tvrinews-logo.png', alt: 'TVRI News' },
      { id: 'liputan6', name: 'Liputan6', logo: '/partner-logo/media-partner/liputan-6-logo.png', alt: 'Liputan6' },
      { id: 'tempo', name: 'TEMPO', logo: '/partner-logo/media-partner/tempo-logo.png', alt: 'TEMPO' },
      { id: 'cantika', name: 'Cantika', logo: '/partner-logo/media-partner/cantika-logo.png', alt: 'Cantika' },
      { id: 'inilah', name: 'Inilah', logo: '/partner-logo/media-partner/inilah-logo.png', alt: 'Inilah' },
      { id: 'scraf-media', name: 'Scraf Media', logo: '/partner-logo/media-partner/scrafmedia-logo.png', alt: 'Scraf Media' },
      { id: 'halal-i-see-you', name: 'Halal I See You', logo: '/partner-logo/media-partner/halaliseeyou-logo.png', alt: 'Halal I See You' },
      { id: 'suara-merdeka', name: 'Suara Merdeka', logo: '/partner-logo/media-partner/suaramerdeka-logo.png', alt: 'Suara Merdeka' },
      { id: 'suara-merdeka-tv', name: 'Suara Merdeka TV', logo: '/partner-logo/media-partner/suaramerdekatv-logo.png', alt: 'Suara Merdeka TV' },
      { id: 'humaniora', name: 'Humaniora', logo: '/partner-logo/media-partner/humaniora-logo.png', alt: 'Humaniora' },
      { id: 'beranda-news', name: 'Beranda News', logo: '/partner-logo/media-partner/berandanews-logo.png', alt: 'Beranda News' },
      { id: 'radar-baru', name: 'Radar Baru', logo: '/partner-logo/media-partner/radarbaru-logo.png', alt: 'Radar Baru' },
      { id: 'warta-usaha', name: 'Warta Usaha', logo: '/partner-logo/media-partner/wartausaha-logo.png', alt: 'Warta Usaha' },
      { id: 'venue-magazine', name: 'Venue Magazine', logo: '/partner-logo/media-partner/venuemagazine-logo.png', alt: 'Venue Magazine' },
      { id: 'valid-news', name: 'Valid News', logo: '/partner-logo/media-partner/validnews-logo.png', alt: 'Valid News' },
      { id: 'ummat-tv', name: 'Ummat TV', logo: '/partner-logo/media-partner/ummattv-logo.png', alt: 'Ummat TV' },
      { id: 'the-phrase', name: 'The Phrase', logo: '/partner-logo/media-partner/thephrase-logo.png', alt: 'The Phrase' },
      { id: 'telusur', name: 'Telusur', logo: '/partner-logo/media-partner/telusur-logo.png', alt: 'Telusur' },
      { id: 'muslim-terkini', name: 'Muslim Terkini', logo: '/partner-logo/media-partner/muslimterkini-logo.png', alt: 'Muslim Terkini' },
      { id: 'dunia-mice', name: 'Dunia MICE', logo: '/partner-logo/media-partner/duniamice-logo.png', alt: 'Dunia MICE' },
      { id: 'klik-warta', name: 'Klik Warta', logo: '/partner-logo/media-partner/klikwarta-logo.png', alt: 'Klik Warta' },
      { id: 'infobrand', name: 'Infobrand', logo: '/partner-logo/media-partner/infobrand-logo.png', alt: 'Infobrand' },
      { id: 'indonesia-window-news', name: 'Indonesia Window News', logo: '/partner-logo/media-partner/indonesiawindownews-logo.png', alt: 'Indonesia Window News' },
      { id: 'hangout', name: 'Hangout', logo: '/partner-logo/media-partner/hangout-logo.png', alt: 'Hangout' },
      { id: 'hai-sawit-indonesia', name: 'Hai Sawit Indonesia', logo: '/partner-logo/media-partner/haisawitindonesia-logo.png', alt: 'Hai Sawit Indonesia' },
      { id: 'getpost', name: 'Getpost', logo: '/partner-logo/media-partner/getpost-logo.png', alt: 'Getpost' },
      { id: 'cyber-islam', name: 'Cyber Islam', logo: '/partner-logo/media-partner/cyberislam-logo.png', alt: 'Cyber Islam' },
      { id: 'berita-unggulan', name: 'Berita Unggulan', logo: '/partner-logo/media-partner/beritaunggulan-logo.png', alt: 'Berita Unggulan' },
      { id: 'berita-info-jitu', name: 'Berita Info Jitu', logo: '/partner-logo/media-partner/beritainfojitu-logo.png', alt: 'Berita Info Jitu' },
      { id: 'info-filantropi', name: 'Info Filantropi', logo: '/partner-logo/media-partner/infofilantropi-logo.png', alt: 'Info Filantropi' },
      { id: 'oumma', name: 'Oumma', logo: '/partner-logo/media-partner/oumma-logo.png', alt: 'Oumma' },
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

type LayoutType =
  | 'default'
  | 'grid-4'
  | 'event-grid'
  | 'media-grid-5'
  | 'single-logo';

type DisplaySection =
  | { type: 'single'; categoryId: string; layout?: LayoutType }
  | { type: 'pair'; categoryIds: [string, string] }
  | { type: 'triple'; categoryIds: [string, string, string] };

const hiddenCategoryIds = new Set(['promotion-partner']);

const displaySections: DisplaySection[] = [
  { type: 'single', categoryId: 'official-host', layout: 'default' },
  { type: 'single', categoryId: 'strategic-partner', layout: 'grid-4' },
  { type: 'pair', categoryIds: ['organized-by', 'sponsor'] },
  { type: 'single', categoryId: 'event-partner', layout: 'event-grid' },
  { type: 'pair', categoryIds: ['business-matching-platform', 'official-hotel-partner'] },
  {
    type: 'triple',
    categoryIds: [
      'registration-partner',
      'official-contractor-partner',
      'official-freight-forwarder-partner',
    ],
  },
  { type: 'single', categoryId: 'community-partner', layout: 'default' },
  { type: 'single', categoryId: 'media-partner', layout: 'media-grid-5' },
];

const categoryById = new Map(
  partnerCategories
    .filter((category) => !hiddenCategoryIds.has(category.id))
    .map((category) => [category.id, category])
);

export default function PartnerSection({ hideHeader = false }: PartnerSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const getPartnerCardClass = (categoryId: string) => {
    if (categoryId === 'strategic-partner') {
      return `${styles.partnerCard} ${styles.strategicPartnerCard}`;
    }

    if (
      categoryId === 'official-hotel-partner' ||
      categoryId === 'registration-partner' ||
      categoryId === 'official-contractor-partner' ||
      categoryId === 'official-freight-forwarder-partner'
    ) {
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

  const renderPartnerCard = (partner: Partner, categoryId: string) => (
    <div key={partner.id} className={categoryId === 'media-partner' ? styles.mediaPartnerCard : getPartnerCardClass(categoryId)}>
      {partner.website ? (
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.partnerLink}
          aria-label={`Visit ${partner.name} website`}
        >
          <div className={categoryId === 'media-partner' ? styles.mediaPartnerLogo : styles.partnerLogo}>
            <Image
              src={partner.logo}
              alt={partner.alt}
              width={categoryId === 'media-partner' ? 140 : 200}
              height={categoryId === 'media-partner' ? 72 : 120}
              className={styles.logoImage}
            />
          </div>
        </a>
      ) : (
        <div className={categoryId === 'media-partner' ? styles.mediaPartnerLogo : styles.partnerLogo}>
          <Image
            src={partner.logo}
            alt={partner.alt}
            width={categoryId === 'media-partner' ? 140 : 200}
            height={categoryId === 'media-partner' ? 72 : 120}
            className={styles.logoImage}
          />
        </div>
      )}
    </div>
  );

  const getGridClassName = (categoryId: string, layout: LayoutType = 'default') => {
    if (categoryId === 'media-partner' || layout === 'media-grid-5') {
      return styles.mediaPartnerGrid;
    }

    if (layout === 'grid-4') {
      return styles.strategicPartnerGrid;
    }

    if (layout === 'event-grid') {
      return styles.eventPartnerGrid;
    }

    if (layout === 'single-logo') {
      return `${styles.partnerGrid} ${styles.singleLogoGrid}`;
    }

    return styles.partnerGrid;
  };

  const renderCategoryBlock = (
    category: PartnerCategory,
    layout: LayoutType = 'default',
    animationProps?: { className: string; 'data-animate': 'true'; 'data-delay': string }
  ) => (
    <div
      className={`${styles.category} ${animationProps?.className ?? ''}`.trim()}
      data-animate={animationProps?.['data-animate']}
      data-delay={animationProps?.['data-delay']}
    >
      <div className={styles.categoryLabel}>{category.label}</div>
      <div className={getGridClassName(category.id, layout)}>
        {category.partners.map((partner) => renderPartnerCard(partner, category.id))}
      </div>
    </div>
  );

  const renderSection = (section: DisplaySection, index: number) => {
    const animationProps = {
      className: styles.animateItem,
      'data-animate': 'true' as const,
      'data-delay': String(index * 100),
    };

    if (section.type === 'pair') {
      const [leftId, rightId] = section.categoryIds;
      const leftCategory = categoryById.get(leftId);
      const rightCategory = categoryById.get(rightId);

      if (!leftCategory && !rightCategory) return null;

      return (
        <div
          key={`pair-${leftId}-${rightId}`}
          className={`${styles.partnerPairRow} ${animationProps.className}`}
          data-animate={animationProps['data-animate']}
          data-delay={animationProps['data-delay']}
        >
          {leftCategory && renderCategoryBlock(leftCategory, 'single-logo')}
          {rightCategory && renderCategoryBlock(rightCategory, 'single-logo')}
        </div>
      );
    }

    if (section.type === 'triple') {
      const categories = section.categoryIds
        .map((categoryId) => categoryById.get(categoryId))
        .filter((category): category is PartnerCategory => Boolean(category));

      if (categories.length === 0) return null;

      return (
        <div
          key={`triple-${section.categoryIds.join('-')}`}
          className={`${styles.partnerTripleRow} ${animationProps.className}`}
          data-animate={animationProps['data-animate']}
          data-delay={animationProps['data-delay']}
        >
          {categories.map((category) => renderCategoryBlock(category, 'single-logo'))}
        </div>
      );
    }

    const category = categoryById.get(section.categoryId);
    if (!category) return null;

    return (
      <div key={category.id}>
        {renderCategoryBlock(category, section.layout ?? 'default', animationProps)}
      </div>
    );
  };

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
          {displaySections.map((section, index) => renderSection(section, index))}
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
