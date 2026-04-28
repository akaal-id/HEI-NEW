import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register | D-8 Halal Expo Indonesia 2026',
  description: 'Register as Exhibitor, Buyer, or Visitor for D-8 Halal Expo Indonesia 2026. B2B halal exhibition, Jakarta, April 2026.',
  keywords: [
    'HEI 2026 registration',
    'D-8 Halal Expo registration',
    'Halal exhibitor registration',
    'Halal buyer registration',
    'Halal visitor registration',
    'Jakarta halal expo signup',
    'B2B halal exhibition form',
    'Halal business event registration',
  ],
  openGraph: {
    title: 'Register | D-8 Halal Expo Indonesia 2026',
    description: 'Register as Exhibitor, Buyer, or Visitor for D-8 Halal Expo Indonesia 2026. B2B halal exhibition in Jakarta, April 2026.',
    url: 'https://halalexpoindonesia.com/register',
  },
  alternates: {
    canonical: 'https://halalexpoindonesia.com/register',
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
