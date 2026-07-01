import Image from 'next/image';
import type { Metadata } from 'next';
import FAQSection from '../components/FAQSection/FAQSection';
import { faqItems } from '../data/faq';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "FAQ | HEI 2026 - Halal Expo Indonesia",
  description: "Frequently asked questions about the 6th D-8 Halal Expo Indonesia 2026 — registration, exhibitors, buyers, business matching, and more.",
  keywords: [
    "HEI 2026 FAQ",
    "Halal Expo Indonesia Questions",
    "D-8 Halal Expo FAQ",
    "Halal Exhibition Registration",
    "Halal Business Matching FAQ",
    "Halal Expo Exhibitor Info",
    "Halal Expo Buyer Info",
  ],
  openGraph: {
    title: "FAQ | HEI 2026 - Halal Expo Indonesia",
    description: "Answers to the most frequently asked questions about D-8 Halal Expo Indonesia 2026.",
    url: "https://halalexpoindonesia.com/faq",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com/faq",
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <section className={styles.heroSection} aria-labelledby="faq-hero-title">
        <div className={styles.decoration} aria-hidden="true">
          <Image
            src="/D8-assets/circle_D8.svg"
            alt=""
            width={1000}
            height={1000}
            className={styles.decorationImage}
            priority
          />
        </div>

        <div className={styles.heroContainer}>
          <span className={styles.eyebrow}>Frequently Asked Questions</span>
          <h1 id="faq-hero-title" className={styles.heroTitle}>
            Everything You Need to{' '}
            <span className={styles.heroTitleAccent}>Know</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Browse answers about registration, exhibiting, buyers, business matching, and the full program lineup of D-8 Halal Expo Indonesia 2026. Still have questions? Our team is one message away.
          </p>
        </div>
      </section>

      <div className={styles.content}>
        <FAQSection
          limit={0}
          showViewAll={false}
          eyebrow="ALL QUESTIONS"
          title="Your Questions, Answered"
          description="Tap any question to expand the answer."
        />
      </div>
    </main>
  );
}
