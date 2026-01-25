'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const startTimeRef = useRef<number>(Date.now());
  const minDisplayTime = 1000; // 3 seconds minimum

  useEffect(() => {
    const startTime = Date.now();
    startTimeRef.current = startTime;

    // Hide loading screen once page is fully loaded
    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
        // Add a small delay before hiding to ensure smooth transition
        setTimeout(() => {
          setIsVisible(false);
        }, 300);
      }, remainingTime);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      // Ensure minimum display time
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsed);
      const showTimeout = setTimeout(handleLoad, remainingTime);
      return () => clearTimeout(showTimeout);
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback: ensure minimum 3 seconds
      const timeout = setTimeout(handleLoad, minDisplayTime);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`${styles.loadingScreen} ${!isLoading ? styles.fadeOut : ''}`}>
      <div className={styles.contentContainer}>
        <div className={styles.circlesContainer}>
          {/* Layer 1 - Largest, slowest rotation */}
          <div className={styles.circleLayer1}>
            <Image
              src="/D8-assets/circle_D8.svg"
              alt="Loading Circle 1"
              width={400}
              height={400}
              className={styles.circle}
              priority
            />
          </div>
          
          {/* Layer 2 - Medium, medium rotation */}
          <div className={styles.circleLayer2}>
            <Image
              src="/D8-assets/circle_D8.svg"
              alt="Loading Circle 2"
              width={300}
              height={300}
              className={styles.circle}
              priority
            />
          </div>
          
          {/* Layer 3 - Smallest, fastest rotation */}
          <div className={styles.circleLayer3}>
            <Image
              src="/D8-assets/circle_D8.svg"
              alt="Loading Circle 3"
              width={200}
              height={200}
              className={styles.circle}
              priority
            />
          </div>
        </div>
        <div className={styles.loadingText}>
          connecting globally
          <span className={styles.dots}>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
