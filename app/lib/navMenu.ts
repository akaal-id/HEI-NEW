export interface NavMenuLink {
  key: string;
  label: string;
  href: string;
  /** Shown in the navbar at all. */
  visible: boolean;
  /** Clickable/navigable. When false but visible, renders as a muted "Coming Soon" item. */
  enabled: boolean;
}

export interface NavMenuItem extends NavMenuLink {
  children?: NavMenuLink[];
}

/** Mirrors the navbar's real routes — matches the live Navbar.tsx structure. */
export const DEFAULT_NAV_MENU: NavMenuItem[] = [
  {
    key: 'home',
    label: 'Home',
    href: '/',
    visible: true,
    enabled: true,
  },
  {
    key: 'about',
    label: 'About Us',
    href: '/about',
    visible: true,
    enabled: true,
    children: [
      {
        key: 'about-d8-summit',
        label: 'About D-8 Summit',
        href: '/about/d8-organization',
        visible: true,
        enabled: true,
      },
      {
        key: 'about-d8-hei-2026',
        label: 'About D-8 HEI 2026',
        href: '/about/d8-expo',
        visible: true,
        enabled: true,
      },
      {
        key: 'about-organizer',
        label: 'About Organizer',
        href: '/about/organizer',
        visible: true,
        enabled: true,
      },
    ],
  },
  {
    key: 'programs',
    label: 'Our Programs',
    href: '/programs',
    visible: true,
    enabled: true,
    children: [
      {
        key: 'programs-exhibition',
        label: 'Exhibition',
        href: '/programs/exhibition',
        visible: true,
        enabled: true,
      },
      {
        key: 'programs-business-matching',
        label: 'Business Matching',
        href: 'https://business.halalexpoindonesia.com',
        visible: true,
        enabled: true,
      },
      {
        key: 'programs-hei-talk',
        label: 'D-8 HEI Talk',
        href: '/programs/hei-talk',
        visible: true,
        enabled: true,
      },
      {
        key: 'programs-culture-festival',
        label: 'D-8 HEI Cultural Fest',
        href: '/programs/culture-festival',
        visible: true,
        enabled: true,
      },
    ],
  },
  {
    key: 'partners',
    label: 'Our Partner',
    href: '/partners',
    visible: true,
    enabled: true,
  },
  {
    key: 'articles',
    label: 'Article & Media',
    href: '/articles',
    visible: true,
    enabled: true,
  },
];
