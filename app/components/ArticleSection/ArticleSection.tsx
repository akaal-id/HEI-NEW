'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import { User, Calendar } from 'lucide-react';
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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch articles from API route
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const allArticles: Article[] = await response.json();
        // Get the latest 3 articles (most recent first)
        const latestArticles = allArticles
          .sort((a, b) => {
            // Sort by date, newest first
            const dateA = new Date(a.date || a.createdAt || '').getTime();
            const dateB = new Date(b.date || b.createdAt || '').getTime();
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import('animejs').then((animeModule) => {
              const animate = animeModule.animate as any;
              const stagger = animeModule.stagger;

              const elements = [
                headerRef.current,
                gridRef.current,
              ].filter(Boolean);

              if (elements.length > 0) {
                animate(
                  elements,
                  {
                    opacity: [0, 1],
                    translateY: [30, 0],
                    delay: stagger(200),
                    duration: 800,
                    easing: 'easeOutQuad',
                  }
                );
              }
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="articles">
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <h2 className={styles.title}>Read more from us</h2>
          <Button 
            href="/articles" 
            variant="primary"
            className={styles.moreButton}
          >
            More Article
          </Button>
        </div>

        <div ref={gridRef} className={styles.articlesGrid}>
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
              <article key={`${article.id}-${article.slug}-${index}`} className={styles.articleCard}>
                <div className={styles.articleCardImageContainer}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className={styles.articleCardImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className={styles.categoryBadge}>{article.category}</span>
                </div>
                
                <div className={styles.cardContent}>
                  <div className={styles.metadata}>
                    <div className={styles.metaItem}>
                      <User className={styles.metaIcon} />
                      <span>{article.author}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Calendar className={styles.metaIcon} />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <p className={styles.articleDescription}>{article.description}</p>
                  <div className={styles.divider}></div>
                  <Button 
                    href={`/articles/${article.slug || article.id}`}
                    variant="secondary"
                    className={styles.readMoreButton}
                  >
                    Read More
                  </Button>
                </div>
              </article>
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
