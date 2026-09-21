export const integratedPrograms = [
  {
    number: '01',
    title: 'Global Exhibition',
    description: '150+ booths and 9 national pavilions.',
  },
  {
    number: '02',
    title: 'Business Matching',
    description: 'Connecting exhibitors with qualified procurement partners.',
  },
  {
    number: '03',
    title: 'D-8 HEI Talk',
    description: 'Business sessions led by credible industry speakers.',
  },
  {
    number: '04',
    title: 'Networking Dinner',
    description: 'An intimate gathering for stakeholders and decision-makers.',
  },
  {
    number: '05',
    title: 'Investment Matchmaking',
    description: 'Strategic meetings between halal businesses and investors.',
  },
  {
    number: '06',
    title: 'Youth Program',
    description: 'Empowering young entrepreneurs through industry integration.',
  },
] as const;

export const milestones = [
  {
    year: '2018',
    date: '21-23 Sep 2018',
    venue: 'Jakarta Convention Center',
    highlights: ['100+ Exhibitors', '5,000+ Visitors'],
  },
  {
    year: '2019',
    date: '2-4 Aug 2019',
    venue: 'ICE BSD',
    highlights: ['248+ Exhibitors', '28,000+ Visitors'],
  },
  {
    year: '2023',
    date: '25-28 Oct 2023',
    venue: 'Jakarta Convention Center',
    highlights: ['100+ Exhibitors', '12,000+ Visitors · 22 Countries'],
  },
  {
    year: '2024',
    date: '9-12 Oct 2024',
    venue: 'ICE BSD',
    highlights: ['72+ Exhibitors · 12 Countries', '41,488+ Visitors · 140 Countries'],
  },
  {
    year: '2025',
    date: '15-19 Oct 2025',
    venue: 'ICE BSD',
    highlights: ['70+ Exhibition Booths', '35,550+ Visitors · 130 Countries'],
  },
  {
    year: '2026',
    date: '8-12 Jul 2026',
    venue: 'Senayan Tennis Indoor Complex',
    highlights: ['96+ Exhibition Booths', '5,000+ Visitors · 16 Countries'],
  },
] as const;

export const industrySectors = [
  'Halal Food, Ingredients & Raw Materials',
  'Digital Solutions for Halal Lifestyle',
  'Certification & Professional Training',
  'Islamic Finance',
  'Halal Pharmacy & Healthcare',
  'Halal Logistics & Industrial Estate',
  'Muslim Fashion',
  'Halal Cosmetics',
] as const;

export const impactMetrics = [
  { value: '29', label: 'Business Matching Sessions' },
  { value: '179', label: 'Participating Buyers' },
  { value: '9', label: 'Participating Countries' },
  { value: '35', label: 'Business Meetings' },
] as const;

export const dealOutcomes = [
  {
    facilitator: 'DEKS BI',
    items: [
      { label: 'Letter of Intent', value: 'US$175,959' },
      { label: 'Purchase Order', value: 'US$2,356' },
      { label: 'Memorandum of Understanding', value: 'US$1,000,000' },
    ],
  },
  {
    facilitator: 'KPMI',
    items: [
      { label: 'Letter of Intent', value: 'US$2,000,000' },
      { label: 'Purchase Order', value: 'US$22,600' },
    ],
  },
  {
    facilitator: 'KADIN & KBRI Islamabad',
    items: [{ label: 'Memorandum of Understanding', value: 'US$10,000,000' }],
  },
] as const;

export const participatingCountries = [
  'Indonesia',
  'Iran',
  'Bangladesh',
  'Nigeria',
  'Pakistan',
  'Russia',
  'Djibouti',
  'Türkiye',
  'United States',
] as const;

export const visitorProfiles = [
  'Business Owners & Entrepreneurs',
  'Suppliers & Distributors',
  'Retailers & Wholesalers',
  'Consumers',
  'Industry Experts & Consultants',
  'Government Representatives',
  'Media & Influencers',
  'Researchers & Academics',
] as const;

export const boothEntitlements = [
  'Standard booth partition',
  'Fascia name board',
  'Power electricity',
  'Fluorescent light',
  'Carpeting',
  '2 chairs and 1 table',
] as const;

export const exhibitionPrices = [
  { market: 'Domestic', price: 'Rp4,500,000', unit: '/ m²' },
  { market: 'International', price: 'US$450', unit: '/ m²' },
] as const;
