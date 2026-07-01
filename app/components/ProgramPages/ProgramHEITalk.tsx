'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ProgramPage.module.css';

export default function ProgramHEITalk() {
  const [heroRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [contentRef] = useIntersectionObserver({ threshold: 0.1 });
  const [textRef, isTextVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <>
      {/* Hero Section */}
      <section 
        ref={heroRef as React.RefObject<HTMLElement>} 
        className={`${styles.heroSection} ${isHeroVisible ? styles.fadeIn : ''}`}
        style={{
          backgroundImage: 'url("/images/Programs/5-D-8 HEI Talkshow.png")',
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>D-8 HEI Talkshow</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef as React.RefObject<HTMLElement>} className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.mediaSplit}>
            <div className={styles.mediaImageWrap}>
              <Image
                src="/images/overview.jpg"
                alt="Industry leaders speaking at a D-8 Halal Expo Indonesia panel session"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.mediaImage}
              />
            </div>
            <div ref={textRef as React.RefObject<HTMLDivElement>} className={`${styles.mediaText} ${styles.textContent} ${isTextVisible ? styles.fadeInUp : ''}`}>
              <span className={styles.mediaBadge}>±15 expert-led sessions</span>
              <h2 className={styles.mediaHeading}>Insights from the people shaping halal trade</h2>
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
