'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowDown, CalendarDays, MapPin } from 'lucide-react';
import buttonStyles from '../../../../components/Button/Button.module.css';
import styles from './hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 15, suffix: '+', label: 'Expert-Led Sessions' },
  { value: 40, suffix: '+', label: 'Global Speakers' },
  { value: 8, suffix: '', label: 'D-8 Member States' },
  { value: 500, suffix: '+', label: 'Delegates Expected' },
];

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        `.${styles.bgImage}`,
        { scale: 1.18 },
        { scale: 1, duration: 2.4, ease: 'power2.out' },
        0,
      )
        .fromTo(
          `.${styles.badge}`,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.35,
        )
        .fromTo(
          `.${styles.titleLine} > span`,
          { yPercent: 115 },
          { yPercent: 0, duration: 1.15, stagger: 0.14 },
          0.5,
        )
        .fromTo(
          `.${styles.lead}`,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          0.95,
        )
        .fromTo(
          `.${styles.actions}`,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          1.1,
        )
        .fromTo(
          `.${styles.statItem}`,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          1.2,
        )
        .fromTo(
          `.${styles.scrollHint}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          1.6,
        );

      // Animated counters in the stats bar
      gsap.utils.toArray<HTMLElement>(`.${styles.statValue}`).forEach((el) => {
        const target = Number(el.dataset.value ?? 0);
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.8,
          delay: 1.25,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v));
          },
        });
      });

      // Subtle parallax on the background while scrolling away
      gsap.to(`.${styles.bg}`, {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.hero}>
      <div className={styles.bg} aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2400&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.inner}>
        <div className={styles.badge}>
          <span className={styles.badgeProgram}>D-8 HEI Talk</span>
          <span className={styles.badgeMeta}>
            <CalendarDays size={14} strokeWidth={1.75} />
            April 2026
          </span>
          <span className={styles.badgeMeta}>
            <MapPin size={14} strokeWidth={1.75} />
            Jakarta, Indonesia
          </span>
        </div>

        <h1 className={styles.title}>
          <span className={styles.titleLine}>
            <span>Where Halal Industry</span>
          </span>
          <span className={styles.titleLine}>
            <span className={styles.titleAccent}>Leaders Convene</span>
          </span>
        </h1>

        <p className={styles.lead}>
          Approximately 15 expert-led sessions of keynotes, panels, and deep-dive
          forums—turning the dialogue of policymakers, innovators, and young
          entrepreneurs into actionable insight for the global halal economy.
        </p>

        <div className={styles.actions}>
          <Link
            href="/register"
            className={`${buttonStyles.button} ${buttonStyles.yellow}`}
          >
            <span className={buttonStyles.text}>Reserve Your Seat</span>
            <div className={buttonStyles.iconContainer}>
              <ArrowUpRight className={buttonStyles.icon} />
            </div>
          </Link>
          <a href="#agenda" className={styles.ghostLink}>
            View the Agenda
            <ArrowDown size={16} strokeWidth={1.75} />
          </a>
        </div>

        <div className={styles.statsBar}>
          {STATS.map(({ value, suffix, label }) => (
            <div key={label} className={styles.statItem}>
              <span className={styles.statNumber}>
                <span className={styles.statValue} data-value={value}>
                  0
                </span>
                {suffix}
              </span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollHintLine} />
        Scroll
      </div>
    </section>
  );
}
