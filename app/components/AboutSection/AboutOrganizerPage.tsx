'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './AboutPage.module.css';

export default function AboutOrganizerPage() {
  const [heroRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [contentRef, isContentVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [textRef, isTextVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [imageRef, isImageVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef as React.RefObject<HTMLElement>} className={`${styles.heroSection} ${isHeroVisible ? styles.fadeIn : ''}`}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Skyconnection (Official Organizer)</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef as React.RefObject<HTMLElement>} className={styles.section}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div ref={textRef as React.RefObject<HTMLDivElement>} className={`${styles.textContent} ${isTextVisible ? styles.fadeInUp : ''}`}>
              <p className={styles.description}>
                Skyconnection is a leading event management and business development company specializing in delivering impactful international events and fostering strategic business partnerships. With a strong focus on the halal economy and international trade, Skyconnection has established itself as a trusted partner for governments, businesses, and institutions seeking to expand their global reach.
              </p>
              <p className={styles.description}>
                As the organizer of D-8 Halal Expo Indonesia 2026, Skyconnection brings extensive experience in event management, business facilitation, and international cooperation. The company is committed to creating high-quality platforms that connect stakeholders, generate business opportunities, and support sustainable growth across the global halal economy.
              </p>
            </div>
            <div ref={imageRef as React.RefObject<HTMLDivElement>} className={`${styles.imageContent} ${isImageVisible ? styles.fadeInUp : ''}`}>
              <div className={styles.placeholderImage}>
                <Image
                  src="/Partner Logo/skyconnect logo.svg"
                  alt="Skyconnection Logo"
                  width={400}
                  height={300}
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
