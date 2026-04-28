'use client';

import { useState } from 'react';
import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import { ArrowUpRight } from 'lucide-react';
import buttonStyles from '../../../../components/Button/Button.module.css';
import styles from './brochure.module.css';

export default function BrochureSection() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your brochures are being securely downloaded.');
    setEmail('');
  };

  return (
    <section className={styles.section}>
      <div 
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className={`${styles.container} ${isVisible ? styles.visible : ''}`}
      >
        <div className={styles.content}>
          <span className={styles.eyebrow}>Exhibition Prospectus</span>
          <h2 className={styles.title}>
            Download Exhibition Brochure
          </h2>
          <p className={styles.lead}>
            Read our brochure to learn more about D-8 Summit and D-8 Halal Expo Indonesia 2026.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to download brochures" 
              className={styles.input}
            />
            <button type="submit" className={`${styles.submitBtn} ${buttonStyles.button} ${buttonStyles.yellow}`}>
              <span className={buttonStyles.text}>Submit Email</span>
              <div className={buttonStyles.iconContainer}>
                <ArrowUpRight className={buttonStyles.icon} />
              </div>
            </button>
          </form>

          <div className={styles.badges}>
            <span className={styles.badge}>D-8 Summit 2026</span>
            <span className={styles.badge}>D-8 Halal Expo Indonesia 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
