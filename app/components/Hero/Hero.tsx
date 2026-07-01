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
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const slideTimeoutRef = useRef<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback((index: number) => {
    if (heroMedia.length <= 1) return;
    setActiveSlideIndex(index);
  }, []);

  const goToPreviousSlide = () => {
    goToSlide((activeSlideIndex - 1 + heroMedia.length) % heroMedia.length);
  };

  const goToNextSlide = () => {
    goToSlide((activeSlideIndex + 1) % heroMedia.length);
  };

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;

    const updateMetrics = () => {
      const slide = track.querySelector<HTMLElement>(`.${styles.slide}`);
      if (!slide) return;

      const slideWidth = slide.offsetWidth;
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;

      stage.style.setProperty('--slide-width', `${slideWidth}px`);
      stage.style.setProperty('--slide-gap', `${gap}px`);
      stage.style.setProperty('--slide-step', `${slideWidth + gap}px`);
    };

    updateMetrics();

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(stage);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (heroMedia.length <= 1) return;

    const currentSlide = heroMedia[activeSlideIndex];
    const slideDuration = currentSlide?.duration ?? defaultSlideDuration;

    slideTimeoutRef.current = window.setTimeout(() => {
      setActiveSlideIndex((prev) => (prev + 1) % heroMedia.length);
    }, slideDuration);

    return () => {
      if (slideTimeoutRef.current !== null) {
        window.clearTimeout(slideTimeoutRef.current);
      }
    };
  }, [activeSlideIndex, defaultSlideDuration]);

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
                  className={styles.carouselTrack}
                  style={{ '--active-index': activeSlideIndex } as React.CSSProperties}
                >
                  {heroMedia.map((mediaItem, index) => {
                    const isActive = index === activeSlideIndex;

                    return (
                      <div
                        key={mediaItem.contentKey}
                        className={`${styles.slide} ${isActive ? styles.slideActive : ''}`}
                        aria-hidden={!isActive}
                      >
                        <Link
                          href={mediaItem.buttonHref}
                          className={styles.slideLink}
                          tabIndex={isActive ? 0 : -1}
                          aria-label={`${mediaItem.title} — ${mediaItem.buttonLabel}`}
                        >
                          <div className={styles.mediaFrame}>
                            {mediaItem.type === 'image' ? (
                              <Image
                                src={mediaItem.src}
                                alt={mediaItem.alt}
                                fill
                                priority={index === 0}
                                className={styles.media}
                                sizes="(max-width: 768px) 100vw, 960px"
                              />
                            ) : isActive ? (
                              <video
                                ref={(element) => {
                                  videoRefs.current[index] = element;
                                }}
                                className={styles.media}
                                src={mediaItem.src}
                                poster={mediaItem.poster}
                                muted
                                loop
                                playsInline
                                preload={index === 0 ? 'metadata' : 'none'}
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
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              {heroMedia.length > 1 && (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
        <Countdown />
      </section>
    </div>
  );
}
