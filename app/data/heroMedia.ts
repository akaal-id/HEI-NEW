type HeroContent = {
  contentKey: string;
  eyebrow: string;
  eyebrowDateTime: string;
  title: string;
  date: string;
  location: string;
  buttonLabel: string;
  buttonHref: string;
};

export type HeroMediaItem =
  | ({
      type: 'image';
      src: string;
      alt: string;
      duration?: number;
    } & HeroContent)
  | ({
      type: 'video';
      src: string;
      alt: string;
      poster?: string;
      duration?: number;
    } & HeroContent);

export const heroMedia: HeroMediaItem[] = [
  {
    type: 'image',
    src: '/hero/KV-heitalk.jpg',
    alt: 'D-8 HEI Talk Youth Session',
    duration: 12000,
    contentKey: 'hei-main',
    eyebrow: 'Join The D-8 HEI Talk',
    eyebrowDateTime: '2026-07',
    title: 'Youth Session',
    date: '01 July 2026',
    location: 'Senayan Indoor Tennis Complex, Jakarta',
    buttonLabel: 'Register Now',
    buttonHref: '/register/exhibitor'
  },
  {
    type: 'image',
    src: '/hero/KV-culfest.jpg',
    alt: 'Halal Expo Indonesia video-2',
    duration: 12000,
    contentKey: 'dhcf',
    eyebrow: 'Join & Feel The Diversity at',
    eyebrowDateTime: '2026-04',
    title: 'D-8 HEI Cultural Festival',
    date: '12 July 2026',
    location: 'Senayan Indoor Tennis Complex, Jakarta',
    buttonLabel: 'Register Your Booth Now',
    buttonHref: '#overview'
  }
];
