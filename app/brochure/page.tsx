import type { Metadata } from 'next';
import BrochureSection from '../components/BrochureSection/BrochureSection';

export const metadata: Metadata = {
  title: 'Official Brochure 2027 | D-8 Halal Expo Indonesia',
  description:
    'Download the official D-8 Halal Expo Indonesia 2027 brochure for program, partnership, venue, and event information.',
  alternates: {
    canonical: 'https://halalexpoindonesia.com/brochure',
  },
  openGraph: {
    title: 'Official Brochure 2027 | D-8 Halal Expo Indonesia',
    description:
      'Access the official D-8 Halal Expo Indonesia 2027 brochure and explore the complete event information.',
    url: 'https://halalexpoindonesia.com/brochure',
    type: 'website',
  },
};

export default function BrochurePage() {
  return (
    <main>
      <BrochureSection headingLevel="h1" />
    </main>
  );
}
