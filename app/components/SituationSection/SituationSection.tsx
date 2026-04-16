'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './SituationSection.module.css';

const COPY_ID =
  'Terkait pelaksanaan D-8 Halal Expo Indonesia, saat ini kami masih melakukan koordinasi intensif dengan Kementerian Luar Negeri guna menyesuaikan dengan rangkaian agenda KTT D-8. Oleh karena itu, penetapan jadwal terbaru akan segera kami sampaikan setelah mendapatkan arahan lebih lanjut.';

const COPY_EN =
  "The D-8 Halal Expo Indonesia has been rescheduled as we are currently awaiting further guidance and synchronization with the Ministry of Foreign Affairs, given the event's integration with the D-8 Summit agenda. We will announce the finalized schedule as soon as the coordination process is complete.";

export default function SituationSection() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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
          <div className={styles.grid}>
            <div className={styles.column}>
              <h1 id="situation-heading" className={styles.title}>
                Kami <em>memohon maaf</em> atas ketidaknyamanan yang ditimbulkan.
              </h1>
              <p lang="id" className={styles.text}>
                {COPY_ID}
              </p>
            </div>
            <div className={styles.divider} role="presentation" />
            <div className={styles.column}>
              <h2 className={styles.title}>
                We <em>sincerely apologize</em> for any inconvenience.
              </h2>
              <p lang="en" className={styles.text}>
                {COPY_EN}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.continueButton} onClick={dismiss}>
            Mengerti · Continue
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
