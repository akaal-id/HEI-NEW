'use client';

import { useState } from 'react';
import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import { ArrowUpRight } from 'lucide-react';
import buttonStyles from '../../../../components/Button/Button.module.css';
import styles from './brochure.module.css';

const BROCHURE_FILE = '/files/D8-HEI-2025_Brochure.pdf';
const SWITCH_DURATION_MS = 320;
const SUCCESS_DISPLAY_MS = 1100;

export default function BrochureSection() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.15 });
  const [email, setEmail] = useState('');
  const [activePanel, setActivePanel] = useState<'email' | 'success' | 'download'>('email');
  const [isSwitching, setIsSwitching] = useState(false);

  const switchPanel = (nextPanel: 'email' | 'success' | 'download') => {
    setIsSwitching(true);
    window.setTimeout(() => {
      setActivePanel(nextPanel);
      setIsSwitching(false);
    }, SWITCH_DURATION_MS);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    switchPanel('success');
    window.setTimeout(() => {
      switchPanel('download');
    }, SUCCESS_DISPLAY_MS);
  };

  const handleDownloadClick = () => {
    window.setTimeout(() => {
      setEmail('');
      switchPanel('email');
    }, 300);
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

          <article className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <span className={styles.previewEyebrow}>Brochure Preview</span>
              <p className={styles.previewTitle}>D-8 HEI Exhibition 2025</p>
            </div>
            <div className={styles.previewFrame}>
              <iframe
                title="D-8 HEI Brochure Preview"
                src={`${BROCHURE_FILE}#page=1&view=Fit&toolbar=0&navpanes=0&scrollbar=0`}
                className={styles.previewEmbed}
                loading="lazy"
              />
            </div>
          </article>

          <div className={`${styles.actionSwitcher} ${isSwitching ? styles.switching : ''}`}>
            <div className={`${styles.actionContent} ${activePanel === 'email' ? styles.active : ''}`}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to download brochure" 
                  className={styles.input}
                />
                <button type="submit" className={`${styles.submitBtn} ${buttonStyles.button} ${buttonStyles.yellow}`}>
                  <span className={buttonStyles.text}>Submit Email</span>
                  <div className={buttonStyles.iconContainer}>
                    <ArrowUpRight className={buttonStyles.icon} />
                  </div>
                </button>
              </form>
            </div>

            <div className={`${styles.actionContent} ${activePanel === 'success' ? styles.active : ''}`}>
              <div className={styles.successWrap}>
                <p className={styles.successMessage}>
                  Email submitted successfully. Your brochure is ready to download.
                </p>
              </div>
            </div>

            <div className={`${styles.actionContent} ${activePanel === 'download' ? styles.active : ''}`}>
              <div className={styles.downloadWrap}>
                <a
                  href={BROCHURE_FILE}
                  download="D8-HEI-2025_Brochure.pdf"
                  onClick={handleDownloadClick}
                  className={`${styles.submitBtn} ${buttonStyles.button} ${buttonStyles.yellow}`}
                >
                  <span className={buttonStyles.text}>Download Brochure</span>
                  <div className={buttonStyles.iconContainer}>
                    <ArrowUpRight className={buttonStyles.icon} />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.badges}>
            <span className={styles.badge}>D-8 Summit 2026</span>
            <span className={styles.badge}>D-8 Halal Expo Indonesia 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
