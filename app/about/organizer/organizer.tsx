'use client';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './organizer.module.css';

const KEY_STATS = [
  { value: '15+', label: 'Years Operating' },
  { value: 'MICE', label: 'Specialization' },
  { value: '9+', label: 'Countries Reached' },
  { value: 'End-to-end', label: 'Delivery Capability' },
];

const TRUSTED_CLIENTS = [
  {
    category: 'Government',
    names: ['Kementerian Dalam Negeri', 'Kementerian Pemuda dan Olahraga', 'Other State Institutions'],
  },
  {
    category: 'State-Owned',
    names: ['Pertamina', 'BPJS Ketenagakerjaan'],
  },
  {
    category: 'Multinational',
    names: ['Schlumberger', 'Indosat', 'Other Global Partners'],
  },
  {
    category: 'High-Profile',
    names: ['Government Programs', 'Sporting Events', 'Trade Exhibitions'],
  },
];

const HALAL_MILESTONES = [
  {
    year: '2018',
    title: 'HEI Launch Edition',
    description:
      'Skyconnection initiated Halal Expo Indonesia as a signature halal economy platform.',
  },
  {
    year: '2019',
    title: 'Scale Expansion',
    description:
      'HEI expanded in scope and market participation, strengthening B2B halal connectivity.',
  },
  {
    year: '2023',
    title: 'International Reconnect',
    description:
      'The platform returned stronger and broadened cross-border engagement.',
  },
  {
    year: '2024',
    title: 'Peak Performance',
    description:
      'HEI reached a record-scale edition with larger global participation and business outcomes.',
  },
  {
    year: '2025',
    title: 'Sustained Momentum',
    description:
      'Skyconnection maintained growth and impact across Indonesia\u2019s halal ecosystem.',
  },
];

const EXECUTION_AREAS = [
  {
    title: 'Concept Development',
    description:
      'Building strategic event frameworks aligned with policy priorities and business outcomes.',
  },
  {
    title: 'Stakeholder Coordination',
    description:
      'Synchronizing ministries, enterprises, associations, and international partners end-to-end.',
  },
  {
    title: 'On-site Operations',
    description:
      'Delivering precise, large-scale operational execution with high reliability and professionalism.',
  },
  {
    title: 'Business Facilitation',
    description:
      'Driving matchmaking, partnerships, and trade opportunities across local and global markets.',
  },
];

export default function Organizer() {
  const [profileRef, profileVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [statsRef, statsVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [clientsRef, clientsVisible] = useIntersectionObserver({ threshold: 0.08 });
  const [timelineRef, timelineVisible] = useIntersectionObserver({ threshold: 0.05 });
  const [capRef, capVisible] = useIntersectionObserver({ threshold: 0.08 });

  return (
    <>
      {/* ─── COMPANY PROFILE — editorial split ─── */}
      <section className={styles.profileSection}>
        <div
          ref={profileRef as React.RefObject<HTMLDivElement>}
          className={`${styles.profileInner} ${profileVisible ? styles.visible : ''}`}
        >
          <div className={styles.profileLeft}>
            <span className={styles.profileLabel}>Official Organizer</span>
            <h2 className={styles.profileHeadline}>
              A Decade of
              <br />
              Delivering <em>Impactful</em>
              <br />
              Events
            </h2>
          </div>
          <div className={styles.profileRight}>
            <div className={styles.profileDivider} aria-hidden="true" />
            <div className={styles.profileCopy}>
              <p>
                Skyconnection by PT. Angan Kreasi Semesta has operated since 2010 as
                an event management and business development company specializing in
                MICE.
              </p>
              <p>
                The team has built a strong reputation delivering major national and
                international events — from government-commissioned programs and state
                sporting events to global trade exhibitions and signature halal economy
                platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KEY STATS — full-bleed counters ─── */}
      <section className={styles.statsSection}>
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className={`${styles.statsGrid} ${statsVisible ? styles.visible : ''}`}
        >
          {KEY_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={styles.statCell}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TRUSTED CLIENTS — column-based ─── */}
      <section className={styles.clientsSection}>
        <div className={styles.clientsContainer}>
          <div className={styles.clientsHeader}>
            <span className={styles.sectionEyebrow}>Trusted by Institutions</span>
            <h3 className={styles.sectionTitle}>Cross&#8209;Sector Confidence</h3>
            <p className={styles.sectionLead}>
              Over more than a decade, Skyconnection has earned trust from
              ministries, SOEs, and multinational corporations — including Pertamina,
              BPJS Ketenagakerjaan, Schlumberger, and Indosat.
            </p>
          </div>

          <div
            ref={clientsRef as React.RefObject<HTMLDivElement>}
            className={`${styles.clientsGrid} ${clientsVisible ? styles.visible : ''}`}
          >
            {TRUSTED_CLIENTS.map(({ category, names }, i) => (
              <div
                key={category}
                className={styles.clientColumn}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className={styles.clientCategory}>{category}</span>
                <ul className={styles.clientList}>
                  {names.map((n) => (
                    <li key={n} className={styles.clientName}>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HEI EDITIONS — staggered cards ─── */}
      <section className={styles.timelineSection}>
        <div className={styles.timelineContainer}>
          <div className={styles.timelineHeader}>
            <span className={styles.sectionEyebrow}>Halal Economy Track Record</span>
            <h3 className={styles.sectionTitle}>HEI Across Editions</h3>
            <p className={styles.sectionLead}>
              Since 2018, Skyconnection has driven Halal Expo Indonesia across five
              editions — connecting thousands of businesses, buyers, and stakeholders
              across borders.
            </p>
          </div>

          <div
            ref={timelineRef as React.RefObject<HTMLDivElement>}
            className={`${styles.editionsGrid} ${timelineVisible ? styles.visible : ''}`}
          >
            {HALAL_MILESTONES.map(({ year, title, description }, i) => (
              <article
                key={year}
                className={styles.editionCard}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className={styles.editionYear}>{year}</span>
                <h4 className={styles.editionTitle}>{title}</h4>
                <p className={styles.editionDesc}>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAPABILITIES — dark section with numbered blocks ─── */}
      <section className={styles.capSection}>
        <div className={styles.capContainer}>
          <div className={styles.capHeader}>
            <span className={styles.capEyebrow}>D-8 HEI 2026</span>
            <h3 className={styles.capTitle}>
              Organizing the 2026 Global&nbsp;Platform
            </h3>
            <p className={styles.capLead}>
              Aligned with Indonesia&apos;s D-8 Presidency for 2026–2027,
              Skyconnection is committed to delivering a world-class platform that
              strengthens Indonesia&apos;s role in the global halal economy.
            </p>
          </div>

          <div
            ref={capRef as React.RefObject<HTMLDivElement>}
            className={`${styles.capGrid} ${capVisible ? styles.visible : ''}`}
          >
            {EXECUTION_AREAS.map((area, i) => (
              <div
                key={area.title}
                className={styles.capBlock}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className={styles.capNumber}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className={styles.capBlockTitle}>{area.title}</h4>
                <p className={styles.capBlockDesc}>{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
