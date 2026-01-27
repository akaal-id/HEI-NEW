'use client';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Info } from 'lucide-react';
import styles from './ProgramPage.module.css';

export default function ProgramBusinessMatching() {
  const [heroRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [contentRef, isContentVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [textRef, isTextVisible] = useIntersectionObserver({ threshold: 0.1 });

  const handleMoreDetails = () => {
    alert('More details on the matching process will be available soon.');
  };

  return (
    <>
      {/* Hero Section */}
      <section 
        ref={heroRef as React.RefObject<HTMLElement>} 
        className={`${styles.heroSection} ${isHeroVisible ? styles.fadeIn : ''}`}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80)',
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Business Matching</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef as React.RefObject<HTMLElement>} className={styles.section}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div ref={textRef as React.RefObject<HTMLDivElement>} className={`${styles.textContent} ${isTextVisible ? styles.fadeInUp : ''}`}>
              <p className={styles.description}>
                The Business Matching program at D-8 Halal Expo Indonesia 2026 facilitates direct connections between exhibitors and qualified buyers through pre-scheduled meetings. This program enables businesses to engage in meaningful discussions, explore partnership opportunities, and establish long-term commercial relationships.
              </p>
              <p className={styles.description}>
                With approximately 100 business matching sessions expected, participants can maximize their networking opportunities and accelerate their business growth in the halal market. Our platform ensures that each meeting is strategically aligned with participants' business objectives and market interests.
              </p>
              <button 
                onClick={handleMoreDetails}
                className={styles.detailsButton}
              >
                <Info size={20} />
                <span>More Details on Matching Process</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
