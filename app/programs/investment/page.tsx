import type { Metadata } from 'next';
import ProgramInvestment from '../../components/ProgramPages/ProgramInvestment';

export const metadata: Metadata = {
  title: "Investment Matchmaking | D-8 Halal Expo Indonesia 2026 - Programs",
  description: "Connect businesses seeking funding with investors looking for halal economy opportunities at D-8 Halal Expo Indonesia 2026.",
  keywords: [
    "Investment Matchmaking",
    "Halal Investment",
    "Business Funding",
    "Investment Opportunities",
    "Halal Economy Investment",
    "Sharia-Compliant Investment",
    "Investor Relations",
    "Startup Funding",
    "Halal Sector Investment",
    "Investment Partnerships"
  ],
  openGraph: {
    title: "Investment Matchmaking | D-8 Halal Expo Indonesia 2026",
    description: "Connect businesses seeking funding with investors looking for halal economy opportunities.",
    url: "https://halalexpoindonesia.com/programs/investment",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/programs/investment",
  },
};

export default function InvestmentPage() {
  return (
    <main>
      <ProgramInvestment />
    </main>
  );
}
