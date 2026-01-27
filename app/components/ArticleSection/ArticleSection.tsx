'use client';

import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import ArticleCard from '../ArticleCard/ArticleCard';
import { User } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ArticleSection.module.css';

interface Article {
  id: string;
  slug: string;
  category: string;
  image: string;
  author: string;
  date: string;
  title: string;
  description: string;
  createdAt?: string;
}

export default function ArticleSection() {
  const [sectionRef, isSectionVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [headerRef, isHeaderVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [gridRef, isGridVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch articles from API route
  useEffect(() => {
    async function fetchArticles() {
      try {
        // Fetch fresh data with cache-busting
        const response = await fetch('/api/articles', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const allArticles: Article[] = await response.json();
        
        // Filter out articles without proper data
        const validArticles = allArticles.filter(
          article => article.id && article.title && article.slug
        );
        
        // Get the latest 3 articles (most recent first)
        const latestArticles = validArticles
          .sort((a, b) => {
            // Sort by date, newest first
            const dateA = new Date(a.date || a.createdAt || '').getTime();
            const dateB = new Date(b.date || b.createdAt || '').getTime();
            // Handle invalid dates
            if (isNaN(dateA) && isNaN(dateB)) return 0;
            if (isNaN(dateA)) return 1;
            if (isNaN(dateB)) return -1;
            return dateB - dateA;
          })
          .slice(0, 3);
        setArticles(latestArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, []);


  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className={`${styles.section} ${isSectionVisible ? styles.visible : ''}`} id="articles">
      <div className={styles.container}>
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`${styles.header} ${isHeaderVisible ? styles.fadeInUp : ''}`}>
          <h2 className={styles.title}>Read more from us</h2>
          <Button 
            href="/articles" 
            variant="primary"
            className={styles.moreButton}
          >
            More Article
          </Button>
        </div>

        <div ref={gridRef as React.RefObject<HTMLDivElement>} className={`${styles.articlesGrid} ${isGridVisible ? styles.fadeInUp : ''}`}>
          {isLoading ? (
            // Loading state - show skeleton or placeholder
            Array.from({ length: 3 }).map((_, index) => (
              <article key={`loading-${index}`} className={styles.articleCard}>
                <div className={styles.articleCardImageContainer}>
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    background: 'rgba(0, 73, 102, 0.1)',
                    borderRadius: '16px'
                  }} />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.metadata}>
                    <div className={styles.metaItem}>
                      <User className={styles.metaIcon} />
                      <span>Loading...</span>
                    </div>
                  </div>
                  <h3 className={styles.articleTitle}>Loading article...</h3>
                  <p className={styles.articleDescription}>Loading description...</p>
                </div>
              </article>
            ))
          ) : articles.length > 0 ? (
            articles.map((article, index) => (
              <ArticleCard
                key={`${article.id}-${article.slug}-${index}`}
                article={article}
                index={index}
                variant="home"
              />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
              <p>No articles available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
