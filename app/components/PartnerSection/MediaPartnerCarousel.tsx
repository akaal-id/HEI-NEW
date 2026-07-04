'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { Partner } from '@/app/data/partners';
import styles from './PartnerSection.module.css';

function MediaPartnerSlide({
  partner,
  index,
  originalCount,
}: {
  partner: Partner;
  index: number;
  originalCount: number;
}) {
  const isWideLogo = partner.logoVariant === 'wide';

  const content = (
    <Image
      src={partner.logo}
      alt={partner.alt}
      width={isWideLogo ? 280 : 140}
      height={72}
      className={`${styles.mediaCarouselLogo} ${isWideLogo ? styles.mediaCarouselLogoWide : ''}`}
    />
  );

  const slideClassName = `${styles.mediaCarouselSlide} ${isWideLogo ? styles.mediaCarouselSlideWide : ''}`;

  return (
    <div className={slideClassName}>
      {partner.website ? (
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.mediaCarouselLink} ${isWideLogo ? styles.mediaCarouselLinkWide : ''}`}
          aria-label={`Visit ${partner.name} website`}
          tabIndex={index < originalCount ? 0 : -1}
        >
          {content}
        </a>
      ) : (
        <div className={`${styles.mediaCarouselLink} ${isWideLogo ? styles.mediaCarouselLinkWide : ''}`}>
          {content}
        </div>
      )}
    </div>
  );
}

function MediaPartnerRow({
  partners,
  durationSeconds = 45,
}: {
  partners: Partner[];
  durationSeconds?: number;
}) {
  if (partners.length === 0) return null;

  const shouldAnimate = partners.length > 1;
  const loopPartners = shouldAnimate ? [...partners, ...partners] : partners;

  const trackStyle = {
    '--media-marquee-duration': `${durationSeconds}s`,
  } as CSSProperties;

  return (
    <div className={styles.mediaCarouselRow}>
      <div
        className={`${styles.mediaCarouselTrack} ${shouldAnimate ? styles.mediaCarouselTrackAnimated : ''}`}
        style={trackStyle}
      >
        {loopPartners.map((partner, index) => (
          <MediaPartnerSlide
            key={`${partner.id}-${index}`}
            partner={partner}
            index={index}
            originalCount={partners.length}
          />
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
      <MediaPartnerRow partners={topRow} durationSeconds={Math.max(topRow.length * 3.5, 30)} />
      <MediaPartnerRow
        partners={bottomRow}
        durationSeconds={Math.max(bottomRow.length * 4, 34)}
      />
    </div>
  );
}
