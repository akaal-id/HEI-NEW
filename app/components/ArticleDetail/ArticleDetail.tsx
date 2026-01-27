'use client';

import Image from 'next/image';
import { User, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Button from '../Button/Button';
import ShareButtons from '../ShareButtons/ShareButtons';
import RelatedArticles from '../RelatedArticles/RelatedArticles';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ArticleDetail.module.css';

interface Article {
  id?: string;
  slug: string;
  category: string;
  image: string;
  author: string;
  date: string;
  title: string;
  content: string;
  description?: string;
}

interface ArticleDetailProps {
  article: Article;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  // Get current URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://halalexpoindonesia.com/articles/${article.slug}`;

  const [articleRef, isArticleVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [headerRef, isHeaderVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [imageRef, isImageVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [contentRef, isContentVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <article ref={articleRef as React.RefObject<HTMLElement>} className={`${styles.article} ${isArticleVisible ? styles.fadeIn : ''}`}>
      <div className={styles.container}>
        <Link href="/articles" className={styles.backLink}>
          <ArrowLeft className={styles.backIcon} />
          <span>Back to Articles</span>
        </Link>

        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`${styles.header} ${isHeaderVisible ? styles.fadeInUp : ''}`}>
          <span className={styles.categoryBadge}>{article.category}</span>
          <h1 className={styles.title}>{article.title}</h1>
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
        </div>

        <div ref={imageRef as React.RefObject<HTMLDivElement>} className={`${styles.imageContainer} ${isImageVisible ? styles.fadeInUp : ''}`}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            className={styles.image}
            priority
            sizes="100vw"
          />
        </div>

        <div ref={contentRef as React.RefObject<HTMLDivElement>} className={`${styles.content} ${isContentVisible ? styles.fadeInUp : ''}`}>
          <div 
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        <ShareButtons 
          url={currentUrl}
          title={article.title}
          description={article.description || ''}
        />

        <div className={styles.footer}>
          <Button 
            href="/articles" 
            variant="secondary"
            className={styles.backButton}
          >
            View All Articles
          </Button>
        </div>

        <RelatedArticles 
          currentArticleId={article.id || article.slug || ''}
          currentCategory={article.category}
          limit={3}
        />
      </div>
    </article>
  );
}
