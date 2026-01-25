'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Button from '../Button/Button';
import { User, Calendar } from 'lucide-react';
import styles from './ArticleSection.module.css';

interface Article {
  id: string;
  slug?: string;
  category: string;
  image: string;
  author: string;
  date: string;
  title: string;
  description: string;
}

// TODO: Replace this with database fetch (Google Sheets or Supabase)
// This is a temporary mock data structure
const articles: Article[] = [
  {
    id: '1',
    slug: 'lorem-ipsum-dolor-sit-amet-consectur',
    category: 'Live Report',
    image: '/images/overview.jpg',
    author: 'John Doe',
    date: 'January 8th, 2026',
    title: 'Lorem Ipsum Dolor Sit Amet Consectur Lorem Ipsum Dolor Sit Amet Consectur',
    description: "In today's fast-paced business environment, understanding market trends is crucial for success. Companies must adapt to changing consumer preferences and technological advancements to stay competitive. By leveraging data analytics and customer feedback, busines..."
  },
  {
    id: '2',
    slug: 'sed-do-eiusmod-tempor-incididunt',
    category: 'Business Education',
    image: '/images/overview.jpg',
    author: 'Jane Smith',
    date: 'February 15th, 2026',
    title: 'Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua',
    description: "As we navigate through the complexities of the digital age, the importance of cybersecurity cannot be overstated. Protecting sensitive information from breaches and cyber attacks is essential for maintaining consumer trust and business integrity. Implementing robust security measures"
  },
  {
    id: '3',
    slug: 'ut-enim-ad-minim-veniam',
    category: 'News & Article',
    image: '/images/overview.jpg',
    author: 'Alice Johnson',
    date: 'March 22nd, 2026',
    title: 'Ut Enim Ad Minim Veniam Quis Nostrud Exercitation Ullamco Laboris',
    description: "Sustainability has become a key focus for organizations worldwide. Implementing eco-friendly practices not only benefits the environment but also enhances brand reputation and customer loyalty. By investing in renewable resources and promoting ethical sourcing, companies can..."
  }
];

export default function ArticleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
            href="#more-articles" 
            variant="primary"
            className={styles.moreButton}
          >
            More Article
          </Button>
        </div>

        <div ref={gridRef} className={styles.articlesGrid}>
          {articles.map((article) => (
            <article key={article.id} className={styles.articleCard}>
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
          ))}
        </div>
      </div>
    </section>
  );
}
