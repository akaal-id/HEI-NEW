'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import Button from '../Button/Button';
import { useIsClient } from '../../hooks/useIsClient';
import styles from './D8Hei2026Archive.module.css';

const OurDelegatesSection = dynamic(() => import('../OurDelegates/OurDelegatesSection'), {
  loading: () => <div style={{ minHeight: '280px', background: 'white' }} />,
});
const PartnerSneakPeek = dynamic(() => import('../PartnerSneakPeek/PartnerSneakPeek'), {
  loading: () => <div style={{ minHeight: '400px', background: 'white' }} />,
});
const OverviewSection = dynamic(() => import('../OverviewSection/OverviewSection'), {
  loading: () => <div style={{ height: '100vh', background: 'var(--hei26-linearblue)' }} />,
});
const ProgramSection = dynamic(() => import('../ProgramSection/ProgramSection'), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});
const VenueProfileSection = dynamic(() => import('../VenueProfileSection/VenueProfileSection'), {
  loading: () => <div style={{ minHeight: '320px' }} />,
});
const OfficialHotelPartnerSection = dynamic(
  () => import('../OfficialHotelPartnerSection/OfficialHotelPartnerSection'),
  { loading: () => <div style={{ minHeight: '360px', background: 'var(--hei26-cream)' }} /> }
);
const BrochureSection = dynamic(() => import('../BrochureSection/BrochureSection'), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});
const FAQSection = dynamic(() => import('../FAQSection/FAQSection'), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});
const PartnerSection = dynamic(() => import('../PartnerSection/PartnerSection'), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});

export default function D8Hei2026Archive() {
  const isClient = useIsClient();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      <section className={styles.teaser}>
        <div className={styles.teaserInner}>
          <span className={styles.eyebrow}>The Full 2026 Experience</span>
          <h2 className={styles.title}>See D-8 HEI 2026</h2>
          <p className={styles.lead}>
            Explore delegates, programs, the venue, and partners from the 6th Halal Expo
            Indonesia.
          </p>
          <Button variant="yellow" onClick={() => setIsOpen(true)}>
            See D-8 HEI 2026
          </Button>
        </div>
      </section>

      {isClient &&
        isOpen &&
        createPortal(
          <div className={styles.overlay} role="presentation">
            <div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="d8hei2026-archive-title"
            >
              <div className={styles.modalBar}>
                <span id="d8hei2026-archive-title" className={styles.modalBarTitle}>
                  D-8 HEI 2026
                </span>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close D-8 HEI 2026"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <OurDelegatesSection preview />
              <PartnerSneakPeek />
              <OverviewSection />
              <ProgramSection />
              <VenueProfileSection />
              <OfficialHotelPartnerSection />
              <BrochureSection />
              <FAQSection />
              <PartnerSection />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
