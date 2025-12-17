'use client';

import Image from 'next/image';
import { Send, CheckCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Button from '../Button/Button';
import styles from './D8Section.module.css';
import { useGoogleForm } from '../../hooks/useGoogleForm';

export default function D8Section() {
  const { email, setEmail, status, handleSubmit, resetForm } = useGoogleForm();
  
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import('animejs').then((animeModule) => {
              // @ts-ignore - animejs animate function signature
              const animate = animeModule.animate as any;
              const stagger = animeModule.stagger;

              const elements = [
                eyebrowRef.current,
                titleRef.current,
                imageRef.current,
                bodyRef.current,
                formRef.current,
              ].filter(Boolean);

              if (elements.length > 0) {
                animate(
                  elements,
                  {
                    opacity: [0, 1],
                    translateY: [20, 0],
                    delay: stagger(600),
                    duration: 1200,
                    easing: 'easeOutQuad'
                  }
                );
              }
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="discover">
      <span ref={eyebrowRef} className={styles.eyebrow}>Mark Your Horizon</span>
      <h2 ref={titleRef} className={styles.title}>
        Connect with the&nbsp;
        <span
          style={{
            background: 'var(--hei26-linearblue)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
          }}
        >
          Leaders of Tomorrow
        </span>
      </h2>

      <div ref={imageRef} className={styles.d8ImageWrapper}>
        <Image
          src="/kv/D8 only.png"
          alt="D8 Halal Economy"
          width={800}
          height={600}
          className={styles.d8Image}
          priority={false}
        />
      </div>

      <p ref={bodyRef} className={styles.body}>Summit</p>

      {status === 'success' ? (
        <div className={styles.successContainer}>
          <p className={styles.successMessage}>Thank you! You've been subscribed.</p>
          <Button onClick={resetForm} className={styles.button} icon={CheckCircle}>
            Add another email
          </Button>
        </div>
      ) : (
        <form ref={formRef} className={styles.formContainer} onSubmit={handleSubmit}>
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

      <Image
        src="/asset/Asset 6.png"
        alt="Decorative Asset"
        width={200}
        height={200}
        className={styles.floatingAsset1}
      />
      <Image
        src="/asset/Asset 7.png"
        alt="Decorative Asset"
        width={200}
        height={200}
        className={styles.floatingAsset2}
      />
    </section>
  );
}
