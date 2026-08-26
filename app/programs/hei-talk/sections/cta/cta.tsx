'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, CalendarDays, MapPin, Ticket } from 'lucide-react';
<<<<<<< Updated upstream
import { HEI_TALK_REGISTRATION_ENABLED, HEI_TALK_REGISTRATION_URL } from '../../../../data/registerSections';
=======
import { HEI_TALK_REGISTRATION_ENABLED } from '../../../../data/registerSections';
>>>>>>> Stashed changes
import buttonStyles from '../../../../components/Button/Button.module.css';
import styles from './cta.module.css';

gsap.registerPlugin(ScrollTrigger);

const DETAILS = [
  { icon: CalendarDays, label: 'April 2026' },
  { icon: MapPin, label: 'Jakarta, Indonesia' },
  { icon: Ticket, label: 'Limited Seats' },
];

export default function CtaSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.content} > *`,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        },
      );

      // Slow ambient spin on the D-8 circle decoration
      gsap.to(`.${styles.decorationImage}`, {
        rotation: 360,
        duration: 90,
        ease: 'none',
        repeat: -1,
      });

      gsap.fromTo(
        `.${styles.decoration}`,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.section}>
      <div className={styles.decoration} aria-hidden="true">
        <Image
          src="/D8-assets/circle_D8.svg"
          alt=""
          width={1200}
          height={1200}
          className={styles.decorationImage}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Reserve Your Seat</span>
          <h2 className={styles.title}>
            Learn From the Voices{' '}
            <em className={styles.titleAccent}>Shaping the Halal Future</em>
          </h2>
          <p className={styles.lead}>
            Join 15 expert-led sessions—including the D-8 HEI Youth program—and gain
            direct access to the insights, strategies, and people driving the global
            halal economy forward.
          </p>

          <div className={styles.detailRow}>
            {DETAILS.map(({ icon: Icon, label }) => (
              <span key={label} className={styles.detailChip}>
                <Icon size={15} strokeWidth={1.75} />
                {label}
              </span>
            ))}
          </div>

          <div className={styles.actions}>
            {HEI_TALK_REGISTRATION_ENABLED ? (
              <Link
<<<<<<< Updated upstream
                href={HEI_TALK_REGISTRATION_URL}
=======
                href="/programs/hei-talk/register"
>>>>>>> Stashed changes
                className={`${buttonStyles.button} ${buttonStyles.yellow} ${styles.ctaButton}`}
              >
                <span className={buttonStyles.text}>Register Now</span>
                <div className={buttonStyles.iconContainer}>
                  <ArrowUpRight className={buttonStyles.icon} />
                </div>
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className={`${buttonStyles.button} ${buttonStyles.yellow} ${buttonStyles.disabled} ${styles.ctaButton}`}
                aria-disabled="true"
              >
                <span className={buttonStyles.text}>Register Now</span>
                <div className={buttonStyles.iconContainer}>
                  <ArrowUpRight className={buttonStyles.icon} />
                </div>
              </button>
            )}
            <p className={styles.note}>
              Seats for D-8 HEI Talk are limited—lock in your place at the most
              influential halal industry forum of 2026.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
