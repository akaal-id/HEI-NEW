'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
  CalendarDays,
  Globe2,
  HeartHandshake,
  Map,
  MapPin,
  Palette,
  ShoppingBag,
  Shirt,
  Sparkles,
  Star,
  Users,
  Wheat,
} from 'lucide-react';
import styles from './CultureFestivalPage.module.css';
import buttonStyles from '../../components/Button/Button.module.css';

const assetBase = '/culture-festival';

const nations = [
  { name: 'Indonesia', label: 'Host Nation', code: 'ID' },
  { name: 'Malaysia', label: 'Cultural Neighbourhood', code: 'MY' },
  { name: 'Bangladesh', label: 'Textile & Heritage', code: 'BD' },
  { name: 'Pakistan', label: 'Craft & Culinary', code: 'PK' },
  { name: 'Iran', label: 'Art & Tradition', code: 'IR' },
  { name: 'Türkiye', label: 'Performance & Heritage', code: 'TR' },
  { name: 'Egypt', label: 'Ancient Civilization', code: 'EG' },
  { name: 'Nigeria', label: 'Rhythm & Textile', code: 'NG' },
  { name: 'Azerbaijan', label: 'Culture & Craft', code: 'AZ' },
];

const aboutCards: Array<{ title: string; label: string; icon: LucideIcon }> = [
  { title: 'Food', label: 'Halal tastes across continents', icon: Wheat },
  { title: 'Performance', label: 'Music, dance, and living rituals', icon: Users },
  { title: 'Craft', label: 'Textiles, objects, and artisan detail', icon: Palette },
  { title: 'Heritage', label: 'Stories carried by worldwide nations', icon: Globe2 },
];

const programs = [
  {
    title: 'Cultural Stage Performances',
    description:
      'Experience traditional music, dance, and stage showcases from participating nations.',
    image: `${assetBase}/stage-1.png`,
    alt: 'Illustration of a cultural performance stage with instruments',
  },
  {
    title: 'International Food Bazaar',
    description:
      'Taste international halal cuisines and signature dishes from across D-8 cultures.',
    image: `${assetBase}/cuisines-1.png`,
    alt: 'Illustration of international halal dishes and cuisine',
  },
  {
    title: 'Arts & Crafts Showcase',
    description:
      'Discover handmade crafts, cultural objects, textiles, and heritage-inspired creations.',
    image: `${assetBase}/artefacts-1.png`,
    alt: 'Illustration of cultural artifacts, pottery, and heritage objects',
  },
];

const highlights: Array<{ title: string; icon: LucideIcon }> = [
  { title: 'Live Cooking Competition', icon: Wheat },
  { title: 'Traditional Performances', icon: Sparkles },
  { title: 'Heritage Pavilions', icon: Globe2 },
  { title: 'Modest Fashion Showcase', icon: Shirt },
  { title: 'Artisan Bazaar', icon: ShoppingBag },
  { title: 'Culinary Tourism', icon: Map },
];

const journey = [
  'Grand Opening',
  'Cultural Parade',
  'Live Cooking Showdown',
  'Heritage Performances',
  'Artisan Market',
  'Closing Celebration',
];

const audiences = [
  {
    title: 'For Visitors',
    icon: Star,
    description:
      'Enjoy food, performances, crafts, and cultural experiences from worldwide nations in one family-friendly festival.',
  },
  {
    title: 'For Delegates',
    icon: HeartHandshake,
    description:
      'Experience cultural diplomacy through heritage, creative economy, and cross-country collaboration.',
  },
];

function useReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.reveal}`));

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add(styles.inView));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return rootRef;
}

type SectionHeadingVariant = 'about' | 'nations' | 'programs' | 'highlights' | 'journey';

const sectionHeadingStyles: Record<
  SectionHeadingVariant,
  { eyebrow: string; heading: string; text: string }
> = {
  about: {
    eyebrow: styles.aboutEyebrow,
    heading: styles.aboutHeading,
    text: styles.aboutText,
  },
  nations: {
    eyebrow: styles.nationsEyebrow,
    heading: styles.nationsHeading,
    text: styles.nationsText,
  },
  programs: {
    eyebrow: styles.programsEyebrow,
    heading: styles.programsHeading,
    text: styles.programsText,
  },
  highlights: {
    eyebrow: styles.highlightsEyebrow,
    heading: styles.highlightsHeading,
    text: styles.highlightsText,
  },
  journey: {
    eyebrow: styles.journeyEyebrow,
    heading: styles.journeyHeading,
    text: styles.journeyText,
  },
};

function SectionHeading({
  variant,
  eyebrow,
  title,
  copy,
  align = 'center',
}: {
  variant: SectionHeadingVariant;
  eyebrow: string;
  title: string;
  copy?: string;
  align?: 'center' | 'left';
}) {
  const typography = sectionHeadingStyles[variant];

  return (
    <div className={`${styles.sectionHeading} ${align === 'left' ? styles.sectionHeadingLeft : ''} ${styles.reveal}`}>
      <span className={typography.eyebrow}>{eyebrow}</span>
      <h2 className={typography.heading}>{title}</h2>
      {copy ? <p className={typography.text}>{copy}</p> : null}
    </div>
  );
}

function FloatingDecorations() {
  return (
    <div className={styles.decorations} aria-hidden="true">
      <span className={`${styles.orb} ${styles.orbOne}`} />
      <span className={`${styles.orb} ${styles.orbTwo}`} />
      <span className={`${styles.orb} ${styles.orbThree}`} />
      <span className={`${styles.cloud} ${styles.cloudOne}`} />
      <span className={`${styles.cloud} ${styles.cloudTwo}`} />
      <span className={`${styles.pattern} ${styles.patternOne}`} />
      <span className={`${styles.pattern} ${styles.patternTwo}`} />
    </div>
  );
}

function FestivalHero() {
  return (
    <section className={`${styles.hero} relative isolate`}>
      <FloatingDecorations />

      <Image
        src={`${assetBase}/Malaysian-kite-1.png`}
        alt=""
        width={420}
        height={426}
        priority
        className={`${styles.heroKite} ${styles.heroKiteLeft}`}
        aria-hidden="true"
      />
      <Image
        src={`${assetBase}/Malaysian-kite-1.png`}
        alt=""
        width={280}
        height={284}
        className={`${styles.heroKite} ${styles.heroKiteRight}`}
        aria-hidden="true"
      />

      <div className={`${styles.heroInner} hei-container`}>
        <div className={styles.heroCopy}>
          <div className={styles.logoWrap}>
            <Image
              src={`${assetBase}/logo-dhcf-raw-01.svg`}
              alt=""
              width={108}
              height={108}
              priority
              className={styles.monogramLogo}
              aria-hidden="true"
            />
            <Image
              src={`${assetBase}/logo-dhcf-raw-02.svg`}
              alt="D-8 HEI Cultural Festival"
              width={360}
              height={183}
              priority
              className={styles.wordmarkLogo}
            />
          </div>

          <span className={styles.heroPill}>
            Be Part of the D-8 Culture Experience
          </span>

          <h1 className={styles.heroTitle}>
            D-8 HEI Cultural Festival
          </h1>

          <div className={styles.heroMeta}>
            <span>
              <CalendarDays aria-hidden="true" />
              8-12 July 2026
            </span>
            <span>
              <MapPin aria-hidden="true" />
              Tennis Indoor Senayan Complex, Jakarta
            </span>
          </div>

          <div className={styles.heroActions}>
            <Link
              href="/register/visitor"
              className={`${buttonStyles.button} ${buttonStyles.primary} ${styles.heroActionButton}`}
            >
              <span className={buttonStyles.text}>Get Tickets Now</span>
              <div className={buttonStyles.iconContainer}>
                <ArrowUpRight className={buttonStyles.icon} aria-hidden="true" />
              </div>
            </Link>
            <Link
              href="/programs/culture-festival/register/exhibitor"
              className={`${buttonStyles.button} ${buttonStyles.yellow} ${styles.heroActionButton}`}
            >
              <span className={buttonStyles.text}>Book Your Space</span>
              <div className={buttonStyles.iconContainer}>
                <ArrowUpRight className={buttonStyles.icon} aria-hidden="true" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.heroLandscape}>
        <Image
          src={`${assetBase}/Final_KV_RAW.png?v=2`}
          alt="Cultural festival illustration featuring landmarks, food, dancers, and cultural objects from D-8 nations"
          width={2030}
          height={1080}
          priority
          sizes="100vw"
          className={styles.landscapeImage}
        />
      </div>
    </section>
  );
}

function AboutFestival() {
  return (
    <section className={`${styles.aboutSection} overflow-hidden`}>
      <div className={`${styles.aboutGrid} hei-container`}>
        <div>
          <SectionHeading
            variant="about"
            eyebrow="Festival Story"
            title="A Cultural Journey Across Worldwide Nations"
            copy="D-8 HEI Cultural Festival brings together the food, performances, crafts, and living heritage of worldwide nations in one immersive cultural celebration within D-8 Halal Expo Indonesia 2026."
            align="left"
          />
          <div className={`${styles.aboutNote} ${styles.reveal}`}>
            <span>Worldside nations</span>
            <strong>One living cultural experience</strong>
          </div>
        </div>

        <div className={`${styles.aboutVisual} ${styles.reveal}`} aria-label="Festival experience categories">
          {aboutCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <article className={styles.aboutMiniCard} key={card.title} style={{ animationDelay: `${index * 0.12}s` }}>
                <span>
                  <Icon aria-hidden="true" />
                </span>
                <h3>{card.title}</h3>
                <p>{card.label}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function NineNations() {
  return (
    <section className={`${styles.nationsSection} overflow-hidden`}>
      <div className="hei-container">
        <SectionHeading
          variant="nations"
          eyebrow="Participating Nations"
          title="Worldwide Nations, +9 Cultural Signatures"
          copy="A refined celebration of traditions from Southeast Asia, South Asia, West Asia, Africa, and the Caucasus."
        />

        <div className={styles.nationGrid}>
          {nations.map((nation, index) => (
            <article className={`${styles.nationCard} ${styles.reveal}`} key={nation.name} style={{ transitionDelay: `${index * 45}ms` }}>
              <span className={styles.nationFlag}>
                <Image
                  src={`${assetBase}/flags/${nation.code.toLowerCase()}.svg`}
                  alt={`${nation.name} flag`}
                  width={48}
                  height={48}
                />
              </span>
              <h3>{nation.name}</h3>
              <p>{nation.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCards() {
  return (
    <section id="festival-programs" className={`${styles.programSection} overflow-hidden`}>
      <div className="hei-container">
        <SectionHeading
          variant="programs"
          eyebrow="Main Programs"
          title="D-8 HEI Cultural Festival Programs"
          copy="Three immersive pillars shape the festival experience: stage, cuisine, and craft."
        />

        <div className={styles.programGrid}>
          {programs.map((program, index) => (
            <article className={`${styles.programCard} ${styles.reveal}`} key={program.title} style={{ transitionDelay: `${index * 90}ms` }}>
              <div className={styles.programImageWrap}>
                <Image
                  src={`${assetBase}/hexagon-1.png`}
                  alt=""
                  width={420}
                  height={420}
                  className={styles.hexagon}
                  aria-hidden="true"
                />
                <Image
                  src={program.image}
                  alt={program.alt}
                  width={780}
                  height={704}
                  sizes="(max-width: 768px) 70vw, 28vw"
                  className={styles.programAsset}
                />
                <Image
                  src={`${assetBase}/shadow-1.png`}
                  alt=""
                  width={540}
                  height={112}
                  className={styles.assetShadow}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.programContent}>
                <span>0{index + 1}</span>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FestivalHighlights() {
  return (
    <section className={`${styles.highlightsSection} overflow-hidden`}>
      <div className="hei-container">
        <SectionHeading
          variant="highlights"
          eyebrow="Festival Highlights"
          title="Every Day Has a Cultural Spark"
          copy="A lively program of culinary, performance, fashion, craft, and tourism experiences for families, visitors, and delegates."
        />

        <div className={styles.highlightGrid}>
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <article className={`${styles.highlightCard} ${styles.reveal}`} key={highlight.title} style={{ transitionDelay: `${index * 55}ms` }}>
                <span>
                  <Icon aria-hidden="true" />
                </span>
                <h3>{highlight.title}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FestivalJourney() {
  return (
    <section className={`${styles.journeySection} overflow-hidden`}>
      <div className="hei-container">
        <SectionHeading
          variant="journey"
          eyebrow="Festival Experience"
          title="A Journey Through the Celebration"
          copy="Move through the festival like a cultural path: from opening ceremony to heritage performance, marketplace discovery, and closing celebration."
        />

        <div className={`${styles.timeline} ${styles.reveal}`}>
          {journey.map((item, index) => (
            <article className={styles.timelineItem} key={item}>
              <span>{index + 1}</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className={`${styles.audienceSection} overflow-hidden`}>
      <div className="hei-container">
        <div className={styles.audienceGrid}>
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <article className={`${styles.audienceCard} ${styles.reveal}`} key={audience.title} style={{ transitionDelay: `${index * 80}ms` }}>
                <span>
                  <Icon aria-hidden="true" />
                </span>
                <h2>{audience.title}</h2>
                <p>{audience.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className={`${styles.closingSection} overflow-hidden`}>
      <div className={`${styles.closingInner} hei-container`}>
        <Image
          src={`${assetBase}/Malaysian-kite-1.png`}
          alt=""
          width={330}
          height={335}
          className={styles.closingKite}
          aria-hidden="true"
        />
        <div className={`${styles.closingContent} ${styles.reveal}`}>
          <span className={styles.closingEyebrow}>July 2026 / Jakarta</span>
          <h2 className={styles.closingHeading}>Be Part of the D-8 Culture Experience</h2>
          <p className={styles.closingText}>Join the cultural celebration of worldwide nations at D-8 HEI Cultural Festival 2026.</p>
          <Link
            href="/register/visitor"
            className={`${buttonStyles.button} ${buttonStyles.yellow} ${styles.closingRegisterButton}`}
          >
            <span className={`${buttonStyles.text} ${styles.closingRegisterText}`}>Get Tickets Now</span>
            <div className={`${buttonStyles.iconContainer} ${styles.closingRegisterIcon}`}>
              <ArrowUpRight className={buttonStyles.icon} aria-hidden="true" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function CultureFestivalPage() {
  const rootRef = useReveal();

  return (
    <div ref={rootRef} className={styles.page}>
      <FestivalHero />
      <AboutFestival />
      <NineNations />
      <ProgramCards />
      <FestivalHighlights />
      <FestivalJourney />
      <AudienceSection />
      <ClosingCTA />
    </div>
  );
}
