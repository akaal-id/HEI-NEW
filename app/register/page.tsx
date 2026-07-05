import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { REGISTER_SECTIONS } from '../data/registerSections';
import styles from './RegisterHubPage.module.css';

export default function RegisterPage() {
  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <span className={styles.heroEyebrow}>Registration</span>
          <h1 className={styles.heroTitle}>Choose Your Registration</h1>
          <p className={styles.heroSubtitle}>
            Select the event and registration type that fits your participation.
          </p>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.sections}>
          {REGISTER_SECTIONS.map((section) => (
            <section
              key={section.id}
              className={`${styles.section} ${styles[`section${section.variant}`]}`}
            >
              <div className={styles.sectionHeader}>
                <span className={styles.sectionEyebrow}>{section.eyebrow}</span>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <p className={styles.sectionSubtitle}>{section.subtitle}</p>
              </div>

              <div className={styles.optionList}>
                {section.options.map((option) => {
                  const Icon = option.icon;

                  if (option.disabled) {
                    return (
                      <div
                        key={option.label}
                        className={`${styles.optionCard} ${styles.optionCardDisabled}`}
                        aria-disabled="true"
                      >
                        <span className={styles.optionIconWrap} aria-hidden="true">
                          <Icon className={styles.optionIcon} />
                        </span>
                        <span className={styles.optionCopy}>
                          <span className={styles.optionLabel}>{option.label}</span>
                          <span className={styles.optionDescription}>{option.description}</span>
                        </span>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={option.href}
                      href={option.href}
                      className={styles.optionCard}
                    >
                      <span className={styles.optionIconWrap} aria-hidden="true">
                        <Icon className={styles.optionIcon} />
                      </span>
                      <span className={styles.optionCopy}>
                        <span className={styles.optionLabel}>{option.label}</span>
                        <span className={styles.optionDescription}>{option.description}</span>
                      </span>
                      <ArrowUpRight className={styles.optionArrow} aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
