import type { Metadata } from 'next';
import ProgramYouthEvent from '../../components/ProgramPages/ProgramYouthEvent';

export const metadata: Metadata = {
  title: "Youth Event | D-8 Halal Expo Indonesia 2026 - Programs",
  description: "Join the Youth Event at D-8 Halal Expo Indonesia 2026. Further details will be available soon.",
  keywords: [
    "Youth Event",
    "Young Professionals",
    "Halal Economy Youth",
    "Youth Leadership",
    "Next Generation",
    "Youth Engagement",
    "Student Programs",
    "Youth Development",
    "Halal Industry Youth",
    "Future Leaders"
  ],
  openGraph: {
    title: "Youth Event | D-8 Halal Expo Indonesia 2026",
    description: "Join the Youth Event at D-8 Halal Expo Indonesia 2026.",
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
