'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ArticleHeroSlider.module.css';

interface Article {
  id: string;
  slug?: string;
  category: string;
  image: string;
  title: string;
  description?: string;
}

interface ArticleHeroSliderProps {
  articles: Article[];
}

export default function ArticleHeroSlider({ articles }: ArticleHeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [sliderRef, isSliderVisible] = useIntersectionObserver({ threshold: 0.1 });

  // Get featured articles (latest 5 articles)
  const featuredArticles = articles
    .filter(article => article.slug && article.slug !== 'undefined' && article.image)
    .slice(0, 5);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying || featuredArticles.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredArticles.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
    setIsAutoPlaying(false);
  }, [featuredArticles.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
    setIsAutoPlaying(false);
  }, [featuredArticles.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Keyboard navigation - only when slider is visible
  useEffect(() => {
    if (!isSliderVisible) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handlePrev, handleNext, isSliderVisible]);

  if (featuredArticles.length === 0) {
    return null;
  }

  const currentArticle = featuredArticles[currentIndex];
  const articleUrl = `/articles/${currentArticle.slug && currentArticle.slug !== 'undefined' ? currentArticle.slug : currentArticle.id || 'not-found'}`;

  return (
    <div 
      ref={sliderRef as React.RefObject<HTMLDivElement>}
      className={`${styles.heroSlider} ${isSliderVisible ? styles.fadeIn : ''}`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className={styles.sliderContainer}>
        {/* Navigation Buttons */}
        {featuredArticles.length > 1 && (
          <>
            <button
              className={styles.navButton}
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <ChevronLeft className={styles.navIcon} />
            </button>
            <button
              className={styles.navButton}
              onClick={handleNext}
              aria-label="Next slide"
            >
              <ChevronRight className={styles.navIcon} />
            </button>
          </>
        )}

        {/* Slide Content */}
        <Link href={articleUrl} className={styles.slideLink}>
          <div className={styles.imageContainer}>
            <Image
              src={currentArticle.image}
              alt={currentArticle.title}
              fill
              className={styles.slideImage}
              priority
              sizes="100vw"
            />
            <div className={styles.overlay} />
            
            {/* Content Overlay */}
            <div className={styles.contentOverlay}>
              <div className={styles.categoryBadge}>
                {currentArticle.category}
              </div>
              <h2 className={styles.slideTitle}>{currentArticle.title}</h2>
              {currentArticle.description && (
                <p className={styles.slideDescription}>
                  {currentArticle.description.length > 150 
                    ? `${currentArticle.description.substring(0, 150)}...` 
                    : currentArticle.description}
                </p>
              )}
            </div>
          </div>
        </Link>

        {/* Dots Indicator */}
        {featuredArticles.length > 1 && (
          <div className={styles.dotsContainer}>
            {featuredArticles.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
