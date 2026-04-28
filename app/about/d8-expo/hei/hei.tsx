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

const KEY_FACTS = [
  { value: 'B2B', label: 'Business-to-Business Format' },
  { value: 'Halal', label: 'Trade & Lifestyle Industry' },
  { value: 'Worldwide', label: 'International Marketplace' },
  { value: 'Skyconnection', label: 'Official Organizer' },
];

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
      'HEI launched at JCC under the theme "Global Muslim Lifestyle," planting the first flag for an integrated halal trade platform in Indonesia.',
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
      'Scaled significantly under the theme "Halal is Everything," marking HEI\u2019s first major leap as a national halal industry stage.',
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
      'A historic peak \u2014 the largest HEI yet, drawing audiences and exhibitors from every major halal market in the world.',
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
        {/* OVERVIEW — centered magazine-style intro */}
        <div
          ref={introRef as React.RefObject<HTMLDivElement>}
          className={`${styles.overview} ${introVisible ? styles.visible : ''}`}
        >
          <span className={styles.eyebrow}>What is HEI?</span>
          <h2 className={styles.heroTitle}>
            A Global Stage for the{' '}
            <span className={styles.heroAccent}>Halal Trade & Lifestyle</span>{' '}
            Industry
          </h2>
          <p className={styles.heroLead}>
            Halal Expo Indonesia (HEI) is a leading Business-to-Business (B2B) halal ecosystem
            platform and a strategic global stage for the Islamic economy. It serves as a
            comprehensive hub for the halal trade and lifestyle industry, bridging local
            industrial potential with a vast international marketplace. As an integrated
            environment where innovation, regulation, and commerce converge, HEI acts as a
            primary catalyst for industry capacity-building and the integration of halal value
            chains on a worldwide scale. This international event is organized by skyconnection.
          </p>

          <div className={styles.factStrip}>
            {KEY_FACTS.map((fact) => (
              <div key={fact.value} className={styles.factChip}>
                <span className={styles.factChipValue}>{fact.value}</span>
                <span className={styles.factChipLabel}>{fact.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PURPOSE — vertical pillar cards */}
        <div className={styles.purposeSection}>
          <header className={styles.purposeHeader}>
            <span className={styles.subEyebrow}>Purpose</span>
            <h3 className={styles.subTitle}>A Unified Framework for Halal Growth</h3>
            <p className={styles.purposeDesc}>
              HEI is built upon three core strategic pillars that drive global halal economic
              integration and unlock value across the entire industry chain.
            </p>
          </header>

          <div
            ref={purposeRef as React.RefObject<HTMLDivElement>}
            className={`${styles.pillarGrid} ${purposeVisible ? styles.visible : ''}`}
          >
            {PURPOSE_PILLARS.map((pillar, i) => (
              <article
                key={pillar.title}
                className={styles.pillarCard}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={styles.pillarAccent} aria-hidden="true" />
                <div className={styles.pillarHead}>
                  <span className={styles.pillarIndex}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <pillar.icon className={styles.pillarIcon} />
                </div>
                <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                <p className={styles.pillarDescription}>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* HISTORY — vertical alternating timeline */}
        <div className={styles.historySection}>
          <header className={styles.purposeHeader}>
            <span className={styles.subEyebrow}>History</span>
            <h3 className={styles.subTitle}>From Inception to Global Stage</h3>
            <p className={styles.purposeDesc}>
              The evolution of Halal Expo Indonesia is a narrative of rapid growth and deepening
              global connectivity — from its first edition in Jakarta to a world-leading B2B halal
              platform.
            </p>
          </header>

          <div
            ref={milestonesRef as React.RefObject<HTMLDivElement>}
            className={`${styles.verticalTimeline} ${milestonesVisible ? styles.visible : ''}`}
          >
            <div className={styles.timelineSpine} aria-hidden="true" />

            {MILESTONES.map(({ icon: Icon, year, title, venue, description, stats }, i) => (
              <div
                key={year}
                className={`${styles.timelineNode} ${i % 2 === 1 ? styles.timelineNodeRight : ''}`}
                style={{ transitionDelay: `${i * 140}ms` }}
              >
                <div className={styles.timelineDot} aria-hidden="true">
                  <Icon className={styles.timelineDotIcon} />
                </div>

                <article className={styles.timelineCard}>
                  <div className={styles.timelineCardHead}>
                    <span className={styles.timelineYear}>{year}</span>
                    <span className={styles.timelineVenue}>{venue}</span>
                  </div>
                  <h4 className={styles.timelineTitle}>{title}</h4>
                  <p className={styles.timelineDesc}>{description}</p>
                  <dl className={styles.timelineStats}>
                    {stats.map((stat) => (
                      <div key={stat.label} className={styles.timelineStat}>
                        <dt className={styles.timelineStatValue}>{stat.value}</dt>
                        <dd className={styles.timelineStatLabel}>{stat.label}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
