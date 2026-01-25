'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '../Button/Button';
import Countdown from './Countdown';
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
  const dateRef = useRef<HTMLTimeElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleLocationRef = useRef<HTMLDivElement>(null);
  const subtitleDateRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const floatingAsset1Ref = useRef<HTMLImageElement>(null);
  const floatingAsset2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Dynamically import animejs
    import('animejs').then((animeModule) => {
      // @ts-ignore - animejs animate function signature
      const animate = animeModule.animate as any;
      const stagger = animeModule.stagger;

      // Split text into characters
      if (dateRef.current) {
        const originalText = dateRef.current.textContent || '';
        dateRef.current.innerHTML = splitTextIntoChars(originalText);
      }

      if (titleRef.current) {
        // Recursive function to traverse and transform text nodes
        const processNode = (node: Node, isInsideGradient: boolean = false): string => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || '';
            // Skip empty text nodes (often just whitespace from formatting)
            if (!text.trim() && text.includes('\n')) return '';
            return splitTextIntoChars(text, isInsideGradient);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            if (element.tagName === 'BR') {
              return '<br />';
            }
            
            // Check if this element is the gradient span
            const style = element.getAttribute('style') || '';
            const hasGradient = style.includes('linear-gradient') || isInsideGradient;
            
            // Process children
            const childrenHTML = Array.from(node.childNodes)
              .map(child => processNode(child, hasGradient))
              .join('');
            
            // Reconstruct element
            const tagName = element.tagName.toLowerCase();
            const attributes = Array.from(element.attributes)
              .map(attr => `${attr.name}="${attr.value}"`)
              .join(' ');
            const attrString = attributes ? ` ${attributes}` : '';
            
            return `<${tagName}${attrString}>${childrenHTML}</${tagName}>`;
          }
          return '';
        };

        // We use a temp div to avoid issues with reading/writing to the same ref immediately
        // or just read childNodes from the ref directly before modifying.
        const originalNodes = Array.from(titleRef.current.childNodes);
        const newHTML = originalNodes.map(node => processNode(node)).join('');
        
        titleRef.current.innerHTML = newHTML;
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

      // Fade in image
      if (imageRef.current) {
        animate(
          imageRef.current,
          {
            opacity: [0, 1],
            duration: 1200,
            delay: 200,
            easing: 'easeOutQuad',
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
  }, []);

  return (
    <div className={styles.placeholder}>
      <section className={styles.hero} id="hero">
        <div className={styles.container}>
          <div className={styles.content}>
            <time ref={dateRef} className={styles.date} dateTime="2026-04">
              Welcome to The 6th HEI
            </time>
            <h1 ref={titleRef} className={styles.title}>
              D-8 Halal Expo Indonesia
            </h1>
            <div className={styles.subtitleContainer}>
            <div ref={subtitleDateRef} className={styles.subtitleDate}>
                April 14th-18th, 2026
              </div>
              <div ref={subtitleLocationRef} className={styles.subtitleLocation}>
                Senayan Indoor Tennis Court, Jakarta
              </div>
            </div>
            <Button className={styles.button} href="#overview">Discover more</Button>
          </div>
        </div>
        <div ref={imageRef} className={styles.imageWrapper}>
          <Image
            src="/D8-assets/KV_D8.png"
            alt="Halal Expo Indonesia 2026"
            width={800}
            height={1000}
            className={styles.image}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

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
