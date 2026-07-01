'use client';

import { useEffect, useState } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './RelatedArticles.module.css';

interface Article {
  id: string;
  slug: string;
  category: string;
  image: string;
  author: string;
  date: string;
  title: string;
  description: string;
}

interface RelatedArticlesProps {
  currentArticleId: string;
  currentCategory?: string;
  limit?: number;
}

export default function RelatedArticles({ 
  currentArticleId, 
  currentCategory,
  limit = 3 
}: RelatedArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sectionRef] = useIntersectionObserver({ threshold: 0.1 });
  const [gridRef, isGridVisible] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    async function fetchRelatedArticles() {
      try {
        const response = await fetch('/api/articles', {
          cache: 'no-store'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const allArticles: Article[] = await response.json();
        
        // Filter out current article - check both ID and slug
        let relatedArticles = allArticles.filter(article => {
          // Exclude if ID matches OR slug matches
          const isCurrentArticle = 
            (article.id && article.id === currentArticleId) ||
            (article.slug && article.slug === currentArticleId) ||
            (article.id === currentArticleId) ||
            (article.slug === currentArticleId);
          
          // Also exclude if slug is invalid
          return !isCurrentArticle && article.slug && article.slug !== 'undefined';
        });

        // If category is provided, prioritize same category
        if (currentCategory) {
          const sameCategory = relatedArticles.filter(
            article => article.category === currentCategory
          );
          const otherCategory = relatedArticles.filter(
            article => article.category !== currentCategory
          );
          relatedArticles = [...sameCategory, ...otherCategory];
        }

        // Sort by date and take the limit
        const sortedArticles = relatedArticles
          .sort((a, b) => {
            const dateA = new Date(a.date || '').getTime();
            const dateB = new Date(b.date || '').getTime();
            if (isNaN(dateA) && isNaN(dateB)) return 0;
            if (isNaN(dateA)) return 1;
            if (isNaN(dateB)) return -1;
            return dateB - dateA;
          })
          .slice(0, limit);

        console.log('[RelatedArticles] Found related articles:', sortedArticles.length, {
          currentArticleId,
          currentCategory,
          totalArticles: allArticles.length,
          filteredArticles: relatedArticles.length,
          finalArticles: sortedArticles.length
        });

        setArticles(sortedArticles);
      } catch (error) {
        console.error('Error fetching related articles:', error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRelatedArticles();
  }, [currentArticleId, currentCategory, limit]);

  // Always show the section, even if no articles found (for better UX)
  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className={styles.section}>
      <h2 className={styles.title}>Related Articles</h2>
      {isLoading ? (
        <div className={styles.grid}>
          {Array.from({ length: limit }).map((_, index) => (
            <div key={index} className={styles.skeleton}>
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonContent} />
            </div>
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div ref={gridRef as React.RefObject<HTMLDivElement>} className={`${styles.grid} ${isGridVisible ? styles.fadeIn : ''}`}>
          {articles.map((article, index) => (
            <ArticleCard
              key={`${article.id}-${article.slug}-${index}`}
              article={article}
              index={index}
              variant="related"
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No related articles found at the moment.</p>
        </div>
      )}
    </section>
  );
}
