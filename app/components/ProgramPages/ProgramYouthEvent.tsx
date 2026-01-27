'use client';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { CalendarClock } from 'lucide-react';
import styles from './ProgramPage.module.css';

export default function ProgramYouthEvent() {
  const [heroRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [contentRef, isContentVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <>
      {/* Hero Section */}
      <section 
        ref={heroRef as React.RefObject<HTMLElement>} 
        className={`${styles.heroSection} ${isHeroVisible ? styles.fadeIn : ''}`}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80)',
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Youth Event</h1>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section ref={contentRef as React.RefObject<HTMLElement>} className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.comingSoonContent} ${isContentVisible ? styles.fadeInUp : ''}`}>
            <CalendarClock size={80} className={styles.comingSoonIcon} />
            <p className={styles.comingSoonText}>Further Details Will Be Available Soon</p>
          </div>
        </div>
      </section>
    </>
  );
}
