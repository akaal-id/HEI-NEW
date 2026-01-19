'use client';

import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import styles from './Countdown.module.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: April 14th, 2026
    const targetDate = new Date('2026-04-14T00:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.countdownContainer}>
      <div className={styles.ctaText}>
        <p className={styles.ctaLine}>
          <span className={styles.ctaTextDark}>Get ready to join </span>
          <span className={styles.ctaTextBright}>the largest B2B</span>
        </p>
        <p className={styles.ctaLine}>
          <span className={styles.ctaTextBright}>Halal Exhibition </span>
          <span className={styles.ctaTextDark}>in the country</span>
        </p>
      </div>

      <div className={styles.countdown}>
        <div className={styles.timeUnit}>
          <div className={styles.timeValue}>{timeLeft.days.toString().padStart(3, '0')}</div>
          <div className={styles.timeLabel}>Days</div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.timeUnit}>
          <div className={styles.timeValue}>{timeLeft.hours.toString().padStart(2, '0')}</div>
          <div className={styles.timeLabel}>Hours</div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.timeUnit}>
          <div className={styles.timeValue}>{timeLeft.minutes.toString().padStart(2, '0')}</div>
          <div className={styles.timeLabel}>Minutes</div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.timeUnit}>
          <div className={styles.timeValue}>{timeLeft.seconds.toString().padStart(2, '0')}</div>
          <div className={styles.timeLabel}>Second</div>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button href="#register" variant="primary">
          Register as Exhibitor
        </Button>
      </div>
    </div>
  );
}
