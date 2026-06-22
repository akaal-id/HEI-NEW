'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  TrendingUp,
  Scale,
  Cpu,
  Landmark,
  Leaf,
  Users,
  type LucideIcon,
} from 'lucide-react';
import styles from './themes.module.css';

gsap.registerPlugin(ScrollTrigger);

type Theme = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FEATURED_THEMES: Theme[] = [
  {
    icon: TrendingUp,
    title: 'Global Market Trends',
    description:
      'Explore the trajectory of the $5.2 Trillion halal economy, emerging consumer behaviour, and high-growth export corridors across D-8 nations.',
  },
  {
    icon: Scale,
    title: 'Regulation & Halal Standards',
    description:
      'Understand evolving certification frameworks, mutual recognition, and the path toward harmonized halal standards worldwide.',
  },
  {
    icon: Cpu,
    title: 'Innovation & Technology',
    description:
      'From blockchain traceability to AI-driven manufacturing, discover the technologies redefining how halal products are made and verified.',
  },
  {
    icon: Landmark,
    title: 'Islamic Finance & Investment',
    description:
      'Unpack sharia-compliant capital, takaful, and trade finance instruments fuelling the next wave of halal enterprise.',
  },
  {
    icon: Leaf,
    title: 'Sustainability & ESG',
    description:
      'Examine how ethical, inclusive, and environmentally responsible practices are becoming a competitive advantage.',
  },
  {
    icon: Users,
    title: 'Youth & Future Talent',
    description:
      'Spotlight the young founders and creative innovators shaping the future leadership of the global halal industry.',
  },
];

export default function ThemesSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.header} > *`,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.header}`, start: 'top 80%' },
        },
      );

      gsap.fromTo(
        `.${styles.card}`,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 82%' },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Featured Themes</span>
          <h3 className={styles.title}>
            The Conversations That <em>Matter Most</em>
          </h3>
          <p className={styles.lead}>
            Every session is curated around the forces reshaping the halal economy—so
            you leave with insight you can act on.
          </p>
        </div>

        <div className={styles.grid}>
          {FEATURED_THEMES.map(({ icon: Icon, title, description }, i) => (
            <article key={title} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.iconWrap}>
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h4 className={styles.cardTitle}>{title}</h4>
              <p className={styles.cardDesc}>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
