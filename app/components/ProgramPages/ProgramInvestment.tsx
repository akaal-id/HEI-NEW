'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ProgramPage.module.css';

export default function ProgramInvestment() {
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
          backgroundImage: 'url("/images/Programs/3-Investment Matchmaking.png")',
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Investment Matchmaking</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef as React.RefObject<HTMLElement>} className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.mediaSplit}>
            <div className={styles.mediaImageWrap}>
              <Image
                src="/images/overview.jpg"
                alt="Investors and business leaders connecting at D-8 Halal Expo Indonesia"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.mediaImage}
              />
            </div>
            <div ref={textRef as React.RefObject<HTMLDivElement>} className={`${styles.mediaText} ${styles.textContent} ${isTextVisible ? styles.fadeInUp : ''}`}>
              <span className={styles.mediaBadge}>Capital meets opportunity</span>
              <h2 className={styles.mediaHeading}>Funding the future of the halal economy</h2>
              <p className={styles.description}>
                Investment Matchmaking at D-8 Halal Expo Indonesia 2026 connects businesses seeking funding with investors looking for opportunities in the halal economy. This program facilitates strategic investment partnerships that drive growth and innovation in the halal sector.
              </p>
              <p className={styles.description}>
                Through carefully curated matchmaking sessions, businesses can present their investment opportunities to qualified investors, while investors can discover promising ventures aligned with their investment criteria and values. This platform creates win-win scenarios that benefit both parties and contribute to the overall development of the halal economy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
