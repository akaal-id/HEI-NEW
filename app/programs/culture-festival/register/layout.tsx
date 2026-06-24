import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cultural Festival Registration | D-8 HEI 2026',
  description:
    'Register as an exhibitor for D-8 HEI Cultural Festival 2026 in Jakarta. Join the cultural celebration of worldwide nations.',
  keywords: [
    'cultural festival registration',
    'D-8 HEI CulFest registration',
    'CulFest exhibitor registration',
    'Jakarta cultural festival 2026',
    'D-8 cultural festival signup',
  ],
};

export default function CulFestRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
