'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroMedia } from '../../data/heroMedia';
import Countdown from './Countdown';
import styles from './Hero.module.css';

export default function Hero() {
  const defaultSlideDuration = 6000;
  const slideCount = heroMedia.length;
  const hasMultipleSlides = slideCount > 1;
  const extendedSlides = hasMultipleSlides
    ? [...heroMedia, ...heroMedia, ...heroMedia]
    : heroMedia;

  const [trackIndex, setTrackIndex] = useState(hasMultipleSlides ? slideCount : 0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slideTimeoutRef = useRef<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const activeSlideIndex = hasMultipleSlides ? trackIndex % slideCount : 0;

  const goToSlide = useCallback(
    (index: number) => {
      if (!hasMultipleSlides) return;
      setTrackIndex(slideCount + index);
    },
    [hasMultipleSlides, slideCount]
  );

  const goToPreviousSlide = () => {
    if (!hasMultipleSlides) return;
    setTrackIndex((current) => current - 1);
  };

  const goToNextSlide = () => {
    if (!hasMultipleSlides) return;
    setTrackIndex((current) => current + 1);
  };

  const resetTrackPosition = useCallback(() => {
    setTrackIndex((current) => {
      if (current < slideCount) {
        return current + slideCount;
      }

      if (current >= slideCount * 2) {
        return current - slideCount;
      }

      return current;
    });
  }, [slideCount]);

  useEffect(() => {
    if (!hasMultipleSlides) return;

    const track = trackRef.current;
    if (!track) return;

    const needsReset = trackIndex < slideCount || trackIndex >= slideCount * 2;
    if (!needsReset) return;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== track || event.propertyName !== 'transform') return;

      setIsTransitioning(false);
      resetTrackPosition();
    };

    track.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      track.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [trackIndex, hasMultipleSlides, slideCount, resetTrackPosition]);

  useEffect(() => {
    if (!hasMultipleSlides || isTransitioning) return;

    const frameId = window.requestAnimationFrame(() => {
      setIsTransitioning(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isTransitioning, hasMultipleSlides]);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;

    const updateMetrics = () => {
      const slide = track.querySelector<HTMLElement>(`.${styles.slide}`);
      if (!slide) return;

      const slideWidth = slide.offsetWidth;
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      const carousel = stage.parentElement;

      stage.style.setProperty('--slide-width', `${slideWidth}px`);
      stage.style.setProperty('--slide-gap', `${gap}px`);
      stage.style.setProperty('--slide-step', `${slideWidth + gap}px`);

      if (carousel) {
        carousel.style.setProperty('--slide-width', `${slideWidth}px`);
      }
    };

    updateMetrics();

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(stage);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!hasMultipleSlides) return;

    const currentSlide = heroMedia[activeSlideIndex];
    const slideDuration = currentSlide?.duration ?? defaultSlideDuration;

    slideTimeoutRef.current = window.setTimeout(() => {
      setTrackIndex((current) => current + 1);
    }, slideDuration);

    return () => {
      if (slideTimeoutRef.current !== null) {
        window.clearTimeout(slideTimeoutRef.current);
      }
    };
  }, [activeSlideIndex, defaultSlideDuration, hasMultipleSlides]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeSlideIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeSlideIndex]);

  if (heroMedia.length === 0) {
    return null;
  }

  return (
    <div className={styles.placeholder}>
      <section className={styles.hero} id="hero" aria-label="Featured highlights">
        <div className={styles.heroContent}>
          <div className={styles.carouselOuter}>
            <div className={styles.carousel}>
              <div ref={stageRef} className={styles.carouselStage}>
                <div
                  ref={trackRef}
                  className={`${styles.carouselTrack} ${!isTransitioning ? styles.carouselTrackInstant : ''}`}
                  style={{ '--active-index': trackIndex } as React.CSSProperties}
                >
                  {extendedSlides.map((mediaItem, index) => {
                    const isActive = index === trackIndex;
                    const realIndex = index % slideCount;
                    const slideContent = (
                      <div className={styles.mediaFrame}>
                        {mediaItem.type === 'image' ? (
                          <Image
                            src={mediaItem.src}
                            alt={mediaItem.alt}
                            fill
                            priority={realIndex === 0 && index < slideCount}
                            className={styles.media}
                            sizes="(max-width: 768px) 82vw, 960px"
                          />
                        ) : isActive ? (
                          <video
                            ref={(element) => {
                              videoRefs.current[realIndex] = element;
                            }}
                            className={styles.media}
                            src={mediaItem.src}
                            poster={mediaItem.poster}
                            muted
                            loop
                            playsInline
                            preload={realIndex === 0 ? 'metadata' : 'none'}
                          />
                        ) : (
                          <video
                            className={styles.media}
                            src={mediaItem.src}
                            poster={mediaItem.poster}
                            muted
                            playsInline
                            preload="none"
                            tabIndex={-1}
                            aria-hidden
                          />
                        )}
                      </div>
                    );

                    return (
                      <div
                        key={`${mediaItem.contentKey}-${index}`}
                        className={`${styles.slide} ${isActive ? styles.slideActive : ''}`}
                        aria-hidden={!isActive}
                      >
                        {mediaItem.buttonDisabled ? (
                          <div
                            className={`${styles.slideLink} ${styles.slideLinkDisabled}`}
                            aria-label={`${mediaItem.title} — registration coming soon`}
                          >
                            {slideContent}
                          </div>
                        ) : (
                          <Link
                            href={mediaItem.buttonHref}
                            className={styles.slideLink}
                            tabIndex={isActive ? 0 : -1}
                            aria-label={`${mediaItem.title} — ${mediaItem.buttonLabel}`}
                          >
                            {slideContent}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {heroMedia.length > 1 && (
                <div className={styles.carouselControls}>
                  <button
                    type="button"
                    className={`${styles.navButton} ${styles.navPrev}`}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      goToPreviousSlide();
                    }}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={22} aria-hidden />
                  </button>

                  <div className={styles.dots} role="tablist" aria-label="Hero carousel slides">
                    {heroMedia.map((mediaItem, index) => (
                      <button
                        key={`dot-${mediaItem.contentKey}`}
                        type="button"
                        role="tab"
                        className={`${styles.dot} ${index === activeSlideIndex ? styles.dotActive : ''}`}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          goToSlide(index);
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-selected={index === activeSlideIndex}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className={`${styles.navButton} ${styles.navNext}`}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      goToNextSlide();
                    }}
                    aria-label="Next slide"
                  >
                    <ChevronRight size={22} aria-hidden />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Countdown />
      </section>
    </div>
  );
}
