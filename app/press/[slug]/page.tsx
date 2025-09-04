import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import SocialShareButtons from "../../../components/SocialShareButtons";
import PressArticleTracker from "../../../components/PressArticleTracker";
import "./press-content.css";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface PressArticle {
  id: string;
  title: string;
  imageUrl: string;
  timestamp: string;
  author: string;
  text: string;
  slug: string;
  description?: string;
}

interface PressArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for each article
export async function generateMetadata({ params }: PressArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPressArticle(slug);

  if (!article) {
    return {
      title: 'Article Not Found - Halal Export Indonesia',
      description: 'The requested article could not be found.',
    };
  }

  // Get the current URL for sharing
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    if (process.env.NODE_ENV === 'production') {
      baseUrl = 'https://the2nd-hei-git-main-akaals-projects.vercel.app';
    } else {
      baseUrl = 'http://localhost:3000';
    }
  }
  const shareUrl = `${baseUrl}/press/${slug}`;

  // Use description from API or generate from text
  const description = article.description || article.text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
    .substring(0, 160) + '...';

  return {
    title: `${article.title} - Halal Export Indonesia`,
    description: description,
    openGraph: {
      title: article.title,
      description: description,
      url: shareUrl,
      siteName: 'Halal Export Indonesia',
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: article.timestamp,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: description,
      images: [article.imageUrl],
      creator: '@HalalExportID',
      site: '@HalalExportID',
    },
    alternates: {
      canonical: shareUrl,
    },
  };
}

async function getPressArticle(slug: string): Promise<PressArticle | null> {
  try {
    // Get the base URL - use environment variable or construct from request
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    if (!baseUrl) {
      // Fallback: construct URL based on environment
      if (process.env.NODE_ENV === 'production') {
        // In production, we need to use the actual domain
        // This will be set by your deployment platform
        baseUrl = 'https://the2nd-hei-git-main-akaals-projects.vercel.app';
      } else {
        baseUrl = 'http://localhost:3000';
      }
    }
    
    const response = await fetch(`${baseUrl}/api/press/${slug}`, {
      cache: 'no-store' // Always fetch fresh data
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch press article');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching press article:', error);
    return null;
  }
}

export default async function PressArticlePage({ params }: PressArticlePageProps) {
  const { slug } = await params;
  const article = await getPressArticle(slug);

  if (!article) {
    notFound();
  }

  // Get the current URL for sharing
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    if (process.env.NODE_ENV === 'production') {
      baseUrl = 'https://the2nd-hei-git-main-akaals-projects.vercel.app';
    } else {
      baseUrl = 'http://localhost:3000';
    }
  }
  const shareUrl = `${baseUrl}/press/${slug}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Track article view */}
      <PressArticleTracker articleTitle={article.title} articleSlug={article.slug} />
      
      {/* Main Content */}
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Back Button */}
          <Link 
            href="/press" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors mb-8"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Press
          </Link>

          {/* Article Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
              {article.title}
            </h1>
            
            {/* Article Meta */}
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>By {article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{article.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-16">
            <div 
              className="press-content"
              dangerouslySetInnerHTML={{ __html: article.text }}
            />
          </div>

          {/* Share Section */}
          <SocialShareButtons 
            title={article.title}
            url={shareUrl}
            description={article.description || "Check out this article from Halal Export Indonesia"}
            articleContent={article.text}
            imageUrl={article.imageUrl}
          />
        </div>
      </div>
    </div>
  );
}

// Note: generateStaticParams removed because we're using dynamic rendering
