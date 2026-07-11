import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OTS Registration | HEI 2026',
  description: 'On-the-spot visitor registration for D-8 Halal Expo Indonesia 2026 staff.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function OtsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
