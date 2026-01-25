'use client';

import { useEffect } from 'react';
import { X, Phone, Mail } from 'lucide-react';
import styles from './ContactModal.module.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
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

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          <X className={styles.closeIcon} />
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Contact Us</h2>
          <p className={styles.modalSubtitle}>Get in touch with our team</p>
        </div>

        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <h3 className={styles.sectionTitle}>Sales</h3>
            <div className={styles.contactButtons}>
              <a 
                href="https://wa.me/62895403824515" 
                className={styles.contactButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.contactIconContainer}>
                  <Phone className={styles.contactIcon} />
                </div>
                <span className={styles.contactText}>Chat Sales</span>
              </a>
              <a 
                href="mailto:Sales@halalexpoindonesia.com" 
                className={styles.contactButton}
              >
                <div className={styles.contactIconContainer}>
                  <Mail className={styles.contactIcon} />
                </div>
                <span className={styles.contactText}>Mail Sales</span>
              </a>
            </div>
          </div>

          <div className={styles.contactSection}>
            <h3 className={styles.sectionTitle}>Marketing</h3>
            <div className={styles.contactButtons}>
              <a 
                href="https://wa.me/62895428247935" 
                className={styles.contactButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.contactIconContainer}>
                  <Phone className={styles.contactIcon} />
                </div>
                <span className={styles.contactText}>Chat Marketing</span>
              </a>
              <a 
                href="mailto:marketing@halalexpoindonesia.com" 
                className={styles.contactButton}
              >
                <div className={styles.contactIconContainer}>
                  <Mail className={styles.contactIcon} />
                </div>
                <span className={styles.contactText}>Mail Marketing</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
