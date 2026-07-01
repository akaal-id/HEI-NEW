'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import styles from './SubmissionLoaderModal.module.css';

const SUBMISSIONS_PER_SECOND = 1.5;
const TICK_MS = Math.ceil(1000 / SUBMISSIONS_PER_SECOND);

type SubmissionLoaderModalProps = {
  isOpen: boolean;
  totalCount: number;
};

export default function SubmissionLoaderModal({
  isOpen,
  totalCount,
}: SubmissionLoaderModalProps) {
  const [processedCount, setProcessedCount] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const frame = window.requestAnimationFrame(() => {
      setProcessedCount(Math.min(1, totalCount));
    });

    const interval = window.setInterval(() => {
      setProcessedCount((prev) => {
        if (prev >= totalCount) return prev;
        return Math.min(prev + 1, totalCount);
      });
    }, TICK_MS);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(interval);
    };
  }, [isOpen, totalCount]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const progressPercent =
    totalCount > 0 ? Math.min(100, Math.round((processedCount / totalCount) * 100)) : 0;
  const showProgress = totalCount > 1;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="submission-loader-title"
      aria-busy="true"
    >
      <div className={styles.modal}>
        <div className={styles.spinnerWrap} aria-hidden>
          <Loader2 className={styles.spinner} />
        </div>

        <h2 id="submission-loader-title" className={styles.title}>
          {totalCount > 1 ? 'Registering your group' : 'Submitting registration'}
        </h2>

        <p className={styles.subtitle}>
          {totalCount > 1
            ? `Processing ${totalCount} visitor registrations. This may take a moment.`
            : 'Please wait while we complete your registration.'}
        </p>

        {showProgress && (
          <>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className={styles.progressLabel}>
              {processedCount} of {totalCount} registered
            </p>
          </>
        )}

        <p className={styles.hint}>Please do not close this window.</p>
      </div>
    </div>
  );
}
