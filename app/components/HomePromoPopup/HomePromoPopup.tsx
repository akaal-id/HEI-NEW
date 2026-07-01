'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { usePortalRoot } from '../../hooks/usePortalRoot';
import styles from './HomePromoPopup.module.css';

/**
 * Homepage promo popups — edit this list only.
 * Add more entries to show multiple promos in sequence.
 */
export const HOME_PROMO_POPUPS = [
  {
    imageSrc: '/culture-festival/popup-culfest.png',
    href: '/programs/culture-festival',
    alt: 'D-8 Culture Festival promotion',
    sticker: 'FREE ENTRY!',
  },
] as const;

const CLOSE_BUTTON_DELAY_MS = 3000;

export default function HomePromoPopup() {
  const popups = HOME_PROMO_POPUPS;
  const portalRoot = usePortalRoot();
  const [open, setOpen] = useState(popups.length > 0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [closeReady, setCloseReady] = useState(false);

  const activePopup = popups[activeIndex];
  const hasMultiple = popups.length > 1;

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => setCloseReady(true), CLOSE_BUTTON_DELAY_MS);
    return () => {
      window.clearTimeout(timer);
      setCloseReady(false);
    };
  }, [open, activeIndex]);

  useBodyScrollLock(open);

  const advanceOrClose = useCallback(() => {
    if (activeIndex < popups.length - 1) {
      setActiveIndex((index) => index + 1);
      return;
    }

    setOpen(false);
  }, [activeIndex, popups.length]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeReady) {
        advanceOrClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, closeReady, advanceOrClose]);

  const onBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || !closeReady) return;
    advanceOrClose();
  };

  if (!portalRoot || !open || !activePopup) return null;

  return createPortal(
    <>
      {hasMultiple && (
        <div className={styles.progressBar} aria-hidden="true">
          {popups.map((popup, index) => {
            const isComplete = index < activeIndex;
            const isActive = index === activeIndex;

            return (
              <div
                key={`${popup.imageSrc}-${index}`}
                className={`${styles.progressSegment} ${isComplete ? styles.progressSegmentComplete : ''} ${isActive ? styles.progressSegmentActive : ''}`}
              >
                <span className={styles.progressFill} />
              </div>
            );
          })}
        </div>
      )}

      <div
        id="homepromo-modal"
        className={styles.overlay}
        onClick={onBackdropClick}
        role="presentation"
      >
        <Link
          href={activePopup.href}
          className={styles.imageLink}
          onClick={(event) => {
            event.stopPropagation();
            setOpen(false);
          }}
          aria-label={activePopup.alt}
        >
          <div className={styles.imageFrame}>
            <Image
              src={activePopup.imageSrc}
              alt={activePopup.alt}
              width={1080}
              height={1350}
              className={styles.image}
              priority
              sizes="(max-width: 480px) 94vw, 420px"
            />
            {activePopup.sticker && (
              <span className={styles.sticker} aria-hidden="true">
                {activePopup.sticker}
              </span>
            )}
          </div>
        </Link>
      </div>

      <button
        type="button"
        className={`${styles.closeButton} ${closeReady ? styles.closeButtonVisible : ''}`}
        onClick={advanceOrClose}
        aria-label={activeIndex < popups.length - 1 ? 'Next promotion' : 'Close promotion'}
        tabIndex={closeReady ? 0 : -1}
      >
        <X className={styles.closeIcon} aria-hidden />
      </button>
    </>,
    portalRoot,
  );
}
