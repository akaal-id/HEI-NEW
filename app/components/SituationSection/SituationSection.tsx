'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, CheckCircle } from 'lucide-react';
import styles from './SituationSection.module.css';
import { useGoogleForm } from '../../hooks/useGoogleForm';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import Button from '../Button/Button';

const BODY_COPY =
  'Subscribe for the latest news on event highlights, exhibitor slots, partnership opportunities, and program announcements<br></br>Stay updated on D-8 Halal Expo Indonesia 2026!';

export default function SituationSection() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(true);
  const { email, setEmail, status, handleSubmit, resetForm } = useGoogleForm();

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
  }, []);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, dismiss]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) dismiss();
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onBackdropClick}
      role="presentation"
    >
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="situation-heading"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={dismiss}
          aria-label="Close announcement"
        >
          <X className={styles.closeIcon} aria-hidden />
        </button>

        <div className={styles.inner}>
          <h2 id="situation-heading" className={styles.title}>
            Get the <em>latest offering</em>, straight to your inbox.
          </h2>

          <p className={styles.text} dangerouslySetInnerHTML={{ __html: BODY_COPY }} />

          {status === 'success' ? (
            <div className={styles.success} role="status" aria-live="polite">
              <CheckCircle className={styles.successIcon} aria-hidden />
              <p className={styles.successText}>
                You&apos;re subscribed. We&apos;ll keep you posted.
              </p>
              <button
                type="button"
                className={styles.linkButton}
                onClick={resetForm}
              >
                Add another email
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <label htmlFor="situation-email" className={styles.label}>
                Email address
              </label>
              <div className={styles.inputRow}>
                <input
                  id="situation-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'submitting'}
                  className={styles.input}
                />
                <Button
                  type="submit"
                  icon={Mail}
                  className={styles.submitButton}
                  textClassName={styles.submitText}
                  iconClassName={styles.submitIcon}
                  disabled={status === 'submitting' || !email}
                >
                  {status === 'submitting' ? 'Sending…' : 'Subscribe'}
                </Button>
           
              </div>
              {status === 'error' && (
                <p className={styles.errorText} role="alert">
                  Something went wrong. Please try again in a moment.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
