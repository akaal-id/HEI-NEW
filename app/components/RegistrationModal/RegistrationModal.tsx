'use client';

import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import Button from '../Button/Button';
import { getEmailProviderLink } from '../../lib/email-provider';
import styles from './RegistrationModal.module.css';

export type RegistrationModalRow = {
  label: string;
  value: string;
  highlight?: boolean;
};

type RegistrationModalProps = {
  isOpen: boolean;
  phase: 'confirm' | 'success';
  rows: RegistrationModalRow[];
  email: string;
  successTitle: string;
  successMessage: string;
  isSubmitting?: boolean;
  error?: string | null;
  onClose: () => void;
  onConfirm: () => void;
  onSubmitAnother: () => void;
};

export default function RegistrationModal({
  isOpen,
  phase,
  rows,
  email,
  successTitle,
  successMessage,
  isSubmitting = false,
  error = null,
  onClose,
  onConfirm,
  onSubmitAnother,
}: RegistrationModalProps) {
  const emailProvider = getEmailProviderLink(email);

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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-modal-title"
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {phase === 'confirm' ? (
          <>
            <div className={styles.header}>
              <h2 id="registration-modal-title" className={styles.title}>
                Confirm your registration
              </h2>
              <p className={styles.subtitle}>
                Please review your details before submitting.
              </p>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.label}
                      className={row.highlight ? styles.highlightRow : undefined}
                    >
                      <th scope="row" className={styles.labelCell}>
                        {row.label}
                      </th>
                      <td className={styles.valueCell}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.actions}>
              <Button
                type="button"
                variant="primary"
                className={styles.confirmButton}
                textClassName={styles.confirmButtonText}
                onClick={onConfirm}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className={styles.secondaryButton}
                textClassName={styles.secondaryButtonText}
                onClick={onClose}
                disabled={isSubmitting}
              >
                Edit details
              </Button>
            </div>
          </>
        ) : (
          <div className={styles.successBody}>
            <div className={styles.successIconWrap} aria-hidden>
              <CheckCircle2 className={styles.successIcon} />
            </div>
            <h2 id="registration-modal-title" className={styles.successTitle}>
              {successTitle}
            </h2>
            <p className={styles.successText}>{successMessage}</p>

            <div className={styles.successActions}>
              {emailProvider ? (
                <Button
                  href={emailProvider.href}
                  variant="primary"
                  className={styles.openEmailButton}
                  textClassName={styles.openEmailButtonText}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {emailProvider.label}
                </Button>
              ) : (
                <p className={styles.emailPlain}>{email}</p>
              )}

              <Button
                type="button"
                variant="secondary"
                className={styles.secondaryButton}
                textClassName={styles.secondaryButtonText}
                onClick={onSubmitAnother}
              >
                Submit another registration
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}