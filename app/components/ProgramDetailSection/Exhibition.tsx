'use client';

import Image from 'next/image';
import styles from './ProgramDetailSection.module.css';

export default function Exhibition() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <span className={styles.eyebrow}>EXHIBITION</span>
            <h2 className={styles.title}>Halal Products & Services Exhibition</h2>
            <p className={styles.description}>
              The Exhibition at HEI 2026 showcases a comprehensive range of halal products and services from around the world. Exhibitors from various industries including food & beverage, pharmaceuticals, cosmetics, fashion, finance, and tourism will present their halal-certified offerings to a global audience.
            </p>
            <p className={styles.description}>
              This platform provides businesses with the opportunity to showcase their products, connect with potential buyers, investors, and partners, and expand their market reach in the rapidly growing halal economy. With over 100 companies expected to participate, the exhibition serves as a central hub for halal trade and business networking.
            </p>
          </div>
          <div className={styles.imageContent}>
            <Image
              src="/images/overview.jpg"
              alt="Exhibition"
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
