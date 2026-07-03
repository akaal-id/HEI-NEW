import { Store, Users } from 'lucide-react';
import Button from '../Button/Button';
import { getDelegateMetrics } from './delegateMetrics';
import styles from './OurDelegates.module.css';

export default function OurDelegatesPreview() {
  const metrics = getDelegateMetrics();

  return (
    <section
      className={`${styles.section} ${styles.sectionPreview}`}
      id="our-delegates"
      aria-labelledby="our-delegates-title"
    >
      <div className={`hei-container ${styles.container}`}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Our Delegates</span>
          <h2 id="our-delegates-title" className={styles.title}>
            Meet the Exhibitors &amp; Buyers
          </h2>
        </header>

        <div className={styles.metricsGrid}>
          <article className={styles.metricCard}>
            <div className={styles.metricIconWrap} aria-hidden="true">
              <Store className={styles.metricIcon} size={22} />
            </div>
            <p className={styles.metricValue}>
              <span className={styles.metricNumber}>{metrics.exhibitorCount}</span>
              <span className={styles.metricLabel}>Exhibitors</span>
            </p>
            <p className={styles.metricSubtext}>
              from{' '}
              <strong>{metrics.exhibitorCountryCount}</strong>{' '}
              {metrics.exhibitorCountryCount === 1 ? 'country' : 'countries'}
            </p>
          </article>

          <article className={styles.metricCard}>
            <div className={styles.metricIconWrap} aria-hidden="true">
              <Users className={styles.metricIcon} size={22} />
            </div>
            <p className={styles.metricValue}>
              <span className={styles.metricNumber}>{metrics.buyerCount}</span>
              <span className={styles.metricLabel}>Buyers</span>
            </p>
            <p className={styles.metricSubtext}>
              from{' '}
              <strong>{metrics.buyerCountryCount}</strong>{' '}
              {metrics.buyerCountryCount === 1 ? 'country' : 'countries'}
            </p>
          </article>
        </div>

        <div className={styles.ctaWrapper}>
          <Button href="/our-delegates" variant="yellow" className={styles.viewAllButton}>
            View All Delegates
          </Button>
        </div>
      </div>
    </section>
  );
}
