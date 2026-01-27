'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
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
        
        // Filter out current article and get related articles
        let relatedArticles = allArticles.filter(
          article => article.id !== currentArticleId && article.slug
        );

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

  if (isLoading) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>Related Articles</h2>
        <div className={styles.grid}>
          {Array.from({ length: limit }).map((_, index) => (
            <div key={index} className={styles.skeleton}>
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonContent} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Related Articles</h2>
      <div className={styles.grid}>
        {articles.map((article, index) => (
          <Link 
            key={`${article.id}-${article.slug}-${index}`}
            href={`/articles/${article.slug}`}
            className={styles.card}
          >
            <div className={styles.imageContainer}>
              <Image
                src={article.image}
                alt={article.title}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className={styles.categoryBadge}>{article.category}</span>
            </div>
            <div className={styles.content}>
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
              <p className={styles.description}>{article.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
