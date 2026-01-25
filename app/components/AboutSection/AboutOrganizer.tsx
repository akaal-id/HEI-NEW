'use client';

import Image from 'next/image';
import styles from './AboutSection.module.css';

export default function AboutOrganizer() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <span className={styles.eyebrow}>ABOUT ORGANIZER</span>
            <h2 className={styles.title}>skyconnection</h2>
            <p className={styles.description}>
              skyconnection is a leading event management and business development company specializing in creating impactful international events and fostering strategic business partnerships. With a strong focus on the halal economy and international trade, skyconnection has established itself as a trusted partner for governments, businesses, and organizations seeking to expand their global reach.
            </p>
            <p className={styles.description}>
              As the organizer of HEI 2026, skyconnection brings years of expertise in event management, business facilitation, and international cooperation. The company is committed to delivering exceptional experiences that connect stakeholders, create opportunities, and drive sustainable growth in the halal economy sector.
            </p>
          </div>
          <div className={styles.imageContent}>
            <Image
              src="/Partner Logo/skyconnect logo.svg"
              alt="skyconnection"
              width={400}
              height={300}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
