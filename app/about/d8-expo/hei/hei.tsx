'use client';

import {
  Network,
  Sparkles,
  PiggyBank,
  TrendingUp,
  Globe,
  Trophy,
  Activity,
} from 'lucide-react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './hei.module.css';

const PURPOSE_PILLARS = [
  {
    icon: Network,
    title: 'International Trade Networking',
    description:
      'Building robust global trade networks based on harmonized international standards to facilitate efficient market exchange.',
  },
  {
    icon: Sparkles,
    title: 'Innovation & Digital Infrastructure',
    description:
      'Driving the development and adoption of cutting-edge solutions, including halal blockchain, digital traceability, and smart logistics to ensure global transparency and safety.',
  },
  {
    icon: PiggyBank,
    title: 'Productive Sharia Investment',
    description:
      'Strengthening Sharia-compliant finance and investment as the primary engine for sustainable and productive economic growth.',
  },
];

type MilestoneStat = { value: string; label: string };

const MILESTONES: Array<{
  icon: typeof Sparkles;
  year: string;
  title: string;
  venue: string;
  description: string;
  stats: MilestoneStat[];
}> = [
  {
    icon: Sparkles,
    year: '2018',
    title: 'The Inception',
    venue: 'Jakarta Convention Center',
    description:
      'HEI launched at JCC under the theme “Global Muslim Lifestyle,” planting the first flag for an integrated halal trade platform in Indonesia.',
    stats: [
      { value: '~100', label: 'Exhibitors' },
      { value: '5K', label: 'Visitors' },
    ],
  },
  {
    icon: TrendingUp,
    year: '2019',
    title: 'Rapid Expansion',
    venue: 'ICE BSD',
    description:
      'Scaled significantly under the theme “Halal is Everything,” marking HEI’s first major leap as a national halal industry stage.',
    stats: [
      { value: '284', label: 'Exhibitors' },
      { value: '28K', label: 'Visitors' },
    ],
  },
  {
    icon: Globe,
    year: '2023',
    title: 'Global Connectivity',
    venue: 'Jakarta Convention Center',
    description:
      'Returning to JCC, HEI strengthened its international integration and welcomed exhibitors from across four continents.',
    stats: [
      { value: '22', label: 'Countries' },
      { value: '12K', label: 'Visitors' },
    ],
  },
  {
    icon: Trophy,
    year: '2024',
    title: 'Record-Breaking Milestones',
    venue: 'ICE BSD',
    description:
      'A historic peak — the largest HEI yet, drawing audiences and exhibitors from every major halal market in the world.',
    stats: [
      { value: '41,488', label: 'Visitors' },
      { value: '140', label: 'Countries' },
      { value: '72', label: 'Exhibitors' },
    ],
  },
  {
    icon: Activity,
    year: '2025',
    title: 'Sustained Momentum',
    venue: 'ICE BSD',
    description:
      'Maintaining global reach as HEI matured into a recurring international platform for the halal trade and lifestyle industry.',
    stats: [
      { value: '34K+', label: 'Visitors' },
      { value: '130', label: 'Countries' },
      { value: '70', label: 'Booths' },
    ],
  },
];

export default function HEI() {
  const [introRef, introVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [purposeRef, purposeVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [milestonesRef, milestonesVisible] = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* OVERVIEW — what HEI is + organizer */}
        <div
          ref={introRef as React.RefObject<HTMLDivElement>}
          className={`${styles.overview} ${introVisible ? styles.visible : ''}`}
        >
          <div className={styles.overviewHeader}>
            <div className={styles.overviewHeading}>
              <span className={styles.eyebrow}>What is HEI?</span>
              <h2 className={styles.title}>
                A Global Stage for the Halal Trade & Lifestyle Industry
              </h2>
            </div>
            <p className={styles.overviewTagline}>
              Halal Expo Indonesia (HEI) is a leading Business-to-Business (B2B) halal ecosystem
              platform and a strategic global stage for the Islamic economy. It serves as a
              comprehensive hub for the halal trade and lifestyle industry, bridging local
              industrial potential with a vast international marketplace. As an integrated
              environment where innovation, regulation, and commerce converge, HEI acts as a
              primary catalyst for industry capacity-building and the integration of halal value
              chains on a worldwide scale. This international event is organized by skyconnection.
            </p>
          </div>

          <footer className={styles.keyFacts}>
            <div className={styles.factItem}>
              <span className={styles.factValue}>B2B</span>
              <span className={styles.factLabel}>Business-to-Business Format</span>
            </div>
            <span className={styles.factDivider} aria-hidden="true" />
            <div className={styles.factItem}>
              <span className={styles.factValue}>Halal</span>
              <span className={styles.factLabel}>Trade &amp; Lifestyle Industry</span>
            </div>
            <span className={styles.factDivider} aria-hidden="true" />
            <div className={styles.factItem}>
              <span className={styles.factValue}>Worldwide</span>
              <span className={styles.factLabel}>International Marketplace</span>
            </div>
            <span className={styles.factDivider} aria-hidden="true" />
            <div className={styles.factItem}>
              <span className={styles.factValue}>Skyconnection</span>
              <span className={styles.factLabel}>Official Organizer</span>
            </div>
          </footer>
        </div>

        {/* PURPOSE — split layout: sticky aside + numbered list */}
        <div className={styles.splitLayout}>
          <aside className={styles.splitAside}>
            <span className={styles.subEyebrow}>Purpose</span>
            <h3 className={styles.subTitle}>A Unified Framework for Halal Growth</h3>
            <p className={styles.subDescription}>
              HEI is built upon three core strategic pillars that drive global halal economic
              integration and unlock value across the entire industry chain.
            </p>
          </aside>

          <ol
            ref={purposeRef as React.RefObject<HTMLOListElement>}
            className={`${styles.numberedList} ${purposeVisible ? styles.visible : ''}`}
          >
            {PURPOSE_PILLARS.map((pillar, i) => (
              <li
                key={pillar.title}
                className={styles.numberedItem}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className={styles.numberedContent}>
                  <div className={styles.numberedTitleRow}>
                    <h4 className={styles.numberedTitle}>{pillar.title}</h4>
                    <pillar.icon className={styles.numberedIcon} />
                  </div>
                  <p className={styles.numberedDescription}>{pillar.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* HISTORY — milestone timeline */}
        <div className={styles.milestonesSection}>
          <header className={styles.compactHeader}>
            <div>
              <span className={styles.subEyebrow}>History</span>
              <h3 className={styles.subTitle}>From Inception to Global Stage</h3>
            </div>
            <p className={styles.compactDescription}>
              The evolution of Halal Expo Indonesia is a narrative of rapid growth and deepening
              global connectivity — from its first edition in Jakarta to a world-leading B2B halal
              platform.
            </p>
          </header>

          <div
            ref={milestonesRef as React.RefObject<HTMLDivElement>}
            className={`${styles.milestonesTimeline} ${milestonesVisible ? styles.visible : ''}`}
          >
            <div className={styles.milestonesRail} aria-hidden="true" />
            <div className={styles.milestonesTrack}>
              {MILESTONES.map(({ icon: Icon, year, title, venue, description, stats }, i) => (
                <article
                  key={year}
                  className={styles.milestoneCard}
                  style={{ transitionDelay: `${i * 110}ms` }}
                >
                  <div className={styles.milestoneMarker}>
                    <span className={styles.milestoneIndex}>{String(i + 1).padStart(2, '0')}</span>
                    <div className={styles.milestoneIconWrap}>
                      <Icon className={styles.milestoneIcon} />
                    </div>
                  </div>
                  <div className={styles.milestoneBody}>
                    <span className={styles.milestoneYear}>{year}</span>
                    <h4 className={styles.milestoneTitle}>
                      {title}
                      <span className={styles.milestoneVenue}>{venue}</span>
                    </h4>
                    <p className={styles.milestoneDescription}>{description}</p>
                    <dl className={styles.milestoneStats}>
                      {stats.map((stat) => (
                        <div key={stat.label} className={styles.milestoneStat}>
                          <dt className={styles.milestoneStatValue}>{stat.value}</dt>
                          <dd className={styles.milestoneStatLabel}>{stat.label}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
