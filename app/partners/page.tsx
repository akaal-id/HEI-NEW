import PartnerSection from '../components/PartnerSection/PartnerSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Partners & Sponsors | HEI 2026 - Halal Expo Indonesia",
  description: "Meet our partners and sponsors supporting the 6th Halal Expo Indonesia 2026. Discover leading organizations, companies, and institutions collaborating to strengthen the D-8 halal economy.",
  keywords: [
    "HEI 2026 Partners",
    "Halal Expo Sponsors",
    "Halal Industry Partners",
    "D-8 Summit Sponsors",
    "Halal Business Partners",
    "Halal Export Partners",
    "Islamic Economy Sponsors",
    "Halal Certification Partners",
    "Halal Trade Partners",
    "Halal Event Sponsors"
  ],
  openGraph: {
    title: "Partners & Sponsors | HEI 2026 - Halal Expo Indonesia",
    description: "Meet our partners and sponsors supporting the 6th Halal Expo Indonesia 2026 and D-8 halal economy.",
    url: "https://halalexpoindonesia.com/partners",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/partners",
  },
};

export default function PartnersPage() {
  return (
    <main>
      <PartnerSection />
    </main>
  );
}
