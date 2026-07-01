'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Partner } from '@/app/data/partners';
import styles from './PartnerSection.module.css';

const SLIDE_INTERVAL_MS = 1000;

function MediaPartnerRow({
  partners,
  startDelayMs = 0,
}: {
  partners: Partner[];
  startDelayMs?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const loopPartners = partners.length > 0 ? [...partners, ...partners] : [];

  useEffect(() => {
    if (partners.length <= 1) return;

    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setActiveIndex((current) => current + 1);
      }, SLIDE_INTERVAL_MS);
    }, startDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [partners.length, startDelayMs]);

  useEffect(() => {
    if (partners.length <= 1) return;

    if (activeIndex === partners.length) {
      const timeoutId = window.setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(0);
      }, 450);

      return () => window.clearTimeout(timeoutId);
    }

    if (!isTransitioning) {
      const frameId = window.requestAnimationFrame(() => {
        setIsTransitioning(true);
      });

      return () => window.cancelAnimationFrame(frameId);
    }
  }, [activeIndex, isTransitioning, partners.length]);

  if (partners.length === 0) return null;

  const translateX = `translateX(calc(-1 * ${activeIndex} * var(--media-slide-step)))`;

  return (
    <div className={styles.mediaCarouselRow}>
      <div
        className={`${styles.mediaCarouselTrack} ${isTransitioning ? styles.mediaCarouselTrackAnimated : ''}`}
        style={{ transform: translateX }}
      >
        {loopPartners.map((partner, index) => (
          <div key={`${partner.id}-${index}`} className={styles.mediaCarouselSlide}>
            {partner.website ? (
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mediaCarouselLink}
                aria-label={`Visit ${partner.name} website`}
                tabIndex={index < partners.length ? 0 : -1}
              >
                <Image
                  src={partner.logo}
                  alt={partner.alt}
                  width={140}
                  height={72}
                  className={styles.mediaCarouselLogo}
                />
              </a>
            ) : (
              <div className={styles.mediaCarouselLink}>
                <Image
                  src={partner.logo}
                  alt={partner.alt}
                  width={140}
                  height={72}
                  className={styles.mediaCarouselLogo}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MediaPartnerCarousel({ partners }: { partners: Partner[] }) {
  const midpoint = Math.ceil(partners.length / 2);
  const topRow = partners.slice(0, midpoint);
  const bottomRow = partners.slice(midpoint);

  return (
    <div className={styles.mediaCarousel}>
      <MediaPartnerRow partners={topRow} />
      <MediaPartnerRow partners={bottomRow} startDelayMs={500} />
    </div>
  );
}
