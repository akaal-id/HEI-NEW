'use client';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Users, KeyRound, Globe } from 'lucide-react';
import Button from '../Button/Button';
import { BUYER_REGISTRATION_FORM_URL } from '../../lib/registration-data';
import styles from './ProgramPage.module.css';

export default function ProgramBusinessMatching() {
  const [heroRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [contentRef, isContentVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [textRef, isTextVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [benefitsRef, isBenefitsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [stepsRef, isStepsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [ctaRef, isCtaVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef as React.RefObject<HTMLElement>}
        className={`${styles.heroSection} ${isHeroVisible ? styles.fadeIn : ''}`}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80)',
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <p className={styles.heroEyebrow}>Our Programs</p>
          <h1 className={styles.heroTitle}>Business Matching</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef as React.RefObject<HTMLElement>} className={styles.section}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div ref={textRef as React.RefObject<HTMLDivElement>} className={`${styles.textContent} ${isTextVisible ? styles.fadeInUp : ''}`}>
              <p className={styles.description}>
                The Business Matching program at D-8 Halal Expo Indonesia 2026 facilitates direct connections between exhibitors and qualified buyers through pre-scheduled meetings. This program enables businesses to engage in meaningful discussions, explore partnership opportunities, and establish long-term commercial relationships.
              </p>
              <p className={styles.description}>
                With approximately 100 business matching sessions expected, participants can maximize their networking opportunities and accelerate their business growth in the halal market. Our platform ensures that each meeting is strategically aligned with participants' business objectives and market interests.
              </p>
              <Button
                href={BUYER_REGISTRATION_FORM_URL}
                variant="primary"
                className={styles.actionButton}
              >
                Register as Buyer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div ref={benefitsRef as React.RefObject<HTMLDivElement>} className={`${styles.textContent} ${isBenefitsVisible ? styles.fadeInUp : ''}`}>
            <h2 className={styles.sectionTitle}>Strategic Advantages for Your Halal Enterprise</h2>
            <p className={styles.description}>
              Maximize your ROI by connecting directly with high-profile stakeholders across the D-8 nations and beyond. Our platform eliminates the guesswork from networking.
            </p>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <Users size={28} />
                </div>
                <h3 className={styles.benefitTitle}>Curated Connections</h3>
                <p className={styles.benefitDescription}>
                  Vetted matchmaking ensures you only meet with relevant, high-potential partners.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <KeyRound size={28} />
                </div>
                <h3 className={styles.benefitTitle}>Direct Access</h3>
                <p className={styles.benefitDescription}>
                  Bypass gatekeepers and present your solutions directly to procurement heads and investors.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <Globe size={28} />
                </div>
                <h3 className={styles.benefitTitle}>Cross-Border Expansion</h3>
                <p className={styles.benefitDescription}>
                  Open doors to the lucrative market of the D-8 member states, representing over 1.2 billion people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div ref={stepsRef as React.RefObject<HTMLDivElement>} className={`${styles.textContent} ${isStepsVisible ? styles.fadeInUp : ''}`}>
            <h2 className={styles.sectionTitle}>Your Path to Partnership: How It Works</h2>
            <p className={styles.description}>
              A streamlined, efficient process designed to ensure your time at the expo translates into tangible business outcomes.
            </p>
            <div className={styles.stepsContainer}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Profile Registration</h3>
                  <p className={styles.stepDescription}>
                    Submit your company portfolio, target market, and specific partnership objectives.
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Catalog Browsing</h3>
                  <p className={styles.stepDescription}>
                    Access our exclusive directory to review participating global buyers, investors, and exhibitors.
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Meeting Scheduling</h3>
                  <p className={styles.stepDescription}>
                    Send, receive, and confirm meeting invitations through our dedicated digital portal prior to the event.
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>On-Site Engagement</h3>
                  <p className={styles.stepDescription}>
                    Execute your pre-arranged meetings in our private, dedicated B2B lounges during the Expo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Register CTA Section */}
      <section className={styles.ctaSection}>
        <div ref={ctaRef as React.RefObject<HTMLDivElement>} className={`${styles.ctaContainer} ${isCtaVisible ? styles.fadeInUp : ''}`}>
          <h2 className={styles.ctaTitle}>Secure Your Position in the Global Halal Supply Chain</h2>
          <p className={styles.ctaText}>
            The global halal economy is rapidly expanding across food, technology, cosmetics, and beyond. Relying on chance encounters on the exhibition floor isn&apos;t enough to scale a modern business. By registering for the Business Matching program at D-8 Halal Expo Indonesia 2026, you position your brand squarely in front of active investors and international delegates actively seeking halal-certified collaborations. Guarantee your high-value meetings before the doors even open.
          </p>
          <Button
            href={BUYER_REGISTRATION_FORM_URL}
            variant="yellow"
            className={styles.ctaButton}
          >
            Register as Buyer
          </Button>
        </div>
      </section>
    </>
  );
}
