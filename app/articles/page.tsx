import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

const ArticlesMediaPage = dynamic(() => import('../components/ArticlesMediaPage/ArticlesMediaPage'), {
  loading: () => <div style={{ minHeight: '100vh', padding: '4rem 2rem' }}>Loading articles...</div>,
});

export const metadata: Metadata = {
  title: "Articles & News | HEI 2026 - Halal Expo Indonesia",
  description: "Read the latest articles, news, and updates about Halal Expo Indonesia 2026, D-8 Halal Economy, halal industry trends, business insights, and event announcements.",
  keywords: [
    "Halal Expo Indonesia News",
    "HEI 2026 Articles",
    "Halal Industry News",
    "D-8 Halal Economy Updates",
    "Halal Business Articles",
    "Halal Export News",
    "Islamic Economy Indonesia",
    "Halal Products News",
    "Halal Certification Updates",
    "Halal Trade News"
  ],
  openGraph: {
    title: "Articles & News | HEI 2026 - Halal Expo Indonesia",
    description: "Read the latest articles, news, and updates about Halal Expo Indonesia 2026, D-8 Halal Economy, and halal industry trends.",
    url: "https://halalexpoindonesia.com/articles",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/articles",
  },
};

export default function ArticlesPage() {
  return (
    <main>
      <ArticlesMediaPage />
    </main>
  );
}
