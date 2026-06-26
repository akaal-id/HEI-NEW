export const SALUTATIONS = [
  { value: 'Mr', label: 'Mr' },
  { value: 'Ms', label: 'Ms' },
  { value: 'Mrs', label: 'Mrs' },
  { value: 'Dr', label: 'Dr' },
];

export const COUNTRY_CODES = [
  { value: '+62', label: 'Indonesia (+62)' },
  { value: '+60', label: 'Malaysia (+60)' },
  { value: '+65', label: 'Singapore (+65)' },
  { value: '+66', label: 'Thailand (+66)' },
  { value: '+84', label: 'Vietnam (+84)' },
  { value: '+63', label: 'Philippines (+63)' },
  { value: '+44', label: 'United Kingdom (+44)' },
  { value: '+1', label: 'USA/Canada (+1)' },
  { value: '+61', label: 'Australia (+61)' },
  { value: '+81', label: 'Japan (+81)' },
  { value: '+82', label: 'South Korea (+82)' },
  { value: '+86', label: 'China (+86)' },
  { value: '+91', label: 'India (+91)' },
  { value: '+90', label: 'Türkiye (+90)' },
  { value: '+98', label: 'Iran (+98)' },
  { value: '+20', label: 'Egypt (+20)' },
  { value: '+880', label: 'Bangladesh (+880)' },
  { value: '+92', label: 'Pakistan (+92)' },
  { value: '+234', label: 'Nigeria (+234)' },
  { value: '+994', label: 'Azerbaijan (+994)' },
  { value: '+971', label: 'UAE (+971)' },
  { value: '+966', label: 'Saudi Arabia (+966)' },
  { value: '+49', label: 'Germany (+49)' },
  { value: '+33', label: 'France (+33)' },
  { value: '+31', label: 'Netherlands (+31)' },
  { value: '+39', label: 'Italy (+39)' },
  { value: '+34', label: 'Spain (+34)' },
  { value: '+48', label: 'Poland (+48)' },
  { value: '+7', label: 'Russia (+7)' },
  { value: '+27', label: 'South Africa (+27)' },
  { value: '+55', label: 'Brazil (+55)' },
  { value: '+52', label: 'Mexico (+52)' },
  { value: '+64', label: 'New Zealand (+64)' },
  { value: '+other', label: 'Other' },
];

export const COUNTRIES = [
  'Indonesia', 'Malaysia', 'Singapore', 'Thailand', 'Vietnam', 'Philippines', 'Japan', 'South Korea', 'China', 'India',
  'Bangladesh', 'Pakistan', 'Iran', 'Türkiye', 'Egypt', 'Nigeria', 'Azerbaijan', 'Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Jordan', 'Lebanon',
  'United Kingdom', 'Germany', 'France', 'Netherlands', 'Italy', 'Spain', 'Poland', 'Russia', 'Switzerland', 'Austria', 'Belgium', 'Sweden', 'Norway', 'Denmark', 'Finland',
  'United States', 'Canada', 'Australia', 'New Zealand', 'South Africa', 'Brazil', 'Mexico', 'Argentina', 'Chile', 'Colombia',
  'Other',
].map((c) => ({ value: c, label: c }));

export const JOB_TITLES = [
  { value: 'CEO', label: 'CEO' },
  { value: 'Director', label: 'Director' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Head of Business', label: 'Head of Business' },
  { value: 'Purchasing Manager', label: 'Purchasing Manager' },
  { value: 'Export Manager', label: 'Export Manager' },
  { value: 'Marketing Manager', label: 'Marketing Manager' },
  { value: 'Business Development', label: 'Business Development' },
  { value: 'Owner', label: 'Owner' },
  { value: 'Founder', label: 'Founder' },
  { value: 'Other', label: 'Other' },
];

export const BUSINESS_CATEGORIES = [
  { value: 'food-beverage', label: 'Food & Beverage' },
  { value: 'cosmetics', label: 'Cosmetics' },
  { value: 'finance', label: 'Finance' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'pharmaceutical', label: 'Pharmaceutical' },
  { value: 'tourism', label: 'Tourism & Hospitality' },
  { value: 'logistics', label: 'Logistics & Supply Chain' },
  { value: 'technology', label: 'Technology' },
  { value: 'agriculture', label: 'Agriculture & Agribusiness' },
  { value: 'retail', label: 'Retail' },
  { value: 'other', label: 'Other' },
];

export const MARKET_SECTORS = [
  { value: 'B2B', label: 'B2B' },
  { value: 'B2C', label: 'B2C' },
  { value: 'Government', label: 'Government' },
  { value: 'B2B2C', label: 'B2B2C' },
  { value: 'other', label: 'Other' },
];

export const BUYER_REGISTRATION_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfg5l09MCg9gVjnCl_hUDEycCuT8WUEvQDIRq5MLB484S-2-w/viewform?usp=pp_url&entry.269312168=a&entry.1991638139=a&entry.1934559686=a&entry.285454750=a&entry.933067454=a&entry.1465173196=a&entry.1707425376=a&entry.1689011549=a&entry.1384552284=a';

export const BUYER_REGISTRATION_FORM_RESPONSE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfg5l09MCg9gVjnCl_hUDEycCuT8WUEvQDIRq5MLB484S-2-w/formResponse';

export const BUYER_SECTOR_INTERESTS = [
  { value: 'Halal Food, Beverage & Agribusiness', label: 'Halal Food, Beverage & Agribusiness' },
  { value: 'Halal Lifestyle, Consumer Goods & Creative Economy', label: 'Halal Lifestyle, Consumer Goods & Creative Economy' },
  { value: 'Halal Manufacturing, Industrial Services & Supply Chain', label: 'Halal Manufacturing, Industrial Services & Supply Chain' },
  { value: 'Halal Technology, Digital Solutions & Innovation', label: 'Halal Technology, Digital Solutions & Innovation' },
  { value: 'Islamic Finance, Investment & Halal Fintech', label: 'Islamic Finance, Investment & Halal Fintech' },
  { value: 'Trade, Export & International Pavilions', label: 'Trade, Export & International Pavilions' },
  { value: 'Halal Certification, Standards & Regulatory Bodies', label: 'Halal Certification, Standards & Regulatory Bodies' },
  { value: 'Islamic Education, Research & Innovation Institutions', label: 'Islamic Education, Research & Innovation Institutions' },
  { value: 'Halal Tourism, Hospitality & Muslim-Friendly Services', label: 'Halal Tourism, Hospitality & Muslim-Friendly Services' },
  { value: 'Social & Sustainable Halal Economy', label: 'Social & Sustainable Halal Economy' },
  { value: 'Other', label: 'Other' },
];

export const GENDERS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
  { value: 'Other', label: 'Other' },
];

export const SOURCE_OF_INFO = [
  { value: 'social-media', label: 'Social Media' },
  { value: 'email', label: 'Email' },
  { value: 'website', label: 'Website' },
  { value: 'brochure', label: 'Brochure' },
  { value: 'government', label: 'Government Institution' },
  { value: 'other', label: 'Other' },
];

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const OTHER_OPTION_VALUES = ['other', 'Other', '+other'] as const;

export function isOtherOption(value: string): boolean {
  return (OTHER_OPTION_VALUES as readonly string[]).includes(value);
}

/** When "Other" is selected, submit the custom text to the same field/column. */
export function resolveOtherFieldValue(selected: string, otherText: string): string {
  return isOtherOption(selected) ? otherText.trim() : selected;
}
