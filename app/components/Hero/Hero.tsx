'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../Button/Button';
import Countdown from './Countdown';
import { heroMedia } from '../../data/heroMedia';
import styles from './Hero.module.css';

// Helper function to split text into characters
function splitTextIntoChars(text: string, isGradient: boolean = false): string {
  // Collapse whitespace sequences to single space to match HTML rendering behavior
  const normalizedText = text.replace(/\s+/g, ' ');
  const displayStyle = isGradient ? 'inline' : 'inline-block';

  // For gradient text, we use inline display which wraps naturally
  if (isGradient) {
    return normalizedText
      .split('')
      .map((char) => {
        if (char === ' ') return `<span class="${styles.char}" style="display: ${displayStyle};">&nbsp;</span>`;
        return `<span class="${styles.char}" style="display: ${displayStyle};">${char}</span>`;
      })
      .join('');
  }

  // For non-gradient text (inline-block), we group characters by word
  // to prevent line breaks occurring in the middle of words
  return normalizedText
    .split(' ')
    .map((word) => {
      const chars = word
        .split('')
        .map((char) => `<span class="${styles.char}" style="display: ${displayStyle};">${char}</span>`)
        .join('');
      // Wrap word in a span that prevents breaking inside
      return `<span style="display: inline-block; white-space: nowrap;">${chars}</span>`;
    })
    // Join words with an animated space
    .join(`<span class="${styles.char}" style="display: ${displayStyle};">&nbsp;</span>`);
}

export default function Hero() {
  const defaultSlideDuration = 6000;
  const contentFadeDuration = 350;
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const [isContentExiting, setIsContentExiting] = useState(false);
  const activeSlide = heroMedia[activeSlideIndex] ?? heroMedia[0];
  const activeContentSlide = heroMedia[activeContentIndex] ?? activeSlide;
  const dateRef = useRef<HTMLTimeElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleLocationRef = useRef<HTMLDivElement>(null);
  const subtitleDateRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const floatingAsset1Ref = useRef<HTMLImageElement>(null);
  const floatingAsset2Ref = useRef<HTMLImageElement>(null);
  const slideChangeTimeoutRef = useRef<number | null>(null);
  const contentFadeTimeoutRef = useRef<number | null>(null);

  const clearSlideTimers = () => {
    if (slideChangeTimeoutRef.current !== null) {
      window.clearTimeout(slideChangeTimeoutRef.current);
      slideChangeTimeoutRef.current = null;
    }
  };

  const clearContentFadeTimer = () => {
    if (contentFadeTimeoutRef.current !== null) {
      window.clearTimeout(contentFadeTimeoutRef.current);
      contentFadeTimeoutRef.current = null;
    }
  };

  const requestSlideChange = (nextIndex: number) => {
    if (heroMedia.length <= 1 || nextIndex === activeSlideIndex || isContentExiting) return;

    const nextSlide = heroMedia[nextIndex];
    const currentContentKey = activeContentSlide?.contentKey;
    const nextContentKey = nextSlide?.contentKey;

    if (nextSlide && nextContentKey === currentContentKey) {
      clearSlideTimers();
      setActiveSlideIndex(nextIndex);
      return;
    }

    clearSlideTimers();
    clearContentFadeTimer();
    setIsContentExiting(true);

    contentFadeTimeoutRef.current = window.setTimeout(() => {
      setActiveSlideIndex(nextIndex);
      setActiveContentIndex(nextIndex);
      setIsContentExiting(false);
      contentFadeTimeoutRef.current = null;
    }, contentFadeDuration);
  };

  useEffect(() => {
    if (heroMedia.length <= 1) return;

    const currentSlide = heroMedia[activeSlideIndex];
    const slideDuration = currentSlide?.duration ?? defaultSlideDuration;
    const nextSlideIndex = (activeSlideIndex + 1) % heroMedia.length;
    const delayBeforeFade = Math.max(slideDuration - contentFadeDuration, 0);

    slideChangeTimeoutRef.current = window.setTimeout(() => {
      requestSlideChange(nextSlideIndex);
    }, delayBeforeFade);

    return clearSlideTimers;
  }, [activeSlideIndex, defaultSlideDuration, contentFadeDuration]);

  useEffect(() => {
    return () => {
      clearSlideTimers();
      clearContentFadeTimer();
    };
  }, []);

  useEffect(() => {
    if (!activeContentSlide) return;

    // Dynamically import animejs
    import('animejs').then((animeModule) => {
      // @ts-ignore - animejs animate function signature
      const animate = animeModule.animate as any;
      const stagger = animeModule.stagger;

      // Split text into characters
      if (dateRef.current) {
        dateRef.current.textContent = activeContentSlide.eyebrow;
        dateRef.current.innerHTML = splitTextIntoChars(activeContentSlide.eyebrow);
      }

      if (titleRef.current) {
        titleRef.current.textContent = activeContentSlide.title;
        titleRef.current.innerHTML = splitTextIntoChars(activeContentSlide.title);
      }

      // Subtitle is now structured with location and date, no need to split into chars

      // Animate date characters
      if (dateRef.current) {
        animate(
          dateRef.current.querySelectorAll(`.${styles.char}`),
          {
            opacity: [0, 1],
            translateY: [20, 0],
            delay: stagger(50, { start: 400 }),
            duration: 600,
            easing: 'easeOutQuad',
          }
        );
      }

      // Animate title characters
      if (titleRef.current) {
        // Get all character spans
        const allChars = Array.from(titleRef.current.querySelectorAll(`.${styles.char}`));
        
        if (allChars.length > 0) {
          animate(
            allChars,
            {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: stagger(30, { start: 600 }),
              duration: 600,
              easing: 'easeOutQuad',
            }
          );
        }
      }

      // Animate subtitle items
      if (subtitleLocationRef.current) {
        animate(
          subtitleLocationRef.current,
          {
            opacity: [0, 1],
            translateY: [20, 0],
            delay: 750,
            duration: 800,
            easing: 'easeOutCubic',
          }
        );
      }

      if (subtitleDateRef.current) {
        animate(
          subtitleDateRef.current,
          {
            opacity: [0, 1],
            translateY: [20, 0],
            delay: 850,
            duration: 800,
            easing: 'easeOutCubic',
          }
        );
      }

      // Fade in floating assets
      if (floatingAsset1Ref.current && floatingAsset2Ref.current) {
        animate(
          [floatingAsset1Ref.current, floatingAsset2Ref.current],
          {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1200,
            delay: stagger(200, { start: 800 }),
            easing: 'easeOutQuad',
          }
        );
      }
    });
  }, [activeContentSlide]);

  const goToPreviousSlide = () => {
    if (heroMedia.length <= 1) return;
    requestSlideChange((activeSlideIndex - 1 + heroMedia.length) % heroMedia.length);
  };

  const goToNextSlide = () => {
    if (heroMedia.length <= 1) return;
    requestSlideChange((activeSlideIndex + 1) % heroMedia.length);
  };

  if (!activeSlide || !activeContentSlide) {
    return null;
  }

  return (
    <div className={styles.placeholder}>
      <section className={styles.hero} id="hero">
        <div ref={imageRef} className={styles.backgroundSlider} aria-hidden="true">
          {heroMedia.map((mediaItem, index) => (
            <div
              key={`${mediaItem.type}-${mediaItem.src}`}
              className={`${styles.backgroundSlide} ${index === activeSlideIndex ? styles.backgroundSlideActive : ''}`}
            >
              {mediaItem.type === 'image' ? (
                <Image
                  src={mediaItem.src}
                  alt={mediaItem.alt}
                  fill
                  priority={index === 0}
                  className={styles.backgroundMedia}
                  sizes="100vw"
                />
              ) : (
                <video
                  className={styles.backgroundMedia}
                  src={mediaItem.src}
                  poster={mediaItem.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              )}
            </div>
          ))}
          <div className={styles.backgroundOverlay} />
        </div>

        {heroMedia.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.sliderNavButton} ${styles.sliderNavPrev}`}
              onClick={goToPreviousSlide}
              aria-label="Go to previous slide"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              className={`${styles.sliderNavButton} ${styles.sliderNavNext}`}
              onClick={goToNextSlide}
              aria-label="Go to next slide"
            >
              <ChevronRight size={24} />
            </button>

            <div className={styles.sliderDots} role="tablist" aria-label="Hero media slides">
              {heroMedia.map((mediaItem, index) => (
                <button
                  key={`${mediaItem.type}-dot-${mediaItem.src}`}
                  type="button"
                  className={`${styles.sliderDot} ${index === activeSlideIndex ? styles.sliderDotActive : ''}`}
                  onClick={() => requestSlideChange(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-selected={index === activeSlideIndex}
                  role="tab"
                />
              ))}
            </div>
          </>
        )}

        <div className={styles.container}>
          <div className={`${styles.content} ${isContentExiting ? styles.contentExiting : ''}`}>
            <time ref={dateRef} className={styles.date} dateTime={activeContentSlide.eyebrowDateTime}>
              {activeContentSlide.eyebrow}
            </time>
            <h1 ref={titleRef} className={styles.title}>
              {activeContentSlide.title}
            </h1>
            <div className={styles.subtitleContainer}>
            <div ref={subtitleDateRef} className={styles.subtitleDate}>
                08 - 12 July 2026
              </div>
              <div className={styles.subtitledivider} />
              <div ref={subtitleLocationRef} className={styles.subtitleLocation}>
                {activeContentSlide.location}
              </div>
            </div>
            <Button className={styles.button} href={activeContentSlide.buttonHref}>{activeContentSlide.buttonLabel}</Button>
          </div>
        </div>
        {/* <div ref={imageRef} className={styles.imageWrapper}>
          <Image
            src="/D8-assets/KV_D8.png?v=2"
            alt="Halal Expo Indonesia 2026"
            width={800}
            height={1000}
            className={styles.image}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div> */}

        <Image
          ref={floatingAsset1Ref}
          src="/D8-assets/asset_1_D8.svg"
          alt="Decorative Asset"
          width={200}
          height={200}
          className={styles.floatingAsset1}
        />
        <Image
          ref={floatingAsset2Ref}
          src="/D8-assets/asset_2_D8.svg"
          alt="Decorative Asset"
          width={200}
          height={200}
          className={styles.floatingAsset2}
        />
        <Countdown />
      </section>
    </div>
  );
}
