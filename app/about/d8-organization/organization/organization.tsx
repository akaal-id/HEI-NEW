'use client';

import {
  TrendingUp,
  Sparkles,
  Globe2,
  HeartHandshake,
  ShoppingBag,
  Factory,
  Wheat,
  Zap,
  Plane,
  Map,
  Award,
  Handshake,
  FileSignature,
  Stamp,
  Star,
} from 'lucide-react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './organization.module.css';

const STRATEGIC_OBJECTIVES = [
  {
    icon: TrendingUp,
    title: 'Economic Diversification',
    description:
      'Creating new opportunities across various industrial sectors to reduce reliance on traditional markets.',
  },
  {
    icon: Sparkles,
    title: 'Trade Innovation',
    description:
      'Paving the way for more dynamic trade relations among member states.',
  },
  {
    icon: Globe2,
    title: 'Global Influence',
    description:
      'Increasing the participation and voice of member nations in international decision-making processes.',
  },
  {
    icon: HeartHandshake,
    title: 'Improved Livelihoods',
    description:
      'Ensuring that economic growth directly impacts the welfare and standard of living of the people.',
  },
];

const PRIORITY_SECTORS = [
  { icon: ShoppingBag, title: 'Trade', description: 'Removal of trade barriers through robust legal instruments.' },
  { icon: Factory, title: 'Industry', description: 'Collaborative manufacturing, SMEs, and the Halal industry.' },
  { icon: Wheat, title: 'Agriculture', description: 'Food security and agricultural technology cooperation.' },
  { icon: Zap, title: 'Energy', description: 'Energy security and the development of renewable energy.' },
  { icon: Plane, title: 'Transportation', description: 'Efficient logistical connectivity across continents.' },
  { icon: Map, title: 'Tourism', description: 'Cultural exchange and world-class tourist destinations.' },
];

const HOST_MEMBER = {
  code: 'ID',
  name: 'Indonesia',
  description:
    'The largest economy in Southeast Asia and a global hub for the Halal industry. Hosting the D-8 Summit 2026 and the D-8 Halal Expo Indonesia 2026.',
};

const OTHER_MEMBERS = [
  { code: 'BD', name: 'Bangladesh', description: 'Key player in global manufacturing and textile exports.' },
  { code: 'EG', name: 'Egypt', description: 'Strategic trade hub bridging Africa and Asia.' },
  { code: 'IR', name: 'Iran', description: 'Excellence in energy, technology, and natural resources.' },
  { code: 'MY', name: 'Malaysia', description: 'Pioneer in Islamic finance and Halal certification.' },
  { code: 'NG', name: 'Nigeria', description: 'Largest African economy with vast consumer potential.' },
  { code: 'PK', name: 'Pakistan', description: 'Strong agricultural sector and a young, dynamic workforce.' },
  { code: 'TR', name: 'Türkiye', description: 'Modern manufacturing hub bridging Europe and Asia.' },
  { code: 'AZ', name: 'Azerbaijan', description: 'Newest member (2025), strengthening Caucasus connectivity.' },
];

const MILESTONES = [
  {
    icon: Award,
    year: '2014',
    title: 'UN Observer Status',
    description:
      'Granted observer status at the UN General Assembly, strengthening diplomatic legitimacy.',
  },
  {
    icon: Handshake,
    year: 'Active',
    title: 'D-8 Preferential Trade Agreement',
    description:
      'Implementation of trade agreements that significantly reduce tariffs among member states.',
  },
  {
    icon: Stamp,
    year: 'Active',
    title: 'Visa & Customs Agreements',
    description:
      'Simplified business visa and customs procedures to accelerate mobility of professionals and goods.',
  },
  {
    icon: FileSignature,
    year: 'Ongoing',
    title: 'Strategic Partnerships',
    description:
      'Active collaboration with UNCTAD, UNIDO, and the Islamic Development Bank (IsDB).',
  },
];

const pad = (n: number) => String(n + 1).padStart(2, '0');

export default function Organization() {
  const [introRef, introVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [objectivesRef, objectivesVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [sectorsRef, sectorsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [featuredRef, featuredVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [chipsRef, chipsVisible] = useIntersectionObserver({ threshold: 0.05 });
  const [milestonesRef, milestonesVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* OVERVIEW — combined organization intro + brief history */}
        <div
          ref={introRef as React.RefObject<HTMLDivElement>}
          className={`${styles.overview} ${introVisible ? styles.visible : ''}`}
        >
          <div className={styles.overviewHeader}>
            <div className={styles.overviewHeading}>
              <span className={styles.eyebrow}>The Organization</span>
              <h2 className={styles.title}>Global Forum for Developing Economies</h2>
            </div>
            <p className={styles.overviewTagline}>
              A collaborative bloc of nine developing economies — shaping the future of trade,
              industry, and sustainable growth since the 1997 Istanbul Declaration.
            </p>
          </div>

          <div className={styles.overviewGrid}>
            <article className={styles.overviewColumn}>
              <span className={styles.columnLabel}>
                <span className={styles.columnIndex}>01</span>
                Overview
              </span>
              <h3 className={styles.columnTitle}>An Economic Forum of Nine Nations</h3>
              <p className={styles.body}>
                The D-8 Organization for Economic Cooperation is an international economic forum
                comprising eight developing nations with majority Muslim populations: Bangladesh,
                Egypt, Indonesia, Iran, Malaysia, Nigeria, Pakistan, and Türkiye.
              </p>
              <p className={styles.body}>
                In 2025, Azerbaijan officially joined as the ninth member, further strengthening
                D-8&apos;s position as one of the most dynamic emerging economic blocs in the world.
              </p>
            </article>

            <article className={styles.overviewColumn}>
              <span className={styles.columnLabel}>
                <span className={styles.columnIndex}>02</span>
                A Brief History
              </span>
              <h3 className={styles.columnTitle}>From Vision to Action</h3>
              <p className={styles.body}>
                The concept for the D-8 was first proposed by Prof. Dr. Necmettin Erbakan, the then
                Prime Minister of Türkiye, during a seminar titled &quot;Cooperation in Development&quot;
                held in Istanbul in October 1996.
              </p>
              <p className={styles.body}>
                This vision was formally realized on June 15, 1997, through the Istanbul Declaration,
                establishing the D-8 as an international organization for economic cooperation —
                later forming partnerships with the UN and the OIC.
              </p>
            </article>
          </div>

          <footer className={styles.keyFacts}>
            <div className={styles.factItem}>
              <span className={styles.factValue}>1997</span>
              <span className={styles.factLabel}>Established · Istanbul Declaration</span>
            </div>
            <span className={styles.factDivider} aria-hidden="true" />
            <div className={styles.factItem}>
              <span className={styles.factValue}>9</span>
              <span className={styles.factLabel}>Member Nations</span>
            </div>
            <span className={styles.factDivider} aria-hidden="true" />
            <div className={styles.factItem}>
              <span className={styles.factValue}>UN · OIC</span>
              <span className={styles.factLabel}>Strategic Partners</span>
            </div>
            <span className={styles.factDivider} aria-hidden="true" />
            <div className={styles.factItem}>
              <span className={styles.factValue}>Istanbul</span>
              <span className={styles.factLabel}>Secretariat HQ</span>
            </div>
          </footer>
        </div>

        {/* STRATEGIC OBJECTIVES — split layout: sticky aside + numbered list */}
        <div className={styles.splitLayout}>
          <aside className={styles.splitAside}>
            <span className={styles.subEyebrow}>Strategic Objectives</span>
            <h3 className={styles.subTitle}>Our Core Mission</h3>
            <p className={styles.subDescription}>
              The D-8 was founded with the primary goal of enhancing the position of developing
              nations in the global economy through four guiding principles.
            </p>
          </aside>

          <ol
            ref={objectivesRef as React.RefObject<HTMLOListElement>}
            className={`${styles.numberedList} ${objectivesVisible ? styles.visible : ''}`}
          >
            {STRATEGIC_OBJECTIVES.map((obj, i) => (
              <li
                key={obj.title}
                className={styles.numberedItem}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <span className={styles.numberLabel}>{pad(i)}</span>
                <div className={styles.numberedContent}>
                  <div className={styles.numberedTitleRow}>
                    <h4 className={styles.numberedTitle}>{obj.title}</h4>
                    <obj.icon className={styles.numberedIcon} />
                  </div>
                  <p className={styles.numberedDescription}>{obj.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* PRIORITY SECTORS — compact horizontal icon rows */}
        <div className={styles.sectorsSection}>
          <div
            ref={sectorsRef as React.RefObject<HTMLDivElement>}
            className={`${styles.sectorsList} ${sectorsVisible ? styles.visible : ''}`}
          >
            <header className={`${styles.compactHeader} ${styles.sectorsListHeader}`}>
              <div>
                <span className={styles.subEyebrow}>The Six Priority Sectors</span>
                <h3 className={styles.subTitle}>Pillars of the Future Economy</h3>
              </div>
              <p className={styles.compactDescription}>
                D-8 cooperation is comprehensive, covering the key pillars that underpin sustainable,
                shared growth across member states.
              </p>
            </header>

            {PRIORITY_SECTORS.map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className={styles.sectorRow}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className={styles.sectorIconWrap}>
                  <Icon className={styles.sectorIcon} />
                </div>
                <div className={styles.sectorText}>
                  <h4 className={styles.sectorTitle}>{title}</h4>
                  <p className={styles.sectorDescription}>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MEMBER PROFILES — featured host + chip grid */}
        <div className={styles.membersSection}>
          <header className={styles.subsectionHeader}>
            <span className={styles.subEyebrow}>Member Profiles</span>
            <h3 className={styles.subTitle}>9 Pillars of Global Growth</h3>
            <p className={styles.subDescription}>
              The D-8 unites geographic diversity from Southeast Asia to West Africa, creating a
              massive collective market.
            </p>
          </header>

          <article
            ref={featuredRef as React.RefObject<HTMLElement>}
            className={`${styles.featuredMember} ${featuredVisible ? styles.visible : ''}`}
          >
            <div className={styles.featuredAside}>
              <span className={styles.featuredCode}>{HOST_MEMBER.code}</span>
              <span className={styles.featuredBadge}>
                <Star className={styles.featuredBadgeIcon} />
                Host Country · Summit 2026
              </span>
            </div>
            <div className={styles.featuredBody}>
              <h4 className={styles.featuredName}>{HOST_MEMBER.name}</h4>
              <p className={styles.featuredDescription}>{HOST_MEMBER.description}</p>
            </div>
          </article>

          <div
            ref={chipsRef as React.RefObject<HTMLDivElement>}
            className={`${styles.memberChipGrid} ${chipsVisible ? styles.visible : ''}`}
          >
            {OTHER_MEMBERS.map((m, i) => (
              <article
                key={m.code}
                className={styles.memberChip}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className={styles.chipCode}>{m.code}</span>
                <h4 className={styles.chipName}>{m.name}</h4>
                <p className={styles.chipDescription}>{m.description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* MILESTONES — timeline */}
        <div className={styles.milestonesSection}>
          <header className={styles.compactHeader}>
            <div>
              <span className={styles.subEyebrow}>Significant Milestones</span>
              <h3 className={styles.subTitle}>Achievements Through the Decades</h3>
            </div>
            <p className={styles.compactDescription}>
              Over nearly three decades, the D-8 has reached several historical milestones that
              have shaped its global standing.
            </p>
          </header>

          <div
            ref={milestonesRef as React.RefObject<HTMLDivElement>}
            className={`${styles.timeline} ${milestonesVisible ? styles.visible : ''}`}
          >
            <div className={styles.timelineRail} aria-hidden="true" />
            {MILESTONES.map(({ icon: Icon, year, title, description }, i) => (
              <article
                key={title}
                className={styles.timelineItem}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className={styles.timelineMarker}>
                  <Icon className={styles.timelineIcon} />
                </div>
                <div className={styles.timelineBody}>
                  <span className={styles.timelineYear}>{year}</span>
                  <h4 className={styles.timelineTitle}>{title}</h4>
                  <p className={styles.timelineDescription}>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
