'use client';

import Image from 'next/image';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ProgramPage.module.css';

export default function ProgramYouthEvent() {
  const [heroRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [content1Ref, isContent1Visible] = useIntersectionObserver({ threshold: 0.1 });
  const [content2Ref, isContent2Visible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <>
      {/* Hero Section */}
      <section 
        ref={heroRef as React.RefObject<HTMLElement>} 
        className={`${styles.heroSection} ${isHeroVisible ? styles.fadeIn : ''}`}
        style={{
          backgroundImage: 'url("/images/Programs/4-youth event.png")',
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>D-8 HEI Youth</h1>
        </div>
      </section>

      {/* Young Entrepreneur Meetup */}
      <section ref={content1Ref as React.RefObject<HTMLElement>} className={styles.section}>
        <div className={styles.container}>
          <div className={styles.mediaSplit}>
            <div className={styles.mediaImageWrap}>
              <Image
                src="/images/exhibition-1.png"
                alt="Young entrepreneurs networking at D-8 Halal Expo Indonesia"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.mediaImage}
              />
            </div>
            <div className={`${styles.mediaText} ${styles.textContent} ${isContent1Visible ? styles.fadeInUp : ''}`}>
              <span className={styles.mediaBadge}>Cross-border networking</span>
              <h2 className={styles.sectionTitle}>Young Entrepreneur Meetup</h2>
              <p className={styles.description}>
                Young Entrepreneur Meetup is a dedicated networking session designed to connect Indonesian sharia-based startups with business delegates from D-8 member countries. The session aims to foster cross-border collaboration, business exchange, and potential partnerships within the halal and Islamic economic sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Young Entrepreneur Panel Discussion */}
      <section ref={content2Ref as React.RefObject<HTMLElement>} className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={`${styles.mediaSplit} ${styles.mediaSplitReverse}`}>
            <div className={styles.mediaImageWrap}>
              <Image
                src="/images/overview.jpg"
                alt="Young entrepreneurs panel discussion at D-8 Halal Expo Indonesia"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.mediaImage}
              />
            </div>
            <div className={`${styles.mediaText} ${styles.textContent} ${isContent2Visible ? styles.fadeInUp : ''}`}>
              <span className={styles.mediaBadge}>Inspiring young voices</span>
              <h2 className={styles.sectionTitle}>Young Entrepreneur Panel Discussion</h2>
              <p className={styles.description}>
                Young Entrepreneur Panel Discussion is a session within HEI Talk featuring inspiring young entrepreneurs from the halal and creative economy sectors. It serves as a platform to share insights, strategies, and experiences in building and scaling businesses within today&apos;s competitive global market.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
