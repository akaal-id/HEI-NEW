'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ProgramPage.module.css';

export default function ProgramCultureFestival() {
  const [heroRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [contentRef, isContentVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [textRef, isTextVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <>
      {/* Hero Section */}
      <section 
        ref={heroRef as React.RefObject<HTMLElement>} 
        className={`${styles.heroSection} ${isHeroVisible ? styles.fadeIn : ''}`}
        style={{
          backgroundImage: 'url("/images/DHCF.jpg")',
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>D-8 HEI Culture Festival</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef as React.RefObject<HTMLElement>} className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.mediaSplit}>
            <div className={styles.mediaImageWrap}>
              <Image
                src="/images/Programs/6-Culture Festival.png"
                alt="Cultural performances and heritage showcases from the D-8 nations"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.mediaImage}
              />
            </div>
            <div ref={textRef as React.RefObject<HTMLDivElement>} className={`${styles.mediaText} ${styles.textContent} ${isTextVisible ? styles.fadeInUp : ''}`}>
              <span className={styles.mediaBadge}>9 nations, one celebration</span>
              <h2 className={styles.mediaHeading}>A vibrant celebration of D-8 heritage</h2>
              <p className={styles.description}>
                The D-8 HEI Culture Festival celebrates the cultural heritage and diversity of D-8 Member States. This vibrant event showcases traditional arts, music, dance, cuisine, and crafts from Bangladesh, Egypt, Indonesia, Iran, Malaysia, Nigeria, Pakistan, and Türkiye, with Azerbaijan joining in 2025.
              </p>
              <p className={styles.description}>
                Through cultural performances, exhibitions, and interactive experiences, the festival fosters mutual understanding, strengthens cultural bonds, and highlights the rich traditions that unite the D-8 community. It provides a unique opportunity for visitors to experience the diverse cultural tapestry of the D-8 nations while celebrating shared values and heritage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
