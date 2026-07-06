import {
  Mic2,
  Palette,
  ShoppingBag,
  Store,
  Users,
  type LucideIcon,
} from 'lucide-react';

/** External HEI Talk registration site. */
export const HEI_TALK_REGISTRATION_URL = 'https://talk.halalexpoindonesia.com';

/** Set to true when the HEI Talk registration URL is ready. */
export const HEI_TALK_REGISTRATION_ENABLED = true;

export type RegisterOption = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  disabled?: boolean;
};

export type RegisterSection = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  variant: 'main' | 'culfest';
  options: RegisterOption[];
};

export const REGISTER_SECTIONS: RegisterSection[] = [
  {
    id: 'visitor',
    eyebrow: 'Visitor Registration',
    title: 'GET YOUR FREE TICKET',
    subtitle: 'D-8 Halal Expo Indonesia 2026 · Jakarta · July 2026',
    variant: 'main',
    options: [
      {
        href: '/register/visitor',
        label: 'Register as Visitor',
        description: 'Explore the exhibition, sessions, and programs.',
        icon: Users,
      },
    ],
  },
  {
    id: 'main',
    eyebrow: 'Main Event',
    title: 'D-8 Halal Expo Indonesia 2026',
    subtitle: 'Jakarta · July 2026',
    variant: 'main',
    options: [
      {
        href: '/register/exhibitor',
        label: 'Register as Exhibitor',
        description: 'Showcase halal products and connect with global buyers.',
        icon: Store,
      },
      {
        href: '/register/buyer',
        label: 'Register as Buyer',
        description: 'Source certified products and join business matching.',
        icon: ShoppingBag,
      },
    ],
  },
  {
    id: 'hei-talk',
    eyebrow: 'Conference Program',
    title: 'D-8 HEI Talk',
    subtitle: 'Jakarta · July 2026',
    variant: 'main',
    options: [
      {
        href: HEI_TALK_REGISTRATION_ENABLED ? HEI_TALK_REGISTRATION_URL : '',
        label: 'Reserve Your Seat',
        description: 'Register for expert-led sessions and panel discussions.',
        icon: Mic2,
        disabled: !HEI_TALK_REGISTRATION_ENABLED,
      },
    ],
  },
  {
    id: 'culfest',
    eyebrow: 'Cultural Program',
    title: 'D-8 HEI Cultural Festival 2026',
    subtitle: 'Jakarta · July 2026',
    variant: 'culfest',
    options: [
      {
        href: '/programs/culture-festival/register/exhibitor',
        label: 'Book Your Space',
        description: 'Reserve a booth for cultural products and heritage offerings.',
        icon: Palette,
      },
    ],
  },
];
