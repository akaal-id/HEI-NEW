'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Calendar, Phone } from 'lucide-react';
import ContactModal from '../ContactModal/ContactModal';
import styles from './ContactButton.module.css';

export default function ContactButton() {
  const pathname = usePathname();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const isGuide =
    pathname === '/guide' || Boolean(pathname?.startsWith('/guide/'));

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => {
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      <div className={styles.sideActions} aria-label="Quick actions">
        <button
          type="button"
          className={`${styles.sideButton} ${styles.contactButton}`}
          onClick={() => setIsContactModalOpen(true)}
          aria-label="Contact us"
        >
          <Phone className={styles.buttonIcon} aria-hidden="true" />
          <span className={styles.buttonText}>Contact Us</span>
        </button>

        <Link
          href="/guide"
          className={`${styles.sideButton} ${styles.guideButton} ${isGuide ? styles.guideButtonActive : ''}`}
          aria-current={isGuide ? 'page' : undefined}
        >
          <BookOpen className={styles.buttonIcon} aria-hidden="true" />
          <span className={styles.buttonText}>Guide</span>
        </Link>

        <button
          type="button"
          className={`${styles.sideButton} ${styles.scheduleButton}`}
          disabled
          aria-label="Schedule (coming soon)"
        >
          <Calendar className={styles.buttonIcon} aria-hidden="true" />
          <span className={styles.buttonText}>Schedule</span>
        </button>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
