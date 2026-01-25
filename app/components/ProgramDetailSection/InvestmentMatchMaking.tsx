'use client';

import Image from 'next/image';
import styles from './ProgramDetailSection.module.css';

export default function InvestmentMatchMaking() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <span className={styles.eyebrow}>INVESTMENT MATCH MAKING</span>
            <h2 className={styles.title}>Connecting Businesses with Investors</h2>
            <p className={styles.description}>
              Investment Matchmaking at HEI 2026 connects businesses seeking funding with investors looking for halal economy opportunities. This program facilitates strategic investment partnerships that drive growth and innovation in the halal sector.
            </p>
            <p className={styles.description}>
              Through carefully curated matchmaking sessions, businesses can present their investment opportunities to qualified investors, while investors can discover promising ventures aligned with their investment criteria and values. This platform creates win-win scenarios that benefit both parties and contribute to the overall development of the halal economy.
            </p>
          </div>
          <div className={styles.imageContent}>
            <Image
              src="/images/overview.jpg"
              alt="Investment Match Making"
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
