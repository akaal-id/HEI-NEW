'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';
import { useIsClient } from '../../hooks/useIsClient';
import { REGISTER_SECTIONS } from '../../data/registerSections';
import styles from './RegisterHubModal.module.css';

interface RegisterHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterHubModal({ isOpen, onClose }: RegisterHubModalProps) {
  const isClient = useIsClient();

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
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isClient || !isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-hub-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close registration menu"
        >
          <X className={styles.closeIcon} aria-hidden="true" />
        </button>

        <header className={styles.header}>
          <span className={styles.eyebrow}>Registration</span>
          <h2 id="register-hub-title" className={styles.title}>
            Choose Your Registration
          </h2>
          <p className={styles.subtitle}>
            Select the event and registration type that fits your participation.
          </p>
        </header>

        <div className={styles.sections}>
          {REGISTER_SECTIONS.map((section) => (
            <section
              key={section.id}
              className={`${styles.section} ${styles[`section${section.variant}`]}`}
            >
              <div className={styles.sectionHeader}>
                <span className={styles.sectionEyebrow}>{section.eyebrow}</span>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <p className={styles.sectionSubtitle}>{section.subtitle}</p>
              </div>

              <div className={styles.optionList}>
                {section.options.map((option) => {
                  const Icon = option.icon;

                  return (
                    <Link
                      key={option.href}
                      href={option.href}
                      className={styles.optionCard}
                      onClick={onClose}
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
    </div>,
    document.body
  );
}
