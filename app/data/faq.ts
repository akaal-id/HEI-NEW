export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Single source of truth for FAQ content.
 * The homepage shows only the first `HOMEPAGE_FAQ_LIMIT` items to keep the
 * landing page clean; the full list lives on the dedicated /faq page.
 */
export const HOMEPAGE_FAQ_LIMIT = 6;

export const faqItems: FAQItem[] = [
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
