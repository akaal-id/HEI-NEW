'use client';

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import ContactModal from '../ContactModal/ContactModal';
import styles from './ContactButton.module.css';

export default function ContactButton() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

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
      <button
        className={styles.contactButton}
        onClick={() => setIsContactModalOpen(true)}
        aria-label="Contact us"
      >
        <Phone className={styles.phoneIcon} />
        <span className={styles.contactText}>Contact Us</span>
      </button>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  );
}
