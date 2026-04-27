'use client';

import {
  Globe2,
  Cpu,
  TrendingUp,
  Users,
  Wheat,
  Shirt,
  Factory,
  Coins,
  Globe,
  ShieldCheck,
  GraduationCap,
  Plane,
  HandHeart,
} from 'lucide-react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './d8hei.module.css';

const TARGET_GOALS = [
  {
    icon: Globe2,
    title: 'Unified Growth',
    description:
      'Create a unified framework for global halal growth by establishing international trade networks based on harmonized standards.',
  },
  {
    icon: Cpu,
    title: 'Technological Advancement',
    description:
      'Drive the development of innovative technologies, including halal blockchain, digital traceability, and smart logistics.',
  },
  {
    icon: TrendingUp,
    title: 'Economic Impact',
    description:
      'Strengthen Islamic finance and investment as the primary engine for productive economic growth across member states.',
  },
  {
    icon: Users,
    title: 'Market Access',
    description: 'Tap into a combined market of more than a billion consumers across D-8 Member States.',
    highlight: { value: '1.2 Billion+', label: 'people across D-8 nations' },
  },
];

const SECTORS = [
  {
    icon: Wheat,
    title: 'Halal Food, Beverage & Agribusiness',
    description: 'From upstream solutions like smart farming to processing and cold chain technology.',
  },
  {
    icon: Shirt,
    title: 'Halal Lifestyle & Creative Economy',
    description: 'Modest fashion, cosmetics, pharmaceuticals, and IP-based products.',
  },
  {
    icon: Factory,
    title: 'Manufacturing & Supply Chain',
    description: 'Halal industrial estates, manufacturing machinery, and quality assurance services.',
  },
  {
    icon: Cpu,
    title: 'Technology & Digital Solutions',
    description: 'Blockchain systems, digital certification platforms, AI, and IoT solutions.',
  },
  {
    icon: Coins,
    title: 'Islamic Finance & Fintech',
    description: 'Sharia-compliant investment funds, banking, and digital payment solutions.',
  },
  {
    icon: Globe,
    title: 'Trade & International Pavilions',
    description: 'A gateway to global markets through country and regional pavilions.',
  },
  {
    icon: ShieldCheck,
    title: 'Sertifikasi & Regulatory Bodies',
    description: 'Halal certification, accreditation, and intergovernmental institutions.',
  },
  {
    icon: GraduationCap,
    title: 'Education & Research',
    description: 'Universities, halal R&D institutions, and innovation hubs.',
  },
  {
    icon: Plane,
    title: 'Halal Tourism & Hospitality',
    description: 'Muslim-friendly travel destinations, medical tourism, and MICE services.',
  },
  {
    icon: HandHeart,
    title: 'Social & Sustainable Halal Economy',
    description: 'Waqf and Zakat institutions, social enterprises, and green halal initiatives.',
  },
];

export default function D8HEI() {
  const [goalsRef, goalsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [sectorsRef, sectorsVisible] = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* TARGET GOALS — split sticky aside + numbered list */}
        <div className={styles.splitLayout}>
          <aside className={styles.splitAside}>
            <span className={styles.subEyebrow}>Target Goals</span>
            <h3 className={styles.subTitle}>Outcomes the D-8 HEI Drives</h3>
            <p className={styles.subDescription}>
              Aligned with the D-8 Organization for Economic Cooperation, HEI advances four
              measurable outcomes that turn high-level commitments into real industry impact.
            </p>
          </aside>

          <ol
            ref={goalsRef as React.RefObject<HTMLOListElement>}
            className={`${styles.numberedList} ${goalsVisible ? styles.visible : ''}`}
          >
            {TARGET_GOALS.map((goal, i) => (
              <li
                key={goal.title}
                className={styles.numberedItem}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className={styles.numberedContent}>
                  <div className={styles.numberedTitleRow}>
                    <h4 className={styles.numberedTitle}>{goal.title}</h4>
                    <goal.icon className={styles.numberedIcon} />
                  </div>
                  <p className={styles.numberedDescription}>{goal.description}</p>
                  {goal.highlight && (
                    <span className={styles.numberedHighlight}>
                      <span className={styles.numberedHighlightValue}>{goal.highlight.value}</span>
                      <span className={styles.numberedHighlightLabel}>{goal.highlight.label}</span>
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* SECTORS — 5-column editorial grid */}
        <div className={styles.sectorsSection}>
          <header className={styles.compactHeader}>
            <div>
              <span className={styles.subEyebrow}>Sectors of Operation</span>
              <h3 className={styles.subTitle}>Ten Pillars of the Halal Economy</h3>
            </div>
            <p className={styles.compactDescription}>
              HEI operates across ten comprehensive sectors that together form a complete halal
              economy ecosystem — from food production to finance, education, and sustainability.
            </p>
          </header>

          <div
            ref={sectorsRef as React.RefObject<HTMLDivElement>}
            className={`${styles.sectorsList} ${sectorsVisible ? styles.visible : ''}`}
          >
            {SECTORS.map(({ icon: Icon, title, description }, i) => (
              <article
                key={title}
                className={styles.sectorRow}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className={styles.sectorIndex}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.sectorIconWrap}>
                  <Icon className={styles.sectorIcon} />
                </div>
                <div className={styles.sectorText}>
                  <h4 className={styles.sectorTitle}>{title}</h4>
                  <p className={styles.sectorDescription}>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
