import Image from 'next/image';
import {
  Building2,
  CalendarDays,
  Check,
  Globe2,
  MapPin,
  PackageCheck,
  UsersRound,
} from 'lucide-react';
import Button from '../Button/Button';
import {
  boothEntitlements,
  exhibitionPrices,
  impactMetrics,
  industrySectors,
  milestones,
  participatingCountries,
  visitorProfiles,
} from '../../data/businessMatching';
import styles from './BusinessMatchingHome.module.css';

export default function BusinessMatchingHome() {
  return (
    <>
      <section
        className={styles.hero}
        id="business-matching-intro"
        aria-labelledby="business-matching-intro-title"
      >
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroTop}>
            <span className={styles.eyebrow}>D-8 Halal Expo Indonesia 2027</span>
            <h2 id="business-matching-intro-title">
              The D-8 Halal
              <span>Trade Floor</span>
            </h2>
            <p className={styles.heroLead}>
              A curated marketplace where halal businesses, qualified buyers, investors,
              and industry leaders meet across one connected platform.
            </p>

            <div className={styles.eventMeta}>
              <div>
                <CalendarDays aria-hidden="true" />
                <span><strong>7-10 July 2027</strong>Four days of opportunity</span>
              </div>
              <div>
                <MapPin aria-hidden="true" />
                <span><strong>Kartika Expo Center</strong>Jakarta, Indonesia</span>
              </div>
            </div>

            <div className={styles.heroActions}>
              <Button href="/register/exhibitor">Register Now</Button>
              <Button href="#milestone" variant="secondary">Discover HEI</Button>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroGlow} aria-hidden="true" />
            <div className={styles.heroFrame}>
              <div className={styles.heroMedia}>
                <Image
                  src="/images/business-matching-hero-2027.webp"
                  alt="Business conversations at Halal Expo Indonesia"
                  fill
                  preload
                  unoptimized
                  sizes="(max-width: 900px) 100vw, 1440px"
                  className={styles.heroImage}
                />
                <div className={styles.heroVisualContent}>
                  <div className={styles.heroBadge}>
                    <Globe2 aria-hidden="true" />
                    <span>Connecting the global halal economy</span>
                  </div>
                  <div className={styles.heroVisualStatement}>
                    <span>Exhibition · Business Matching · Investment</span>
                    <strong>Built for conversations that move business forward.</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.matchingShowcase} id="business-matching">
            <div className={styles.transactionTotal}>
              <span>Recorded transaction value</span>
              <strong>US$13,200,915</strong>
              <p>Across letters of intent, purchase orders, and memoranda of understanding.</p>
              <Button href="https://business.halalexpoindonesia.com" variant="yellow">
                Join Business Matching
              </Button>
            </div>

            <div className={styles.matchingImpact}>
              <div className={styles.impactIntro}>
                <h3>
                  Qualified meetings. International reach.
                  <strong>Measurable results.</strong>
                </h3>
              </div>

              <div className={styles.metricGrid}>
                {impactMetrics.map((metric) => (
                  <article key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </article>
                ))}
              </div>

              <div className={styles.countryNetwork}>
                <div><Globe2 aria-hidden="true" /><span>Countries represented</span></div>
                <ul>
                  {participatingCountries.map((country) => <li key={country}>{country}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section className={styles.milestone} id="milestone">
        <div className={styles.container}>
          <header className={styles.milestoneHeader}>
            <div>
              <span className={styles.sectionEyebrow}>HEI Milestone</span>
              <h2>Building the halal market forward.</h2>
            </div>
            <div className={styles.milestoneSummary}>
              <strong>2018—2026</strong>
              <p>
                From its first edition to an increasingly international audience, HEI keeps
                expanding its commercial reach and industry community.
              </p>
            </div>
          </header>

          <div className={styles.timelineViewport}>
            <div className={styles.timeline}>
              {milestones.map((milestone) => (
                <article key={milestone.year} className={styles.milestoneCard}>
                  <div className={styles.timelineMarker}>
                    <span>{milestone.year}</span>
                    <i aria-hidden="true" />
                  </div>

                  <div className={styles.milestoneLogo}>
                    <Image
                      src={`/milestones/hei-${milestone.year}.png`}
                      alt={`Halal Expo Indonesia ${milestone.year} logo`}
                      fill
                      sizes="(max-width: 760px) 80vw, 360px"
                    />
                  </div>

                  <div className={styles.milestoneMeta}>
                    <p className={styles.milestoneDate}>
                      <CalendarDays aria-hidden="true" />
                      {milestone.date}
                    </p>
                    <p className={styles.milestoneVenue}>
                      <MapPin aria-hidden="true" />
                      {milestone.venue}, Indonesia
                    </p>
                  </div>

                  <ul>
                    {milestone.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.audience} id="audience">
        <div className={styles.container}>
          <header className={styles.audienceHeader}>
            <span className={styles.sectionEyebrow}>Exhibitors & Visitors</span>
            <h2>One event. Every side of the halal market.</h2>
          </header>

          <div className={styles.audiencePanels}>
            <article className={`${styles.audiencePanel} ${styles.exhibitorPanel}`} id="exhibitor">
              <div className={styles.audiencePanelLabel}>
                <span><Building2 aria-hidden="true" /></span>
                For Exhibitors
              </div>
              <h3>Build your market presence.</h3>
              <p>
                Showcase your business to buyers, investors, and strategic partners.
              </p>

              <div className={styles.audienceList}>
                {industrySectors.map((sector, index) => (
                  <div key={sector}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h4>{sector}</h4>
                  </div>
                ))}
              </div>
            </article>

            <div className={styles.audienceDivider} aria-hidden="true" />

            <article className={`${styles.audiencePanel} ${styles.visitorPanel}`} id="visitor">
              <div className={styles.audiencePanelLabel}>
                <span><UsersRound aria-hidden="true" /></span>
                For Visitors
              </div>
              <h3>Find your next opportunity.</h3>
              <p>
                Discover new products, market insights, and valuable connections.
              </p>

              <div className={styles.audienceList}>
                {visitorProfiles.map((profile, index) => (
                  <div key={profile}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h4>{profile}</h4>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.packages} id="packages">
        <div className={styles.container}>
          <header className={styles.packageHeader}>
            <div>
              <span className={styles.lightEyebrow}>Exhibition Packages</span>
              <h2>Choose how your brand shows up.</h2>
            </div>
            <p>Participate with a ready-to-use standard booth or build a custom presence from raw space.</p>
          </header>

          <div className={styles.packageGrid}>
            <article className={`${styles.packageCard} ${styles.standardPackageCard}`}>
              <div className={styles.packageOptionLabel}>
                <div className={styles.packageIcon}><PackageCheck aria-hidden="true" /></div>
                <span className={styles.packageLabel}>Standard Shell Scheme</span>
              </div>
              <h3>A complete booth, ready to use.</h3>
              <ul>
                {boothEntitlements.map((item) => (
                  <li key={item}><Check aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </article>

            <article className={`${styles.packageCard} ${styles.rawSpaceCard}`}>
              <div className={styles.packageOptionLabel}>
                <div className={styles.packageIcon}><Building2 aria-hidden="true" /></div>
                <span className={styles.packageLabel}>Raw Space</span>
              </div>
              <h3>A blank space, built around your brand.</h3>
              <p>
                An open floor area for a fully custom stand, built by your appointed contractor.
              </p>
              <div className={styles.pricing}>
                {exhibitionPrices.map((price) => (
                  <div key={price.market}>
                    <span>{price.market}</span>
                    <strong>{price.price}<small>{price.unit}</small></strong>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className={styles.packageCta}>
            <div>
              <span>Booth participation</span>
              <h3>Reserve your presence at HEI 2027.</h3>
              <p>Sales@halalexpoindonesia.com · +62 895-4038-24515</p>
            </div>
            <Button
              href="/register/exhibitor"
              variant="yellow"
            >
              Start Registration
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
