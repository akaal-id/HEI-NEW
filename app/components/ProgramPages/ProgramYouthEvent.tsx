'use client';

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
          backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80)',
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
          <div className={`${styles.textContent} ${isContent1Visible ? styles.fadeInUp : ''}`}>
            <h2 className={styles.sectionTitle}>Young Entrepreneur Meetup</h2>
            <p className={styles.description}>
              Young Entrepreneur Meetup is a dedicated networking session designed to connect Indonesian sharia-based startups with business delegates from D-8 member countries. The session aims to foster cross-border collaboration, business exchange, and potential partnerships within the halal and Islamic economic sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Young Entrepreneur Panel Discussion */}
      <section ref={content2Ref as React.RefObject<HTMLElement>} className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={`${styles.textContent} ${isContent2Visible ? styles.fadeInUp : ''}`}>
            <h2 className={styles.sectionTitle}>Young Entrepreneur Panel Discussion</h2>
            <p className={styles.description}>
              Young Entrepreneur Panel Discussion is a session within HEI Talk featuring inspiring young entrepreneurs from the halal and creative economy sectors. It serves as a platform to share insights, strategies, and experiences in building and scaling businesses within today&apos;s competitive global market.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
