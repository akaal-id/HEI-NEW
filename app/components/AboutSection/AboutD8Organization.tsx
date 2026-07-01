'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './AboutPage.module.css';

export default function AboutD8Organization() {
  const [heroRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [contentRef] = useIntersectionObserver({ threshold: 0.1 });
  const [textRef, isTextVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [imageRef, isImageVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef as React.RefObject<HTMLElement>} className={`${styles.heroSection} ${isHeroVisible ? styles.fadeIn : ''}`}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>D-8 Organization for Economic Cooperation</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef as React.RefObject<HTMLElement>} className={styles.section}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div ref={textRef as React.RefObject<HTMLDivElement>} className={`${styles.textContent} ${isTextVisible ? styles.fadeInUp : ''}`}>
              <p className={styles.description}>
                The D-8 Organization for Economic Cooperation is an international economic forum comprising Bangladesh, Egypt, Indonesia, Iran, Malaysia, Nigeria, Pakistan, and Türkiye, with Azerbaijan joining in 2025. Established through the Istanbul Declaration on 15 June 1997, the D-8 aims to strengthen member states&apos; roles in the global economy, expand trade, and improve living standards. The organization is led by Secretary General Ambassador Isiaka Abdulqadir Imam, with its Secretariat based in Istanbul, Türkiye.
              </p>
            </div>
            <div ref={imageRef as React.RefObject<HTMLDivElement>} className={`${styles.imageContent} ${isImageVisible ? styles.fadeInUp : ''}`}>
              <div className={styles.placeholderImage}>
                <Image
                  src="/D8-assets/D8-summit.svg"
                  alt="D-8 Organization Logo or Map of Member Countries"
                  width={600}
                  height={400}
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
