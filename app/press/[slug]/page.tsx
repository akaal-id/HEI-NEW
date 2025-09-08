import { notFound } from "next/navigation";
import PressArticleClient from "./PressArticleClient";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface PressArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PressArticlePageProps): Promise<any> {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    // Get the base URL
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      if (process.env.NODE_ENV === 'production') {
        baseUrl = 'https://www.halalexpoindonesia.com';
      } else {
        baseUrl = 'http://localhost:3000';
      }
    }
    
    const response = await fetch(`${baseUrl}/api/press/${slug}`, {
      cache: 'force-cache',
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      return {
        title: 'Article Not Found - Halal Expo Indonesia',
        description: 'The requested article could not be found.',
      };
    }
    
    const article = await response.json();
    const shareUrl = `${baseUrl}/press/${slug}`;
    const description = article.description || article.text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().substring(0, 160) + '...';
    
    return {
      title: `${article.title} - Halal Expo Indonesia`,
      description: description,
      keywords: [
        'halal expo indonesia',
        'halal industry news',
        'halal trade',
        'halal exhibition',
        article.category || 'press release',
        'indonesia halal'
      ],
      openGraph: {
        title: article.title,
        description: description,
        url: shareUrl,
        siteName: 'Halal Expo Indonesia',
        images: [
          {
            url: article.imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          }
        ],
        type: 'article',
        publishedTime: article.timestamp,
        authors: [article.author],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: description,
        images: [article.imageUrl],
        creator: '@halalexpoindonesia',
        site: '@halalexpoindonesia',
      },
      alternates: {
        canonical: shareUrl,
      },
      other: {
        'article:published_time': article.timestamp,
        'article:author': article.author,
        'article:section': article.category || 'Press Release',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Article - Halal Expo Indonesia',
      description: 'Read the latest news and updates from Halal Expo Indonesia.',
    };
  }
}

export default function PressArticlePage({ params }: PressArticlePageProps) {
  return <PressArticleClient params={params} />;
}