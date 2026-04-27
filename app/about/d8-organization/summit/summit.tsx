'use client';

import { Fragment } from 'react';
import {
  ScrollText,
  Shield,
  Globe,
  FileText,
  Users,
  CalendarDays,
  PenLine,
  Target,
  Wrench,
  Rocket,
} from 'lucide-react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './summit.module.css';

const STRATEGIC_GOALS = [
  {
    icon: ScrollText,
    title: 'Establish Policy Frameworks',
    description:
      'Approving major agreements and declarations that facilitate smoother trade and investment flows.',
  },
  {
    icon: Shield,
    title: 'Strengthen Collective Resilience',
    description:
      'Developing unified strategies to address global economic shifts and stay competitive on the world stage.',
  },
  {
    icon: Globe,
    title: 'Expand Global Reach',
    description:
      'Setting trade targets and building strategic alliances with other international organizations and non-member states.',
  },
];

const SUMMIT_ACTIVITIES = [
  {
    icon: FileText,
    title: "Leaders' Declaration",
    description:
      'Issuance of formal communiqués (e.g., Istanbul or Dhaka Declarations) outlining the next chapter of cooperation.',
  },
  {
    icon: Users,
    title: 'Ministerial Council Meetings',
    description:
      'Ministers of Foreign Affairs and relevant sectors refine the technical aspects of cooperation.',
  },
  {
    icon: CalendarDays,
    title: 'Side Events & Business Forums',
    description:
      'Platforms like the D-8 Halal Expo and Business Councils connect government policies with real business opportunities.',
  },
  {
    icon: PenLine,
    title: 'International Accords',
    description:
      'Signing crucial treaties such as the Preferential Trade Agreement (PTA) and Visa Simplification.',
  },
];

const PURPOSE_PILLARS = [
  {
    icon: Target,
    title: 'Commitment is Synchronized',
    description:
      'Member states align national policies with the collective goals of the D-8.',
  },
  {
    icon: Wrench,
    title: 'Obstacles are Removed',
    description:
      'High-level dialogue resolves complex trade barriers that cannot be solved at a technical level alone.',
  },
  {
    icon: Rocket,
    title: 'Future-Proofing the Economy',
    description:
      'The summit identifies emerging sectors—digital and Halal economies—to lead the next wave of growth.',
  },
];

const pad = (n: number) => String(n + 1).padStart(2, '0');

export default function Summit() {
  const [introRef, introVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [halalRef, halalVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [goalsRef, goalsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [activitiesRef, activitiesVisible] = useIntersectionObserver({ threshold: 0.05 });
  const [purposeRef, purposeVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* INTRO — top, asymmetric two-column */}
        <div
          ref={introRef as React.RefObject<HTMLDivElement>}
          className={`${styles.intro} ${introVisible ? styles.visible : ''}`}
        >
          <div className={styles.introHeader}>
            <span className={styles.eyebrow}>The Summit</span>
            <h2 className={styles.title}>
              The Pinnacle of{' '}
              <span className={styles.titleAccent}>Economic Diplomacy</span>
            </h2>
          </div>
          <p className={styles.lead}>
            The D-8 Summit is the supreme organ of the organization, serving as the highest-level
            assembly where Heads of State and Government from member nations convene. Held biennially,
            this prestigious forum acts as the ultimate decision-making body, setting the strategic
            direction and policy frameworks that guide the D-8&apos;s evolution as a global economic force.
          </p>
        </div>

        {/* HALAL — feature card */}
        <div
          ref={halalRef as React.RefObject<HTMLDivElement>}
          className={`${styles.halalCard} ${halalVisible ? styles.visible : ''}`}
        >
          <div className={styles.halalContent}>
            <div className={styles.halalTop}>
              <span className={styles.subEyebrow}>Halal Economy</span>
              <h3 className={styles.subTitle}>Championing the Global Halal Economy</h3>
            </div>
            <div className={styles.halalDescGrid}>
              <p className={styles.body}>
                Within the D-8 framework, the halal economy has emerged as a rapidly growing sector
                with strong potential to enhance trade, investment, and collaboration among member
                states. D-8 nations collectively represent a significant share of the global halal
                market — spanning culinary products, fashion, pharmaceuticals, education, and Islamic
                finance — established to promote sustainable development and strengthen global
                economic cooperation.
              </p>
              <p className={styles.body}>
                At its highest level, the D-8 Summit serves as a premier forum where world leaders
                align policies and establish strategic trade partnerships to transform economic
                visions into actionable strategies for shared global progress. With Indonesia hosting
                the D-8 Summit in 2026, a new chapter of global economic synergy is unfolding,
                positioning the nation at the heart of the global halal ecosystem.
              </p>
            </div>
          </div>
        </div>

        {/* STRATEGIC GOALS — manifest columns with bottom accent */}
        <div className={styles.goalsSection}>
          <header className={styles.centeredHeader}>
            <span className={styles.subEyebrow}>Strategic Goals & Objectives</span>
            <h3 className={styles.subTitle}>Accelerating Economic Integration</h3>
            <p className={styles.subDescriptionCentered}>
              The primary objective of the D-8 Summit is to foster high-level political will to
              accelerate economic integration. The summit aims to:
            </p>
          </header>

          <div
            ref={goalsRef as React.RefObject<HTMLDivElement>}
            className={`${styles.manifestGrid} ${goalsVisible ? styles.visible : ''}`}
          >
            {STRATEGIC_GOALS.map(({ icon: Icon, title, description }, i) => (
              <article
                key={title}
                className={styles.manifestColumn}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={styles.manifestHead}>
                  <span className={styles.manifestIndex}>{pad(i)}</span>
                  <Icon className={styles.manifestIcon} />
                </div>
                <h4 className={styles.manifestTitle}>{title}</h4>
                <p className={styles.manifestDescription}>{description}</p>
                <span className={styles.manifestAccent} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>

        {/* SUMMIT ACTIVITIES — split sticky aside + objective list */}
        <div className={styles.activitiesSection}>
          <aside className={styles.activitiesAside}>
            <span className={styles.subEyebrow}>What Happens at the Summit</span>
            <h3 className={styles.subTitle}>A Series of High-Stakes Engagements</h3>
            <p className={styles.subDescription}>
              The Summit is more than just a meeting of leaders — it is a comprehensive series of
              decisive engagements.
            </p>
          </aside>

          <ol
            ref={activitiesRef as React.RefObject<HTMLOListElement>}
            className={`${styles.activitiesList} ${activitiesVisible ? styles.visible : ''}`}
          >
            {SUMMIT_ACTIVITIES.map(({ icon: Icon, title, description }, i) => (
              <li
                key={title}
                className={styles.activityItem}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className={styles.activityContent}>
                  <div className={styles.activityTitleRow}>
                    <h4 className={styles.activityTitle}>{title}</h4>
                    <Icon className={styles.activityIcon} />
                  </div>
                  <p className={styles.activityDescription}>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* PURPOSE — minimal stat row with dividers */}
        <div className={styles.purposeSection}>
          <header className={styles.minimalHeader}>
            <span className={styles.subEyebrow}>Why the Summit Matters</span>
            <h3 className={styles.minimalTitle}>Transforming Vision Into Reality</h3>
          </header>

          <div
            ref={purposeRef as React.RefObject<HTMLDivElement>}
            className={`${styles.statRow} ${purposeVisible ? styles.visible : ''}`}
          >
            {PURPOSE_PILLARS.map(({ icon: Icon, title, description }, i) => (
              <Fragment key={title}>
                {i > 0 && <span className={styles.statDivider} aria-hidden="true" />}
                <div
                  className={styles.statItem}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <Icon className={styles.statIcon} />
                  <h4 className={styles.statTitle}>{title}</h4>
                  <p className={styles.statDescription}>{description}</p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
