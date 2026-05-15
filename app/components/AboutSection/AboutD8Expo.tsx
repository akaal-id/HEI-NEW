'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './AboutPage.module.css';

export default function AboutD8Expo() {
  const [heroRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [contentRef, isContentVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [textRef, isTextVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [imageRef, isImageVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef as React.RefObject<HTMLElement>} className={`${styles.heroSection} ${isHeroVisible ? styles.fadeIn : ''}`}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>D-8 Halal Expo Indonesia 2026</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef as React.RefObject<HTMLElement>} className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={`${styles.content} ${styles.contentReverse}`}>
            <div ref={textRef as React.RefObject<HTMLDivElement>} className={`${styles.textContent} ${isTextVisible ? styles.fadeInUp : ''}`}>
              <p className={styles.description}>
                D-8 Halal Expo Indonesia 2026 is an international B2B halal exhibition and a strategic global platform that advances the halal economy while supporting the objectives of the D-8 Organization for Economic Cooperation. As an official side event of the D-8 Summit 2026, the Expo brings together halal industry players, governments, institutions, and strategic partners from D-8 Member States and the wider international community to strengthen international trade, expand collaboration, develop halal value chains, and enhance global competitiveness through business matchmaking, investment partnerships, and knowledge exchange.
              </p>
            </div>
            <div ref={imageRef as React.RefObject<HTMLDivElement>} className={`${styles.imageContent} ${isImageVisible ? styles.fadeInUp : ''}`}>
              <div className={styles.placeholderImage}>
                <Image
                  src="/images/overview.jpg"
                  alt="D-8 Halal Expo Indonesia 2026 Official Event Banner"
                  width={800}
                  height={500}
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
