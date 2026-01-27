import type { Metadata } from 'next';
import AboutOrganizerPage from '../../components/AboutSection/AboutOrganizerPage';

export const metadata: Metadata = {
  title: "Skyconnection - Official Organizer | About HEI 2026",
  description: "Learn about Skyconnection, the official organizer of D-8 Halal Expo Indonesia 2026. A leading event management and business development company specializing in impactful international events.",
  keywords: [
    "Skyconnection",
    "Event Organizer",
    "HEI 2026 Organizer",
    "Event Management Company",
    "Business Development",
    "Halal Economy Events",
    "International Trade Events",
    "MICE Services",
    "Event Planning Indonesia",
    "Business Facilitation"
  ],
  openGraph: {
    title: "Skyconnection - Official Organizer | About HEI 2026",
    description: "Learn about Skyconnection, the official organizer of D-8 Halal Expo Indonesia 2026.",
    url: "https://halalexpoindonesia.com/about/organizer",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/about/organizer",
  },
};

export default function OrganizerPage() {
  return (
    <main>
      <AboutOrganizerPage />
    </main>
  );
}
