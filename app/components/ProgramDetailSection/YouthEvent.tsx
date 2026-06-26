'use client';

import Image from 'next/image';
import styles from './ProgramDetailSection.module.css';

export default function YouthEvent() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.container}>
        <div className={`${styles.content} ${styles.contentReverse}`}>
          <div className={styles.imageContent}>
            <Image
              src="/images/Programs/4-youth event.png"
              alt="D-8 HEI Youth"
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
          <div className={styles.textContent}>
            <span className={styles.eyebrow}>D-8 HEI YOUTH</span>
            <h2 className={styles.title}>Young Entrepreneur Meetup & Panel Discussion</h2>
            <p className={styles.description}>
              Young Entrepreneur Meetup is a dedicated networking session designed to connect Indonesian sharia-based startups with business delegates from D-8 member countries. The session aims to foster cross-border collaboration, business exchange, and potential partnerships within the halal and Islamic economic sectors.
            </p>
            <p className={styles.description}>
              Young Entrepreneur Panel Discussion is a session within HEI Talk featuring inspiring young entrepreneurs from the halal and creative economy sectors. It serves as a platform to share insights, strategies, and experiences in building and scaling businesses within today&apos;s competitive global market.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
