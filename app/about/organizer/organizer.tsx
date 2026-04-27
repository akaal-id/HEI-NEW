'use client';

import {
  Landmark,
  Building2,
  BriefcaseBusiness,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Globe,
  Trophy,
  Activity,
  Lightbulb,
  Users,
  Settings,
  Handshake,
} from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './organizer.module.css';

const TRUSTED_CLIENTS = [
  { icon: Landmark, title: 'Government Ministries', description: 'Kementerian Dalam Negeri, Kementerian Pemuda dan Olahraga, and other state institutions.' },
  { icon: Building2, title: 'State-Owned Enterprises', description: 'Trusted by national strategic entities including Pertamina and BPJS Ketenagakerjaan.' },
  { icon: BriefcaseBusiness, title: 'Multinational Corporations', description: 'Global partners such as Schlumberger, Indosat, and other international stakeholders.' },
  { icon: ShieldCheck, title: 'High-Stakes Programs', description: 'Proven delivery for government-commissioned programs and state sporting events.' },
];

const HALAL_MILESTONES = [
  { icon: Sparkles, year: '2018', title: 'HEI Launch Edition', description: 'Skyconnection initiated Halal Expo Indonesia as a signature halal economy platform.' },
  { icon: TrendingUp, year: '2019', title: 'Scale Expansion', description: 'HEI expanded in scope and market participation, strengthening B2B halal connectivity.' },
  { icon: Globe, year: '2023', title: 'International Reconnect', description: 'The platform returned stronger and broadened cross-border engagement.' },
  { icon: Trophy, year: '2024', title: 'Peak Performance', description: 'HEI reached a record-scale edition with larger global participation and business outcomes.' },
  { icon: Activity, year: '2025', title: 'Sustained Momentum', description: 'Skyconnection maintained growth and impact across Indonesia’s halal ecosystem.' },
];

const EXECUTION_AREAS = [
  { icon: Lightbulb, title: 'Concept Development', description: 'Building strategic event frameworks aligned with policy priorities and business outcomes.' },
  { icon: Users, title: 'Stakeholder Coordination', description: 'Synchronizing ministries, enterprises, associations, and international partners end-to-end.' },
  { icon: Settings, title: 'On-site Operations', description: 'Delivering precise, large-scale operational execution with high reliability and professionalism.' },
  { icon: Handshake, title: 'Business Facilitation', description: 'Driving matchmaking, partnerships, and trade opportunities across local and global markets.' },
];

export default function Organizer() {
  const [overviewRef, overviewVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [clientsRef, clientsVisible] = useIntersectionObserver({ threshold: 0.08 });
  const [milestonesRef, milestonesVisible] = useIntersectionObserver({ threshold: 0.08 });
  const [executionRef, executionVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          ref={overviewRef as React.RefObject<HTMLDivElement>}
          className={`${styles.overview} ${overviewVisible ? styles.visible : ''}`}
        >
          <div className={styles.overviewHeader}>
            <div className={styles.overviewHeading}>
              <span className={styles.eyebrow}>Official Organizer</span>
              <h2 className={styles.title}>Decade of Delivering Impactful Events</h2>
            </div>
            <p className={styles.overviewTagline}>
              Skyconnection by PT. Angan Kreasi Semesta has operated since 2010 as an event
              management and business development company specializing in MICE. The team has built
              a strong reputation delivering major national and international events from
              government-commissioned programs and state sporting events to global trade
              exhibitions and signature halal economy platforms.
            </p>
          </div>

          <footer className={styles.keyFacts}>
            <div className={styles.factItem}>
              <span className={styles.factValue}>Since 2010</span>
              <span className={styles.factLabel}>Operating Experience</span>
            </div>
            <span className={styles.factDivider} aria-hidden="true" />
            <div className={styles.factItem}>
              <span className={styles.factValue}>MICE</span>
              <span className={styles.factLabel}>Core Specialization</span>
            </div>
            <span className={styles.factDivider} aria-hidden="true" />
            <div className={styles.factItem}>
              <span className={styles.factValue}>National + International</span>
              <span className={styles.factLabel}>Event Scale</span>
            </div>
            <span className={styles.factDivider} aria-hidden="true" />
            <div className={styles.factItem}>
              <span className={styles.factValue}>End-to-End</span>
              <span className={styles.factLabel}>Execution Capability</span>
            </div>
          </footer>
        </div>

        <div className={styles.membersSection}>
          <header className={styles.compactHeader}>
            <div>
              <span className={styles.subEyebrow}>Trusted by Institutions</span>
              <h3 className={styles.subTitle}>Cross-Sector Confidence</h3>
            </div>
            <p className={styles.compactDescription}>
              Over more than a decade, Skyconnection has earned trust from ministries, SOEs, and
              multinational corporations including Pertamina, BPJS Ketenagakerjaan, Schlumberger,
              and Indosat.
            </p>
          </header>

          <div
            ref={clientsRef as React.RefObject<HTMLDivElement>}
            className={`${styles.membersGrid} ${clientsVisible ? styles.visible : ''}`}
          >
            {TRUSTED_CLIENTS.map(({ icon: Icon, title, description }, i) => (
              <article
                key={title}
                className={styles.memberCard}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={styles.memberCardHeader}>
                  <span className={styles.memberCode}>{String(i + 1).padStart(2, '0')}</span>
                  <Icon className={styles.memberIcon} />
                </div>
                <div className={styles.memberCardBody}>
                  <h4 className={styles.memberName}>{title}</h4>
                  <p className={styles.memberDescription}>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.milestonesSection}>
          <header className={styles.compactHeader}>
            <div>
              <span className={styles.subEyebrow}>Halal Economy Track Record</span>
              <h3 className={styles.subTitle}>HEI Growth Across Editions</h3>
            </div>
            <p className={styles.compactDescription}>
              Since 2018, Skyconnection has driven Halal Expo Indonesia across 2018, 2019, 2023,
              2024, and 2025, connecting thousands of businesses, buyers, and stakeholders.
            </p>
          </header>

          <div
            ref={milestonesRef as React.RefObject<HTMLDivElement>}
            className={`${styles.milestonesTimeline} ${milestonesVisible ? styles.visible : ''}`}
          >
            <div className={styles.milestonesRail} aria-hidden="true" />
            <div className={styles.milestonesTrack}>
              {HALAL_MILESTONES.map(({ icon: Icon, year, title, description }, i) => (
                <article
                  key={year}
                  className={styles.milestoneCard}
                  style={{ transitionDelay: `${i * 95}ms` }}
                >
                  <div className={styles.milestoneMarker}>
                    <span className={styles.milestoneIndex}>{String(i + 1).padStart(2, '0')}</span>
                    <div className={styles.milestoneIconWrap}>
                      <Icon className={styles.milestoneIcon} />
                    </div>
                  </div>
                  <div className={styles.milestoneBody}>
                    <span className={styles.milestoneYear}>{year}</span>
                    <h4 className={styles.milestoneTitle}>{title}</h4>
                    <p className={styles.milestoneDescription}>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.splitLayout}>
          <aside className={styles.splitAside}>
            <span className={styles.subEyebrow}>D-8 HEI 2026</span>
            <h3 className={styles.subTitle}>Organizing the 2026 Global Platform</h3>
            <p className={styles.subDescription}>
              Aligned with Indonesia&apos;s D-8 Presidency for 2026-2027, Skyconnection is committed
              to delivering a world-class platform that strengthens Indonesia&apos;s role in the global
              halal economy.
            </p>
          </aside>

          <ol
            ref={executionRef as React.RefObject<HTMLOListElement>}
            className={`${styles.numberedList} ${executionVisible ? styles.visible : ''}`}
          >
            {EXECUTION_AREAS.map((area, i) => (
              <li
                key={area.title}
                className={styles.numberedItem}
                style={{ transitionDelay: `${i * 85}ms` }}
              >
                <div className={styles.numberedContent}>
                  <div className={styles.numberedTitleRow}>
                    <h4 className={styles.numberedTitle}>{area.title}</h4>
                    <area.icon className={styles.numberedIcon} />
                  </div>
                  <p className={styles.numberedDescription}>{area.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
