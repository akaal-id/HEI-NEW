import type { Metadata } from 'next';
import Header from './header/header';
import Organization from './organization/organization';
import Summit from './summit/summit';
import Cta from './cta/cta';

export const metadata: Metadata = {
  title: "D-8 Organization for Economic Cooperation | About HEI 2026",
  description: "Learn about the D-8 Organization for Economic Cooperation, an international economic forum comprising Bangladesh, Egypt, Indonesia, Iran, Malaysia, Nigeria, Pakistan, and Türkiye, with Azerbaijan joining in 2025.",
  keywords: [
    "D-8 Organization",
    "Developing-8",
    "D-8 Member States",
    "Economic Cooperation",
    "D-8 Summit",
    "Istanbul Declaration",
    "Secretary General D-8",
    "D-8 Secretariat",
    "International Economic Forum",
    "Halal Economy D-8"
  ],
  openGraph: {
    title: "D-8 Organization for Economic Cooperation | About HEI 2026",
    description: "Learn about the D-8 Organization for Economic Cooperation and its role in strengthening member states' positions in the global economy.",
    url: "https://halalexpoindonesia.com/about/d8-organization",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/about/d8-organization",
  },
};

export default function D8OrganizationPage() {
  return (
    <main>
      <Header />
      <Organization />
      <Summit />
      <Cta />
    </main>
  );
}
