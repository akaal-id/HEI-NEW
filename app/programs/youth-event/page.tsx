import type { Metadata } from 'next';
import ProgramYouthEvent from '../../components/ProgramPages/ProgramYouthEvent';

export const metadata: Metadata = {
  title: "D-8 HEI Youth | D-8 Halal Expo Indonesia 2026 - Programs",
  description: "D-8 HEI Youth at D-8 Halal Expo Indonesia 2026: Young Entrepreneur Meetup and Young Entrepreneur Panel Discussion for halal and creative economy startups.",
  keywords: [
    "D-8 HEI Youth",
    "Young Entrepreneur Meetup",
    "Young Entrepreneur Panel",
    "Halal Economy Youth",
    "Youth Leadership",
    "Sharia-based Startups",
    "Youth Engagement",
    "Halal Industry Youth",
    "Creative Economy",
    "Future Leaders"
  ],
  openGraph: {
    title: "D-8 HEI Youth | D-8 Halal Expo Indonesia 2026",
    description: "D-8 HEI Youth: Young Entrepreneur Meetup and Panel Discussion for halal and creative economy startups.",
    url: "https://halalexpoindonesia.com/programs/youth-event",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/programs/youth-event",
  },
};

export default function YouthEventPage() {
  return (
    <main>
      <ProgramYouthEvent />
    </main>
  );
}
