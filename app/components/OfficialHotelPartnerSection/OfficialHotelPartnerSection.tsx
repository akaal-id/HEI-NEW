'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Building2, Mail, MessageCircle } from 'lucide-react';
import { officialHotelPartners } from '@/app/data/partners';
import Button from '../Button/Button';
import styles from './OfficialHotelPartnerSection.module.css';

export default function OfficialHotelPartnerSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let isMounted = true;

    const setupAnimations = async () => {
      const animeModule = await import('animejs');
      if (!isMounted || !sectionRef.current) return;

      const { animate, stagger } = animeModule;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const header = sectionRef.current?.querySelector(`.${styles.header}`);
            const cards = sectionRef.current?.querySelectorAll(`.${styles.hotelCard}`);

            if (header) {
              animate(header, {
                opacity: [0, 1],
                translateY: [28, 0],
                duration: 900,
                easing: 'easeOutQuad',
              });
            }

            if (cards && cards.length > 0) {
              animate(cards, {
                opacity: [0, 1],
                translateY: [32, 0],
                delay: stagger(120),
                duration: 1000,
                easing: 'easeOutQuad',
              });
            }

            observer?.disconnect();
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
      );

      observer.observe(sectionRef.current);
    };

    setupAnimations();

    return () => {
      isMounted = false;
      observer?.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="official-hotel-partners"
      aria-labelledby="official-hotel-partners-title"
    >
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <div className={`${styles.container} hei-container`}>
        <header className={`${styles.header} ${styles.reveal}`}>
          <span className={styles.eyebrow}>
            <Building2 className={styles.eyebrowIcon} aria-hidden />
            Official Hotel Partner
          </span>
          <h2 id="official-hotel-partners-title" className={styles.title}>
            <em>Discount Room Rates</em> For Our Delegates
          </h2>
          <p className={styles.description}>
            Exclusive room rates for all exhibitors, buyers, and visitors at D-8 Halal Expo
            Indonesia 2026. Book through our official hotel partners and enjoy premium
            accommodation minutes from the venue.
          </p>
          {/* <div className={styles.perkRow}>
            <span className={styles.perk}>
              <Sparkles className={styles.perkIcon} aria-hidden />
              Special delegate rates
            </span>
            <span className={styles.perk}>
              <Sparkles className={styles.perkIcon} aria-hidden />
              Priority reservation support
            </span>
          </div> */}
        </header>

        <div className={styles.hotelGrid}>
          {officialHotelPartners.map((hotel) => (
            <article key={hotel.id} className={`${styles.hotelCard} ${styles.reveal}`}>
              <div className={styles.cardAccent} aria-hidden="true" />

              <div className={styles.cardBody}>
                <div className={styles.logoPanel}>
                  {hotel.isPlaceholder && (
                    <span className={styles.comingSoon}>Logo coming soon</span>
                  )}
                  {hotel.website && !hotel.isPlaceholder ? (
                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.logoLink}
                      aria-label={`Visit ${hotel.name} website`}
                    >
                      <Image
                        src={hotel.logo}
                        alt={hotel.alt}
                        width={240}
                        height={96}
                        className={styles.logoImage}
                      />
                    </a>
                  ) : (
                    <Image
                      src={hotel.logo}
                      alt={hotel.alt}
                      width={240}
                      height={96}
                      className={`${styles.logoImage} ${hotel.isPlaceholder ? styles.logoPlaceholder : ''}`}
                    />
                  )}
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardHeading}>
                    <h3 className={styles.hotelName}>{hotel.name}</h3>
                    <p className={styles.hotelEventTag}>D-8 Halal Expo Indonesia 2026</p>
                  </div>

                  <div className={styles.contactGroup}>
                    <p className={styles.contactLabel}>Reservation contact</p>
                    <ul className={styles.contactList}>
                      {hotel.emails.map((email) => (
                        <li key={email}>
                          <a href={`mailto:${email}`} className={styles.contactChip}>
                            <Mail className={styles.contactIcon} aria-hidden />
                            <span>{email}</span>
                          </a>
                        </li>
                      ))}
                      {hotel.contacts.map((contact) => (
                        <li key={contact.whatsappHref}>
                          <a
                            href={contact.whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.contactChip}
                            aria-label={`Chat with ${contact.name} on WhatsApp`}
                          >
                            <MessageCircle className={styles.contactIcon} aria-hidden />
                            <span>
                              {contact.name}
                              <span className={styles.contactDivider}>·</span>
                              {contact.phone}
                              <span className={styles.whatsappHint}>WhatsApp</span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    href={`mailto:${hotel.emails[0]}?subject=${encodeURIComponent(`${hotel.name} — D-8 Halal Expo Indonesia 2026 Reservation`)}`}
                    variant="yellow"
                    className={styles.contactButton}
                  >
                    Request Special Rate
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
