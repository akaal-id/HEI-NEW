'use client';

import Image from 'next/image';
import { User, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Button from '../Button/Button';
import styles from './ArticleDetail.module.css';

interface Article {
  slug: string;
  category: string;
  image: string;
  author: string;
  date: string;
  title: string;
  content: string;
}

interface ArticleDetailProps {
  article: Article;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <Link href="/articles" className={styles.backLink}>
          <ArrowLeft className={styles.backIcon} />
          <span>Back to Articles</span>
        </Link>

        <div className={styles.header}>
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

        <div className={styles.imageContainer}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            className={styles.image}
            priority
            sizes="100vw"
          />
        </div>

        <div className={styles.content}>
          <div 
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        <div className={styles.footer}>
          <Button 
            href="/articles" 
            variant="secondary"
            className={styles.backButton}
          >
            View All Articles
          </Button>
        </div>
      </div>
    </article>
  );
}
