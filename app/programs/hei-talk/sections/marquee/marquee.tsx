'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkle } from 'lucide-react';
import styles from './marquee.module.css';

const TOPICS = [
  'Global Market Trends',
  'Regulation & Halal Standards',
  'Innovation & Technology',
  'Islamic Finance & Investment',
  'Sustainability & ESG',
  'Youth & Future Talent',
];

export default function MarqueeStrip() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(`.${styles.track}`, {
        xPercent: -50,
        duration: 28,
        ease: 'none',
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const items = [...TOPICS, ...TOPICS];

  return (
    <div ref={rootRef} className={styles.strip} aria-hidden="true">
      <div className={styles.track}>
        {items.map((topic, i) => (
          <span key={`${topic}-${i}`} className={styles.item}>
            <Sparkle size={14} strokeWidth={1.5} className={styles.itemIcon} />
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}
