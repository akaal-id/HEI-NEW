"use client";
import { memo, useMemo } from "react";
import PressCard from "./PressCard";

interface PressArticle {
  id: string;
  title: string;
  imageUrl: string;
  timestamp: string;
  author: string;
  slug: string;
  text?: string;
}

interface VirtualizedGridProps {
  articles: PressArticle[];
  loading?: boolean;
  itemsPerPage?: number;
  currentPage?: number;
}

const VirtualizedGrid = memo(function VirtualizedGrid({ 
  articles, 
  loading = false, 
  itemsPerPage = 8,
  currentPage = 1
}: VirtualizedGridProps) {
  // Calculate visible articles for current page
  const visibleArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return articles.slice(startIndex, endIndex);
  }, [articles, currentPage, itemsPerPage]);

  // Skeleton loader component
  const SkeletonCard = memo(() => (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm h-80 animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  ));

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: itemsPerPage }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {visibleArticles.map((article, index) => (
        <PressCard
          key={article.id}
          id={article.id}
          title={article.title}
          imageUrl={article.imageUrl}
          timestamp={article.timestamp}
          author={article.author}
          slug={article.slug}
          text={article.text}
          priority={index < 4} // Prioritize first 4 images
        />
      ))}
    </div>
  );
});

export default VirtualizedGrid;
