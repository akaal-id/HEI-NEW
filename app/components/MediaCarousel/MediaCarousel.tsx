'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './MediaCarousel.module.css';

interface MediaItem {
  id: string;
  image: string;
  title: string;
  year?: string;
}

interface MediaCarouselProps {
  mediaItems: MediaItem[];
}

export default function MediaCarousel({ mediaItems }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [carouselRef, isCarouselVisible] = useIntersectionObserver({ threshold: 0.1 });

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying || mediaItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, mediaItems.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    setIsAutoPlaying(false);
  }, [mediaItems.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    setIsAutoPlaying(false);
  }, [mediaItems.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Keyboard navigation - only when carousel is visible
  useEffect(() => {
    if (!isCarouselVisible) return;

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
  }, [handlePrev, handleNext, isCarouselVisible]);

  if (mediaItems.length === 0) {
    return null;
  }

  const currentItem = mediaItems[currentIndex];

  return (
    <div 
      ref={carouselRef as React.RefObject<HTMLDivElement>}
      className={`${styles.mediaCarousel} ${isCarouselVisible ? styles.fadeIn : ''}`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className={styles.carouselContainer}>
        {/* Navigation Buttons */}
        {mediaItems.length > 1 && (
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
        <div className={styles.imageContainer}>
          <Image
            src={currentItem.image}
            alt={currentItem.title}
            fill
            className={styles.carouselImage}
            priority
            sizes="100vw"
          />
          <div className={styles.overlay} />
          
          {/* Content Overlay */}
          <div className={styles.contentOverlay}>
            {currentItem.year && (
              <div className={styles.yearBadge}>
                {currentItem.year}
              </div>
            )}
            <h2 className={styles.carouselTitle}>{currentItem.title}</h2>
          </div>
        </div>

        {/* Dots Indicator */}
        {mediaItems.length > 1 && (
          <div className={styles.dotsContainer}>
            {mediaItems.map((_, index) => (
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
