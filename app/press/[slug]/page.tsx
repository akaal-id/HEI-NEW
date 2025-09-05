"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Suspense, useState, useEffect } from "react";
import PressCard from "@/components/PressCard";
import SocialShareButtons from "../../../components/SocialShareButtons";
import PressArticleTracker from "../../../components/PressArticleTracker";
import "./press-content.css";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Loading component
function ArticleLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back button skeleton */}
        <div className="mb-8">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="mb-6">
          <div className="h-12 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Meta skeleton */}
        <div className="mb-8">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Image skeleton */}
        <div className="mb-8">
          <div className="aspect-video w-full bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

interface PressArticle {
  id: string;
  title: string;
  imageUrl: string;
  timestamp: string;
  author: string;
  text: string;
  slug: string;
  description?: string;
  category?: string;
}

interface PressArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Note: generateMetadata removed because it can't be used in client components
// Metadata will be handled dynamically in the component

// Cache for press articles
const articleCache = new Map<string, { data: PressArticle; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getPressArticle(slug: string): Promise<PressArticle | null> {
  try {
    // Check cache first
    const cached = articleCache.get(slug);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('Using cached article:', slug);
      return cached.data;
    }

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
      cache: 'force-cache', // Use cache for better performance
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch press article');
    }
    
    const data = await response.json();
    
    // Cache the result
    articleCache.set(slug, { data, timestamp: Date.now() });
    
    return data;
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
      cache: 'force-cache', // Use cache for better performance
      next: { revalidate: 300 } // Revalidate every 5 minutes
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

export default function PressArticlePage({ params }: PressArticlePageProps) {
  const [article, setArticle] = useState<PressArticle | null>(null);
  const [randomArticles, setRandomArticles] = useState<PressArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string>('');

  // Get the current URL for sharing
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    if (process.env.NODE_ENV === 'production') {
      baseUrl = 'https://the2nd-hei-git-main-akaals-projects.vercel.app';
    } else {
      baseUrl = 'http://localhost:3000';
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resolvedParams = await params;
        const currentSlug = resolvedParams.slug;
        setSlug(currentSlug);
        
        // Fetch article and random articles in parallel
        const [articleData, randomArticlesData] = await Promise.all([
          getPressArticle(currentSlug),
          getRandomPressArticles(currentSlug)
        ]);
        
        if (!articleData) {
          notFound();
        }
        
        setArticle(articleData);
        setRandomArticles(randomArticlesData);
      } catch (error) {
        console.error('Error fetching article data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [params]);

  if (loading) {
    return <ArticleLoadingSkeleton />;
  }

  if (!article) {
    notFound();
  }

  const shareUrl = `${baseUrl}/press/${slug}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Metadata */}
      <Head>
        <title>{article.title} - Halal Export Indonesia</title>
        <meta name="description" content={article.description || article.text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().substring(0, 160) + '...'} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description || article.text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().substring(0, 160) + '...'} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:site_name" content="Halal Export Indonesia" />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.timestamp} />
        <meta property="article:author" content={article.author} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description || article.text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().substring(0, 160) + '...'} />
        <meta name="twitter:image" content={article.imageUrl} />
        <meta name="twitter:creator" content="@HalalExportID" />
        <meta name="twitter:site" content="@HalalExportID" />
        <link rel="canonical" href={shareUrl} />
      </Head>

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
            <h1 className="text-4xl font-bold text-gray-800 mb-8 leading-tight">
              {article.title}
            </h1>

            {/* Featured Image */}
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
            
            {/* Article Meta - Now below the image: category - author - timestamp */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-4">
                {/* Category first */}
                {article.category && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white text-gray-800 border border-gray-200">
                    {article.category}
                  </span>
                )}
                {/* Author second */}
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
                {/* Timestamp third */}
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
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-16">
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
                    category={randomArticle.category}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="mt-12 pt-8 border-t border-gray-200"></div>

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
