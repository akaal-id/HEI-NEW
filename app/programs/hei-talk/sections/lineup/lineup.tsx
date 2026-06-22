'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mic,
  MessagesSquare,
  Presentation,
  Rocket,
  Handshake,
  Users,
  type LucideIcon,
} from 'lucide-react';
import styles from './lineup.module.css';

gsap.registerPlugin(ScrollTrigger);

type Program = {
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
};

const PROGRAMS: Program[] = [
  {
    icon: Mic,
    badge: 'Keynotes',
    title: 'Keynote Forum',
    description:
      'Visionary addresses from ministers, global executives, and thought leaders setting the agenda for the halal economy.',
  },
  {
    icon: MessagesSquare,
    badge: 'Panels',
    title: 'Expert Panels',
    description:
      'Dynamic, multi-perspective discussions where experts debate the opportunities and challenges shaping the industry.',
  },
  {
    icon: Presentation,
    badge: 'Deep Dives',
    title: 'Deep-Dive Talks',
    description:
      'Focused sessions unpack specialised topics with case studies, data, and practical frameworks you can apply directly.',
  },
];

const YOUTH_TRACKS = [
  {
    icon: Handshake,
    title: 'Young Entrepreneur Meetup',
    description:
      'A dedicated networking session designed to connect Indonesian sharia-based startups with business delegates from D-8 member countries—fostering cross-border collaboration, business exchange, and potential partnerships within the halal and Islamic economic sectors.',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Young entrepreneurs networking at D-8 Halal Expo Indonesia',
  },
  {
    icon: Users,
    title: 'Young Entrepreneur Panel Discussion',
    description:
      'A session within HEI Talk featuring inspiring young entrepreneurs from the halal and creative economy sectors—a platform to share insights, strategies, and experiences in building and scaling businesses within today’s competitive global market.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Young entrepreneurs panel discussion at D-8 Halal Expo Indonesia',
  },
];

export default function LineupSection() {
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
        `.${styles.programCard}`,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.programGrid}`, start: 'top 82%' },
        },
      );

      gsap.fromTo(
        `.${styles.youthIntro} > *`,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.youthPanel}`, start: 'top 78%' },
        },
      );

      gsap.fromTo(
        `.${styles.youthCard}`,
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.youthGrid}`, start: 'top 84%' },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Program Lineup</span>
          <h3 className={styles.title}>
            Four Programs. <em>One Stage.</em>
          </h3>
          <p className={styles.lead}>
            From ministerial keynotes to the next generation of halal founders, every
            format inside D-8 HEI Talk is built to move the conversation forward.
          </p>
        </div>

        <div className={styles.programGrid}>
          {PROGRAMS.map(({ icon: Icon, badge, title, description }) => (
            <article key={title} className={styles.programCard}>
              <div className={styles.programTop}>
                <span className={styles.iconWrap}>
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <span className={styles.programBadge}>{badge}</span>
              </div>
              <h4 className={styles.programTitle}>{title}</h4>
              <p className={styles.programDesc}>{description}</p>
            </article>
          ))}
        </div>

        {/* ─── D-8 HEI YOUTH — featured program ─── */}
        <div className={styles.youthPanel}>
          <div className={styles.youthIntro}>
            <span className={styles.youthBadge}>
              <Rocket size={14} strokeWidth={1.75} />
              Youth Program
            </span>
            <h4 className={styles.youthTitle}>D-8 HEI Youth</h4>
            <p className={styles.youthLead}>
              A dedicated stage empowering the next generation of halal
              entrepreneurs—where Indonesian sharia-based startups meet D-8 business
              delegates, and young founders take the HEI Talk spotlight.
            </p>
          </div>

          <div className={styles.youthGrid}>
            {YOUTH_TRACKS.map(({ icon: Icon, title, description, image, imageAlt }) => (
              <article key={title} className={styles.youthCard}>
                <div className={styles.youthImageWrap}>
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 860px) 100vw, 45vw"
                    className={styles.youthImage}
                  />
                </div>
                <div className={styles.youthCardBody}>
                  <span className={styles.youthCardIcon}>
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <h5 className={styles.youthCardTitle}>{title}</h5>
                  <p className={styles.youthCardDesc}>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
