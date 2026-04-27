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
    type: 'video',
    src: '/video/Final A-final.mp4',
    alt: 'Halal Expo Indonesia video',
    duration: 12000,
    contentKey: 'hei-main',
    eyebrow: 'Welcome to The 6th HEI',
    eyebrowDateTime: '2026-04',
    title: 'D-8 Halal Expo Indonesia',
    date: '08 - 12 July 2026',
    location: 'Senayan Indoor Tennis Complex, Jakarta',
    buttonLabel: 'Book Space Now',
    buttonHref: '/register/exhibitor'
  },
  {
    type: 'video',
    src: '/video/export-video-1.mp4',
    alt: 'Halal Expo Indonesia video-2',
    duration: 5000,
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
