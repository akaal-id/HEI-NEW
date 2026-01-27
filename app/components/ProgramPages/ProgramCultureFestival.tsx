'use client';

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
          backgroundImage: 'url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80)',
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>D-8 Culture Festival</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef as React.RefObject<HTMLElement>} className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div ref={textRef as React.RefObject<HTMLDivElement>} className={`${styles.textContent} ${isTextVisible ? styles.fadeInUp : ''}`}>
              <p className={styles.description}>
                The D-8 Culture Festival celebrates the cultural heritage and diversity of D-8 Member States. This vibrant event showcases traditional arts, music, dance, cuisine, and crafts from Bangladesh, Egypt, Indonesia, Iran, Malaysia, Nigeria, Pakistan, and Türkiye, with Azerbaijan joining in 2025.
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
