'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Mail, Download, CheckCircle } from 'lucide-react';
import styles from './BrochureSection.module.css';
import Button from '../Button/Button';
import { useGoogleForm } from '../../hooks/useGoogleForm';

const BROCHURE_PDF = '/brochure/D8-HEI%202026_Brochure.pdf';
const BROCHURE_PREVIEW = '/brochure/HEI-brochure-prev.jpg';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BrochureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { email, setEmail, status, handleSubmit, resetForm } = useGoogleForm();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import('animejs').then((animeModule) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const animate = animeModule.animate as any;
              const stagger = animeModule.stagger;

              const elements = [headerRef.current, cardRef.current].filter(Boolean);

              if (elements.length > 0) {
                animate(elements, {
                  opacity: [0, 1],
                  translateY: [30, 0],
                  delay: stagger(200),
                  duration: 800,
                  easing: 'easeOutQuad',
                });
              }
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = BROCHURE_PDF;
    link.download = 'D8-HEI-2026-Brochure.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isSuccess = status === 'success';
  const isSubmitting = status === 'submitting';
  const submitDisabled = !EMAIL_REGEX.test(email.trim()) || isSubmitting;

  return (
    <section ref={sectionRef} className={styles.section} id="brochure">
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>BROCHURE</span>
          <h2 className={styles.title}>
            Get the official <em>D-8 HEI 2026</em> Brochure
          </h2>
          <p className={styles.description}>
            Discover programs, partnership opportunities, venue details, and the full agenda
            in one downloadable file. Drop your email below to get instant access.
          </p>
        </div>

        <div ref={cardRef} className={styles.card}>
          <div className={styles.imageColumn}>
            <div className={styles.imageFrame}>
              <Image
                src={BROCHURE_PREVIEW}
                alt="D-8 Halal Expo Indonesia 2026 brochure preview"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className={styles.image}
                priority={false}
              />
            </div>
            <span className={styles.fileBadge}>D-8 HEI 2026 Brochure</span>
          </div>

          <div className={styles.formColumn}>
            <span className={styles.formEyebrow}>Free Download</span>
            <h3 className={styles.formTitle}>
              Receive your copy of the official brochure.
            </h3>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {!isSuccess ? (
                <div className={styles.fieldGroup}>
                  <label htmlFor="brochure-email" className={styles.label}>
                    Email address
                  </label>
                  <input
                    id="brochure-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className={styles.input}
                    aria-describedby="brochure-helper"
                  />
                </div>
              ) : (
                <div className={styles.successBox} role="status" aria-live="polite">
                  <CheckCircle className={styles.successIcon} aria-hidden />
                  <div className={styles.successCopy}>
                    <span className={styles.successTitle}>You&apos;re all set.</span>
                    <span className={styles.successText}>
                      Click the button below to download your brochure.
                    </span>
                  </div>
                </div>
              )}

              <Button
                type={isSuccess ? 'button' : 'submit'}
                variant="primary"
                icon={isSuccess ? Download : Mail}
                onClick={isSuccess ? handleDownload : undefined}
                disabled={isSuccess ? false : submitDisabled}
                className={styles.actionButton}
                ariaLabel={isSuccess ? 'Download brochure' : 'Submit email'}
              >
                {isSuccess
                  ? 'Download Brochure'
                  : isSubmitting
                  ? 'Submitting…'
                  : 'Submit Email'}
              </Button>

              {status === 'error' && (
                <p className={styles.errorText} role="alert">
                  Something went wrong. Please try again in a moment.
                </p>
              )}

              {isSuccess && (
                <button
                  type="button"
                  className={styles.linkButton}
                  onClick={resetForm}
                >
                  Use a different email
                </button>
              )}

              <p id="brochure-helper" className={styles.helperText}>
                We&apos;ll only use your email to send official D-8 HEI 2026 updates.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
