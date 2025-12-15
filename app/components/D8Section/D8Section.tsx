'use client';

import Image from 'next/image';
import { Send, CheckCircle } from 'lucide-react';
import Button from '../Button/Button';
import styles from './D8Section.module.css';
import { useGoogleForm } from '../../hooks/useGoogleForm';

export default function D8Section() {
  const { email, setEmail, status, handleSubmit, resetForm } = useGoogleForm();

  return (
    <section className={styles.section} id="discover">
      <span className={styles.eyebrow}>COMING IN APRIL 2026</span>
      <h2 className={styles.title}>Ready to be part of</h2>

      <div className={styles.d8ImageWrapper}>
        <Image
          src="/kv/D8 only.png"
          alt="D8 Halal Economy"
          width={800}
          height={600}
          className={styles.d8Image}
          priority={false}
        />
      </div>

      {status === 'success' ? (
        <div className={styles.successContainer}>
          <p className={styles.successMessage}>Thank you! You've been subscribed.</p>
          <Button onClick={resetForm} className={styles.button} icon={CheckCircle}>
            Add another email
          </Button>
        </div>
      ) : (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input 
              type="email" 
              placeholder="YOUR EMAIL HERE" 
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'submitting'}
            />
          </div>
          <Button 
            icon={Send} 
            className={styles.button} 
            type="submit"
          >
            {status === 'submitting' ? 'Sending...' : 'Mark Your Spaces'}
          </Button>
        </form>
      )}

      <div className={styles.rotatingGraphic}>
        <Image
          src="/asset/Asset 5.png"
          alt="Decorative Circle"
          width={1000}
          height={1000}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </section>
  );
}
