'use client';

import Image from 'next/image';
import styles from './ProgramDetailSection.module.css';

export default function D8HEITalk() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <span className={styles.eyebrow}>D-8 HEI TALK</span>
            <h2 className={styles.title}>Knowledge Sharing & Insights</h2>
            <p className={styles.description}>
              D-8 HEI Talk features approximately 15 sessions of insightful discussions, presentations, and panel sessions led by industry experts, thought leaders, and policymakers. These sessions cover a wide range of topics relevant to the halal economy, including market trends, regulatory frameworks, innovation, and best practices.
            </p>
            <p className={styles.description}>
              Participants will gain valuable insights into the latest developments in the halal industry, learn from successful case studies, and engage in meaningful discussions about the future of the halal economy. The talks provide a platform for knowledge exchange and collaborative learning among all stakeholders.
            </p>
          </div>
          <div className={styles.imageContent}>
            <Image
              src="/images/overview.jpg"
              alt="D-8 HEI Talk"
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
