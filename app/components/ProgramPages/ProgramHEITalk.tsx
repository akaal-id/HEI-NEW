'use client';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ProgramPage.module.css';

export default function ProgramHEITalk() {
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80)',
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>D-8 HEI Talk</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef as React.RefObject<HTMLElement>} className={styles.section}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div ref={textRef as React.RefObject<HTMLDivElement>} className={`${styles.textContent} ${isTextVisible ? styles.fadeInUp : ''}`}>
              <p className={styles.description}>
                D-8 HEI Talk features approximately 15 sessions of discussions, presentations, and panel forums led by industry experts, thought leaders, and policymakers. These sessions cover a wide range of topics relevant to the halal economy, including market trends, regulatory frameworks, innovation, and best practices.
              </p>
              <p className={styles.description}>
                Participants will gain valuable insights into the latest developments in the halal industry, learn from successful case studies, and engage in meaningful discussions about the future of the halal economy. The talks provide a platform for knowledge exchange and collaborative learning among all stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
