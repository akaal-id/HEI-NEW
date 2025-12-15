'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, CheckCircle } from 'lucide-react';
import Button from '../Button/Button';
import styles from './Footer.module.css';
import { useGoogleForm } from '../../hooks/useGoogleForm';

export default function Footer() {
  const { email, setEmail, status, handleSubmit, resetForm } = useGoogleForm();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.columnLeft}>
            <div className={styles.logo}>
              <Image
                src="/icon/HEI 2026_Logo only_w.svg"
                alt="HEI 2026"
                width={120}
                height={60}
                style={{ width: 'auto', height: '60px' }}
              />
            </div>
            <h4 className={styles.heading}>Headoffice</h4>
            <p className={styles.text}>
              Jl. Gotong Royong I No.50 Rt.004/DI, RT.3/RW.1,<br />
              Ragunan, Ps. Minggu, Kota Jakarta Selatan,<br />
              Daerah Khusus Ibukota Jakarta 12550
            </p>
          </div>

          <div className={styles.columnMiddle}>
            <h4 className={styles.heading}>Contact us</h4>
            <ul className={styles.linkList}>
              <li><Link href="#" className={styles.link}>Sales Mail</Link></li>
              <li><Link href="#" className={styles.link}>Sales Whatsapp</Link></li>
              <li><Link href="#" className={styles.link}>Marketing Mail</Link></li>
              <li><Link href="#" className={styles.link}>Marketing Whatsapp</Link></li>
            </ul>
          </div>

          <div className={styles.columnRight}>
            <h4 className={styles.mainHeading} style={{ color: '#F5F5F5' }}>
              Get our latest updates, <span style={{ color: '#FBBF24' }}>here!</span>
            </h4>
            
            {status === 'success' ? (
              <div className={styles.successContainer}>
                <p className={styles.successMessage}>Thank you! You've been subscribed.</p>
                <Button onClick={resetForm} className={styles.subscribeButton} icon={CheckCircle}>
                  Add another email
                </Button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  placeholder="YOUR EMAIL HERE" 
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'submitting'}
                />
                <Button 
                  icon={Mail} 
                  className={styles.subscribeButton} 
                  type="submit"
                >
                  {status === 'submitting' ? 'Sending...' : 'Subscribe'}
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © 2025 Halal Export Indonesia. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="#" className={styles.legalLink}>Privacy Policy</Link>
            <Link href="#" className={styles.legalLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
