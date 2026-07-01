import Image from 'next/image';
import styles from './LegalPage.module.css';

type LegalPageProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export default function LegalPage({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  lastUpdated,
  children,
}: LegalPageProps) {
  return (
    <main className={styles.page}>
      <section className={styles.heroSection} aria-labelledby="legal-hero-title">
        <div className={styles.decoration} aria-hidden="true">
          <Image
            src="/D8-assets/circle_D8.svg"
            alt=""
            width={1000}
            height={1000}
            className={styles.decorationImage}
            priority
          />
        </div>

        <div className={styles.heroContainer}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 id="legal-hero-title" className={styles.heroTitle}>
            {title}
            {titleAccent ? (
              <>
                {' '}
                <span className={styles.heroTitleAccent}>{titleAccent}</span>
              </>
            ) : null}
          </h1>
          <p className={styles.heroSubtitle}>{subtitle}</p>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.contentInner}>
          <p className={styles.lastUpdated}>Last updated: {lastUpdated}</p>
          <div className={styles.legalContent}>{children}</div>
        </div>
      </div>
    </main>
  );
}
