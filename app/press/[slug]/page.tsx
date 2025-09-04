import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PressCard from "@/components/PressCard";
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
}

interface PressArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
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

async function getRandomPressArticles(currentSlug: string): Promise<PressArticle[]> {
  try {
    // Get the base URL - use environment variable or construct from request
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    if (!baseUrl) {
      // Fallback: construct URL based on environment
      if (process.env.NODE_ENV === 'production') {
        baseUrl = 'https://the2nd-hei-git-main-akaals-projects.vercel.app';
      } else {
        baseUrl = 'http://localhost:3000';
      }
    }
    
    const response = await fetch(`${baseUrl}/api/press`, {
      cache: 'no-store' // Always fetch fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch press articles');
    }
    
    const allArticles = await response.json();
    
    // Filter out current article and randomize
    const otherArticles = allArticles.filter((article: PressArticle) => article.slug !== currentSlug);
    
    // Shuffle and take first 3
    const shuffled = otherArticles.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  } catch (error) {
    console.error('Error fetching random press articles:', error);
    return [];
  }
}

export default async function PressArticlePage({ params }: PressArticlePageProps) {
  const { slug } = await params;
  const article = await getPressArticle(slug);
  const randomArticles = await getRandomPressArticles(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
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
          <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="press-content"
              dangerouslySetInnerHTML={{ __html: article.text }}
            />
          </div>

          {/* See Other Press Articles Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">See other press articles</h3>
                <Link
                  href="/press"
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center gap-1"
                >
                  back to press
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              
              {/* 3x1 Grid of Press Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {randomArticles.map((randomArticle) => (
                  <PressCard
                    key={randomArticle.id}
                    id={randomArticle.id}
                    title={randomArticle.title}
                    imageUrl={randomArticle.imageUrl}
                    timestamp={randomArticle.timestamp}
                    author={randomArticle.author}
                    slug={randomArticle.slug}
                    text={randomArticle.text}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="mt-12 pt-8 border-t border-gray-200"></div>

          {/* Share Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Share this article</h3>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                Twitter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Note: generateStaticParams removed because we're using dynamic rendering
