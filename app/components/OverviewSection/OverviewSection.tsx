'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Button from '../Button/Button';
import styles from './OverviewSection.module.css';
import buttonStyles from '../Button/Button.module.css';
import type { LucideIcon } from 'lucide-react';
import { Globe, Briefcase, Mic, Building2, ArrowUpRight, Flag, SquareStack} from 'lucide-react';

type IntroMetricCard = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
};

/** Add, remove, or reorder entries to change the intro metric cards. */
const INTRO_METRIC_CARDS: IntroMetricCard[] = [
  {
    icon: Globe,
    eyebrow: 'Global Market Value',
    title: '$5.2 Trillion ',
    description: 'Access the massive and rapidly growing global halal economy.',
  },
  {
    icon: SquareStack,
    eyebrow: 'Massive Global Footprint',
    title: '41K+ Global Visitors ',
    description: 'Connect with a vast consumer base across D-8 nations.',
  },
  {
    icon: Flag,
    eyebrow: 'Historical Reach',
    title: '140+ Countries',
    description: 'Benefit from a platform that has consistently attracted global visitors.',
  },
  {
    icon: Flag,
    eyebrow: 'Trade Network',
    title: '9 Nations',
    description: 'Leverage a unified economic bloc spanning 3 continents.',
  },

];

const ABOUTUS_SNEAKPEAK: { title: string; description: string }[] = [
  {
    title: 'A Strategic Diplomatic Bridge',
    description: 'D-8 Halal Expo Indonesia (HEI) 2026 is where high-level diplomacy meets global commerce. As Part of the D-8 Summit, we provide an unrivaled platform for "Halal Diplomacy," supported by the Ministry of Foreign Affairs of the Republic of Indonesia.<br /><br />From our humble beginnings in 2018 to becoming a global sourcing hub, we have consistently bridged the gap between local innovation and international trade.',
  },
];

export default function OverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const valuePropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import('animejs').then((animeModule) => {
              const animate = animeModule.animate as any;
              const stagger = animeModule.stagger;

              const elements = [
                imageRef.current,
                metricsRef.current,
                introRef.current,
                valuePropRef.current,
              ].filter(Boolean);

              if (elements.length > 0) {
                animate(
                  elements,
                  {
                    opacity: [0, 1],
                    translateY: [30, 0],
                    delay: stagger(200),
                    duration: 800,
                    easing: 'easeOutQuad'
                  }
                );
              }
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="overview">
      <div className={`${styles.inner} hei-container`}>
        {/* 1. Primary content — title + the numbers */}
        <div ref={introRef} className={styles.introContent}>
          <span className={styles.introEyebrow}>D-8 Halal Expo Indonesia 2026 in Numbers</span>
          <h2 className={styles.introTitle}>The Global Halal Powerhouse</h2>
          <div className={styles.introMetricsTitle}>Scaling your business across the world’s most dynamic economic bloc.</div>
          <div ref={metricsRef} className={styles.introMetricsWrapper}>
            <div className={styles.introMetricsContainer}>
              {INTRO_METRIC_CARDS.map(({ icon: Icon, eyebrow, title, description }) => (
                <div key={`${title}-${description}`} className={styles.introMetricsCard}>
                  <div className={styles.introMetricsCardTitle}>
                    <div className={styles.introMetricsCardEyebrowWrapper}>
                      <Icon className={styles.introMetricsCardIcon} />
                      <span className={styles.introMetricsCardEyebrowText}>{eyebrow}</span>
                    </div>
                    <span className={styles.introMetricsCardTitleText}>{title}</span>
                  </div>
                  <div className={styles.introMetricsCardDescription}>
                    <span className={styles.introMetricsCardDescriptionText}>{description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.introDescription}>source: <a href="https://developing8.org/about-d-8/brief-history-of-d-8/" target="_blank" rel="noopener noreferrer">https://developing8.org/about-d-8/brief-history-of-d-8/</a></div>
        </div>

        {/* 2. Visual asset */}
        <div ref={imageRef} className={styles.imageContainer}>
          <Image
            src="/images/overview.jpg"
            alt="HEI 2026 Exhibition"
            width={1600}
            height={400}
            className={styles.image}
            priority={false}
          />
        </div>

        {/* 3. Sneak peek CTA */}
        <div ref={valuePropRef} className={styles.aboutUsSneakpeakWrapper}>
          <div className={styles.aboutUsSneakpeak}>
            <div className={styles.aboutUsSneakpeakItem}>
              <h3 className={styles.aboutUsSneakpeakTitle}>{ABOUTUS_SNEAKPEAK[0].title}</h3>
              <div className={styles.aboutUsSneakpeakDescription} dangerouslySetInnerHTML={{ __html: ABOUTUS_SNEAKPEAK[0].description }} />
            </div>
          </div>
          <div className={styles.introButton}>
            <a href="/about/d8-organization" className={`${buttonStyles.button} ${buttonStyles.yellow} ${styles.button}`}>
              <span className={buttonStyles.text}>Get to Know D-8 More</span>
              <div className={buttonStyles.iconContainer}>
                <ArrowUpRight className={buttonStyles.icon} />
              </div> 
            </a>
          </div>
        </div>
      </div>
        {/* <div ref={metricsRef} className={styles.metricsContainerWrapper}>
          <div className={styles.metricsContainer}>
          <div className={styles.metric}>
            <Globe className={styles.metricIcon} />
            <div className={styles.metricContent}>
              <div className={styles.metricValue}>9+ Countries</div>
              <div className={styles.metricLabel}>Participanting Countries</div>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.metric}>
            <Briefcase className={styles.metricIcon} />
            <div className={styles.metricContent}>
              <div className={styles.metricValue}>±100 Session</div>
              <div className={styles.metricLabel}>Business Matching</div>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.metric}>
            <Mic className={styles.metricIcon} />
            <div className={styles.metricContent}>
              <div className={styles.metricValue}>±15 Session</div>
              <div className={styles.metricLabel}>Business Talkshow</div>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.metric}>
            <Building2 className={styles.metricIcon} />
            <div className={styles.metricContent}>
              <div className={styles.metricValue}>±100 Company</div>
                <div className={styles.metricLabel}>Exhibitor/Seller</div>
              </div>
            </div>
          </div>
        </div> */}

      {/* Introduction Subsection
      <div ref={introRef} className={styles.subsection}>
        <div className={styles.subsectionContent}>
          <div className={styles.subsectionText}>
            <span className={styles.eyebrow}>INTRODUCTION</span>
            <h2 className={styles.title}>Connecting Global Halal Economy</h2>
            <p className={styles.description}>
              D-8 Halal Expo Indonesia 2026 is the strategic halal trade and investment platform aligned with the D-8 Summit, uniting governments, global buyers, investors, and halal industry leaders in one integrated ecosystem.
            </p>
            <div className={styles.buttonGroup}>
              <a 
                href="https://drive.google.com/drive/folders/1Hhl1Bp-z1jwlsGrVGhwGylOibyhOzi9c" 
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonStyles.button} ${buttonStyles.yellow} ${styles.button}`}
              >
                <span className={buttonStyles.text}>Download Brochure</span>
                <div className={buttonStyles.iconContainer}>
                  <ArrowUpRight className={buttonStyles.icon} />
                </div>
              </a>
              <Button 
                href="#opportunities" 
                variant="tertiary" 
                className={styles.tertiaryButton}
                textClassName={styles.tertiaryButtonText}
              >
                Explore Opportunities
              </Button>
            </div>
          </div>
          <div className={styles.subsectionImage}>
            <Image
              src="/images/exhibition-1.png"
              alt="HEI 2026 Exhibition"
              width={800}
              height={450}
              className={styles.introImage}
              priority={false}
            />
          </div>
        </div>
      </div> */}

      {/* Value Proposition Subsection
      <div ref={valuePropRef} className={styles.subsection}>
        <div className={styles.valueContainer}>
          <div className={styles.valueHeader}>
            <span className={styles.eyebrow}>VALUE PROPOSITION</span>
            <h2 className={styles.title}>One Event. Two Strategic Engines.</h2>
          </div>
          <p className={styles.ValueDescription}>
          D-8 Halal Expo Indonesia 2026 bridges high-level D-8 economic diplomacy and real-sector halal business by connecting policy dialogue with concrete B2B collaboration, investment, and trade.
          </p>
          <div className={styles.buttonGroup}>
            <Button href="#how-it-works" variant="yellow" className={styles.button}>
              See How It Works
            </Button>
          </div>
          <div className={styles.imageGrid}>
            <div className={styles.tennisImageContainer}>
              <Image
                src="/images/tennis-indoor.png"
                alt="D-8 Halal Expo Indonesia 2026 Venue 1"
                width={800}
                height={480}
                className={styles.tennisImage}
                priority={false}
              />
            </div>
            <div className={styles.tennisImageContainer}>
              <div className={styles.tennisImageTitle}>
                <p className={styles.tennisImageTitleText}>Venue Layout</p>
              </div>
              <div className={styles.tennisImageContainerImage}>
                <Image
                  src="/images/layout-3D.jpeg"
                  alt="D-8 Halal Expo Indonesia 2026 Venue Layout"
                  width={800}
                  height={480}
                  className={styles.tennisImage}
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}
