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
              src="/images/overview.jpg"
              alt="Youth Event"
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
          <div className={styles.textContent}>
            <span className={styles.eyebrow}>YOUTH EVENT</span>
            <h2 className={styles.title}>Empowering the Next Generation</h2>
            <p className={styles.description}>
              The Youth Event at HEI 2026 is a dedicated platform for young leaders and entrepreneurs to engage with the halal economy. This program features networking opportunities, mentorship sessions, innovation showcases, and interactive workshops designed to inspire and empower the next generation of halal industry leaders.
            </p>
            <p className={styles.description}>
              Young participants will have the opportunity to connect with industry experts, learn about emerging trends in the halal economy, and showcase their innovative ideas and projects. The Youth Event fosters a collaborative environment that encourages creativity, entrepreneurship, and sustainable business practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
