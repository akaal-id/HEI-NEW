'use client';

import Image from 'next/image';
import { ArrowUpRight, Users, TrendingUp } from 'lucide-react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import buttonStyles from '../../../components/Button/Button.module.css';
import styles from './cta.module.css';

const STATS = [
  {
    icon: Users,
    value: '1.2 Billion+',
    label: 'Combined Consumer Market',
  },
  {
    icon: TrendingUp,
    value: 'USD 5 Trillion+',
    label: 'Combined GDP Across D-8',
  },
];

export default function Cta() {
  const [contentRef, contentVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [statsRef, statsVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section className={styles.section}>
      <div className={styles.decoration} aria-hidden="true">
        <Image
          src="/D8-assets/circle_D8.svg"
          alt=""
          width={1200}
          height={1200}
          className={styles.decorationImage}
        />
      </div>

      <div className={styles.container}>
        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          className={`${styles.content} ${contentVisible ? styles.visible : ''}`}
        >
          <span className={styles.eyebrow}>Indonesia 2026</span>
          <h2 className={styles.title}>
            Indonesia at the Helm:{' '}
            <span className={styles.titleAccent}>Driving the Halal Agenda Forward</span>
          </h2>
          <p className={styles.lead}>
            As the holder of the D-8 Presidency for 2026–2027, Indonesia takes on a strategic role
            in advancing the halal economic agenda on the global stage. This momentum is realized
            through the organization of the D-8 Halal Expo Indonesia 2026, an international platform
            that brings together industry players, investors, and stakeholders from across D-8
            member states to collectively build a stronger and more competitive halal ecosystem.
          </p>

          <div className={styles.subBlock}>
            <h3 className={styles.subTitle}>Your Gateway to International Authority</h3>
            <p className={styles.body}>
              A strategic B2B2G exhibition, D-8 Halal Expo Indonesia 2026 is a part of the D-8
              Summit, driving global halal trade and cooperation. More than just an exhibition, it
              is a global sourcing platform designed to bridge high-level diplomacy with real-sector
              industries.
            </p>
          </div>
        </div>

        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className={`${styles.statsRow} ${statsVisible ? styles.visible : ''}`}
        >
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <div
              key={label}
              className={styles.statCard}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={styles.statIconWrap}>
                <Icon className={styles.statIcon} />
              </div>
              <div className={styles.statText}>
                <div className={styles.statValue}>{value}</div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.callout} ${contentVisible ? styles.visible : ''}`}>
          <p className={styles.calloutText}>
            Be part of this historic momentum. Take your place in the global halal ecosystem and
            expand your business reach with us.
          </p>
          <a
            href="/register"
            className={`${buttonStyles.button} ${buttonStyles.yellow} ${styles.ctaButton}`}
          >
            <span className={buttonStyles.text}>Register Now &amp; Secure Your Spot</span>
            <div className={buttonStyles.iconContainer}>
              <ArrowUpRight className={buttonStyles.icon} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
