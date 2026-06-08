'use client';

import Image from 'next/image';
import styles from './ProgramDetailSection.module.css';

export default function D8CultureFestival() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.container}>
        <div className={`${styles.content} ${styles.contentReverse}`}>
          <div className={styles.imageContent}>
            <Image
              src="/images/overview.jpg"
              alt="D-8 HEI Cultural Fest"
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
          <div className={styles.textContent}>
            <span className={styles.eyebrow}>D-8 HEI CULTURAL FEST</span>
            <h2 className={styles.title}>Celebrating Cultural Diversity</h2>
            <p className={styles.description}>
              The D-8 HEI Cultural Fest celebrates the rich cultural heritage and diversity of the D-8 member countries. This vibrant event showcases traditional arts, music, cuisine, fashion, and cultural performances that reflect the unique identities of each member nation.
            </p>
            <p className={styles.description}>
              Through cultural exhibitions, performances, and interactive experiences, the festival promotes cross-cultural understanding, appreciation, and unity among the D-8 nations. It serves as a reminder that economic cooperation is strengthened by cultural exchange and mutual respect.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
