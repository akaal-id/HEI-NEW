export interface Partner {
  id: string;
  name: string;
  logo: string;
  alt: string;
  website?: string;
  /** Media marquee layout variant — `wide` hugs logo width with a minimum slide width. */
  logoVariant?: 'wide';
}

export interface PartnerCategory {
  id: string;
  label: string;
  partners: Partner[];
}

export type LayoutType =
  | 'default'
  | 'grid-4'
  | 'event-grid'
  | 'media-grid-5'
  | 'single-logo';

export type DisplaySection =
  | { type: 'single'; categoryId: string; layout?: LayoutType }
  | { type: 'pair'; categoryIds: [string, string]; layout?: 'default' | 'balanced' }
  | { type: 'triple'; categoryIds: [string, string, string]; layout?: 'default' | 'balanced' }
  | { type: 'quad'; categoryIds: [string, string, string, string] };

export type HotelPartnerContact = {
  id: string;
  name: string;
  logo: string;
  alt: string;
  website?: string;
  mapEmbedUrl: string;
  specialRateHref: string;
  isPlaceholder?: boolean;
  emails: string[];
  contacts: { name: string; phone: string; whatsappHref: string }[];
};

export const officialHotelPartners: HotelPartnerContact[] = [
  {
    id: 'hotel-mulia',
    name: 'Hotel Mulia',
    logo: '/partner-logo/official-hotel-partner/hotelmulia-logo.png',
    alt: 'Hotel Mulia logo',
    website: 'https://be.synxis.com/?adult=1&arrive=2026-07-08&chain=17715&child=0&currency=IDR&depart=2026-07-12&hotel=64525&level=hotel&locale=en-GB&productcurrency=IDR&rate=HALALEXPO&rooms=1',
    mapEmbedUrl:
      'https://www.google.com/maps?q=Hotel+Mulia+Jakarta+Senayan&output=embed',
    specialRateHref:
      'https://be.synxis.com/?adult=1&arrive=2026-07-08&chain=17715&child=0&currency=IDR&depart=2026-07-12&hotel=64525&level=hotel&locale=en-GB&productcurrency=IDR&rate=HALALEXPO&rooms=1',
    emails: ['reservation@hotelmulia.com', 'rohelin.purdjiati@hotelmulia.com'],
    contacts: [
      {
        name: 'Ellyn',
        phone: '+62 896-7155-6391',
        whatsappHref:
          'https://wa.me/6289671556391?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20D-8%20Halal%20Expo%20Indonesia%202026%20special%20room%20rates%20at%20Hotel%20Mulia.',
      },
    ],
  },
  {
    id: 'hotel-artotel',
    name: 'ARTOTEL Gelora Senayan Jakarta',
    logo: '/partner-logo/official-hotel-partner/artotel-logo.svg',
    alt: 'Hotel Artotel Senayan logo',
    mapEmbedUrl:
      'https://www.google.com/maps?q=Artotel+Senayan+Jakarta&output=embed',
    specialRateHref:
      'https://wa.me/628119004490?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20D-8%20Halal%20Expo%20Indonesia%202026%20special%20room%20rates%20at%20Hotel%20Artotel%20Senayan.',
    emails: ['nova@artotelgroup.com'],
    contacts: [
      {
        name: 'Nova',
        phone: '+62 811-9004-490',
        whatsappHref:
          'https://wa.me/628119004490?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20D-8%20Halal%20Expo%20Indonesia%202026%20special%20room%20rates%20at%20Hotel%20Artotel%20Senayan.',
      },
    ],
  },
];

export const HOST_CATEGORY_IDS = new Set(['official-host']);

export const STANDARD_CATEGORY_IDS = new Set([
  'strategic-partner',
  'organized-by',
  'sponsor',
  'banking-partner',
  'event-partner',
  'business-matching-platform',
  'registration-partner',
  'official-contractor-partner',
  'official-freight-forwarder-partner',
  'internet-partner',
]);

export const partnerCategories: PartnerCategory[] = [
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
    ],
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
      },
    ],
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
    ],
  },
  {
    id: 'banking-partner',
    label: 'Banking Partner',
    partners: [
      {
        id: 'bsi',
        name: 'Bank Syariah Indonesia',
        logo: '/partner-logo/banking-sponsor/bsi-logo.svg',
        alt: 'BSI - Bank Syariah Indonesia',
        website: 'https://www.bankbsi.co.id/',
      },
    ],
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
      },
    ],
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
    ],
  },
  {
    id: 'internet-partner',
    label: 'Official Internet Provider Powered by',
    partners: [
      {
        id: 'iforte',
        name: 'PT iForte Solusi Infotek',
        logo: '/partner-logo/internet-partner/Iforte.png',
        alt: 'iForte - PT iForte Solusi Infotek',
        website: 'https://www.iforte.id/',
      },
    ],
  },
  {
    id: 'official-hotel-partner',
    label: 'Hotel Partner',
    partners: officialHotelPartners.map(({ id, name, logo, alt, website }) => ({
      id,
      name,
      logo,
      alt,
      website,
    })),
  },
  {
    id: 'official-contractor-partner',
    label: 'Contractor Partner',
    partners: [
      {
        id: 'kuat',
        name: 'Kuat',
        logo: '/partner-logo/official-contractor-partner/kuat-logo.png',
        alt: 'Kuat logo',
      },
    ],
  },
  {
    id: 'official-freight-forwarder-partner',
    label: 'Freight Forwarder Partner',
    partners: [
      {
        id: 'vissasa',
        name: 'PT Vissasa Parama Ñati',
        logo: '/partner-logo/official-freight-forwarder-partner/vissasa-logo.png',
        alt: 'PT Vissasa Parama Ñati logo',
        website: 'https://vissasa.id/',
      },
    ],
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
    ],
  },
  {
    id: 'registration-partner',
    label: 'Registration Partner',
    partners: [
      {
        id: 'hegira',
        name: 'Hegira',
        logo: '/partner-logo/event-partner/hegira-logo.png',
        alt: 'Hegira logo',
        website: 'https://hegira.id/',
      },
    ],
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
      },
    ],
  },
  {
    id: 'media-partner',
    label: 'Media Partner',
    partners: [
      { id: 'katadata', name: 'Katadata', logo: '/partner-logo/media-partner/katadata-logo.png', alt: 'Katadata', website: 'https://katadata.co.id/' },
      { id: 'databoks', name: 'Databoks', logo: '/partner-logo/media-partner/databoks-logo.png', alt: 'Databoks', website: 'https://databoks.katadata.co.id/' },
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
      // { id: 'info-filantropi', name: 'Info Filantropi', logo: '/partner-logo/media-partner/infofilantropi-logo.png', alt: 'Info Filantropi' },
      { id: 'oumma', name: 'Oumma', logo: '/partner-logo/media-partner/oumma-logo.png', alt: 'Oumma' },
      { id: 'halal-expo-turki', name: 'Halal Expo Turki', logo: '/partner-logo/media-partner/halal-expo-turki-logo.png', alt: 'Halal Expo Turki' },
      { id: 'b-universe', name: 'B Universe', logo: '/partner-logo/media-partner/b-universe-logo.png', alt: 'B Universe', logoVariant: 'wide' },
      { id: 'btv', name: 'BTV', logo: '/partner-logo/media-partner/btv-logo.png', alt: 'BTV' },
      { id: 'berita-satu', name: 'Berita Satu', logo: '/partner-logo/media-partner/berita-satu-logo.png', alt: 'Berita Satu' },
      { id: 'beritasatu-com', name: 'BeritaSatu.com', logo: '/partner-logo/media-partner/beritasatu-com-logo.png', alt: 'BeritaSatu.com', website: 'https://www.beritasatu.com/' },
      { id: 'investor-daily-indonesia', name: 'Investor Daily Indonesia', logo: '/partner-logo/media-partner/investor-daily-indonesia-logo.png', alt: 'Investor Daily Indonesia' },
      { id: 'investor-id', name: 'Investor.id', logo: '/partner-logo/media-partner/investor-id-logo.png', alt: 'Investor.id', website: 'https://investor.id/' },
      { id: 'jakarta-globe-id', name: 'Jakarta Globe.id', logo: '/partner-logo/media-partner/jakarta-globe-id-logo.png', alt: 'Jakarta Globe.id', website: 'https://jakartaglobe.id/' },
      { id: 'jakarta-weekly', name: 'Jakarta Weekly', logo: '/partner-logo/media-partner/jakarta-weekly-logo.png', alt: 'Jakarta Weekly' },
      { id: 'hello-digital-today', name: 'Hello Digital Today', logo: '/partner-logo/media-partner/hello-digital-today-logo.png', alt: 'Hello Digital Today (Narayaone)' },
      { id: 'madani-news', name: 'Madani News', logo: '/partner-logo/media-partner/madani-news-logo.png', alt: 'Madani News' },
      { id: 'top-business', name: 'Top Business', logo: '/partner-logo/media-partner/top-business-logo.png', alt: 'Top Business' },
      { id: 'gac-media', name: 'GAC Media', logo: '/partner-logo/media-partner/gac-media-logo.png', alt: 'GAC Media' },
      { id: 'modestalk', name: 'Modestalk', logo: '/partner-logo/media-partner/modestalk-logo.png', alt: 'Modestalk' },
    ],
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
      },
    ],
  },
];

const hiddenCategoryIds = new Set(['promotion-partner']);

export const categoryById = new Map(
  partnerCategories
    .filter((category) => !hiddenCategoryIds.has(category.id))
    .map((category) => [category.id, category])
);

const supportPartnerIds = [
  'business-matching-platform',
  'registration-partner',
  'official-contractor-partner',
  'official-freight-forwarder-partner',
] as const;

export const homeDisplaySections: DisplaySection[] = [
  { type: 'single', categoryId: 'event-partner', layout: 'event-grid' },
  { type: 'quad', categoryIds: [...supportPartnerIds] },
  { type: 'single', categoryId: 'community-partner', layout: 'default' },
  { type: 'single', categoryId: 'internet-partner', layout: 'single-logo' },
  { type: 'single', categoryId: 'media-partner', layout: 'media-grid-5' },
];

export const partnersPageDisplaySections: DisplaySection[] = [
  { type: 'single', categoryId: 'official-host', layout: 'default' },
  { type: 'single', categoryId: 'strategic-partner', layout: 'grid-4' },
  { type: 'triple', categoryIds: ['organized-by', 'sponsor', 'banking-partner'], layout: 'balanced' },
  { type: 'single', categoryId: 'event-partner', layout: 'event-grid' },
  { type: 'quad', categoryIds: [...supportPartnerIds] },
  { type: 'single', categoryId: 'community-partner', layout: 'default' },
  { type: 'single', categoryId: 'internet-partner', layout: 'single-logo' },
  { type: 'single', categoryId: 'media-partner', layout: 'media-grid-5' },
];

/** @deprecated Use homeDisplaySections or partnersPageDisplaySections */
export const displaySections = homeDisplaySections;

export const sneakPeekSections: DisplaySection[] = [
  { type: 'single', categoryId: 'official-host', layout: 'default' },
  { type: 'single', categoryId: 'strategic-partner', layout: 'grid-4' },
  { type: 'triple', categoryIds: ['organized-by', 'sponsor', 'banking-partner'], layout: 'balanced' },
];

export function getPartnerCardTier(categoryId: string): 'host' | 'standard' | 'media' {
  if (categoryId === 'media-partner') return 'media';
  if (HOST_CATEGORY_IDS.has(categoryId)) return 'host';
  return 'standard';
}
