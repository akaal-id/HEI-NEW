'use client';

import Image from 'next/image';
import Link from 'next/link';
import { User, Calendar } from 'lucide-react';
import Button from '../Button/Button';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ArticleCard.module.css';

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

interface ArticleCardProps {
  article: Article;
  index?: number;
  variant?: 'home' | 'listing' | 'related';
}

export default function ArticleCard({ article, index = 0, variant = 'home' }: ArticleCardProps) {
  const [cardRef, isVisible] = useIntersectionObserver({ 
    threshold: 0.1,
    rootMargin: '50px'
  });

  const cardStyles = variant === 'home' 
    ? styles.homeCard 
    : variant === 'listing' 
    ? styles.listingCard 
    : styles.relatedCard;

  const cardClassName = `${cardStyles} ${isVisible ? styles.fadeInUp : ''}`;
  const articleUrl = `/articles/${article.slug && article.slug !== 'undefined' ? article.slug : article.id || 'not-found'}`;

  // For related articles, wrap in Link (matching RelatedArticles original structure)
  if (variant === 'related') {
    return (
      <Link 
        href={articleUrl}
        className={cardClassName}
        style={{ animationDelay: `${index * 0.1}s`, textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div ref={cardRef as React.RefObject<HTMLDivElement>} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className={styles.articleCardImageContainer}>
            <Image
              src={article.image}
              alt={article.title}
              fill
              className={styles.articleCardImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
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
          </div>
        </div>
      </Link>
    );
  }

  // For home and listing, use article tag with button
  return (
    <article 
      ref={cardRef as React.RefObject<HTMLElement>}
      className={cardClassName}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.articleCardImageContainer}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          className={styles.articleCardImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
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
          href={articleUrl}
          variant="secondary"
          className={styles.readMoreButton}
        >
          Read More
        </Button>
      </div>
    </article>
  );
}
