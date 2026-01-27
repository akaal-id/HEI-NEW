'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const previousPathnameRef = useRef<string | null>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const minDisplayTime = 800; // 800ms minimum

  // Function to clear all timeouts
  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
  };

  // Function to hide loading screen
  const hideLoading = () => {
    setIsLoading(false);
    const fadeTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 300);
    timeoutRefs.current.push(fadeTimeout);
  };

  // Handle initial page load and page reload
  useEffect(() => {
    const startTime = Date.now();

    // Hide loading screen once page is fully loaded
    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsed);
      
      const hideTimeout = setTimeout(() => {
        hideLoading();
      }, remainingTime);
      timeoutRefs.current.push(hideTimeout);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback: ensure minimum display time
      const fallbackTimeout = setTimeout(handleLoad, minDisplayTime);
      timeoutRefs.current.push(fallbackTimeout);
    }

    // Also listen for beforeunload to show loading on reload
    const handleBeforeUnload = () => {
      setIsVisible(true);
      setIsLoading(true);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearAllTimeouts();
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Handle route changes (client-side navigation)
  useEffect(() => {
    // Skip on initial mount
    if (previousPathnameRef.current === null) {
      previousPathnameRef.current = pathname;
      return;
    }

    // Only show loading if pathname actually changed
    if (previousPathnameRef.current !== pathname) {
      // Clear any existing timeouts
      clearAllTimeouts();

      // Show loading screen immediately
      setIsVisible(true);
      setIsLoading(true);
      previousPathnameRef.current = pathname;

      const startTime = Date.now();

      // Function to check if page is ready and hide loading
      const checkAndHide = () => {
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsed);
        
        const hideTimeout = setTimeout(() => {
          hideLoading();
        }, remainingTime);
        timeoutRefs.current.push(hideTimeout);
      };

      // Check if document is already ready
      if (document.readyState === 'complete') {
        // Small delay to ensure Next.js has started rendering
        const delayTimeout = setTimeout(() => {
          checkAndHide();
        }, 150);
        timeoutRefs.current.push(delayTimeout);
      } else {
        // Wait for page to be ready
        const readyCheck = setInterval(() => {
          if (document.readyState === 'complete') {
            clearInterval(readyCheck);
            checkAndHide();
          }
        }, 50);
        timeoutRefs.current.push(setTimeout(() => clearInterval(readyCheck), 5000));

        // Fallback: hide after maximum time
        const fallbackTimeout = setTimeout(() => {
          clearInterval(readyCheck);
          checkAndHide();
        }, minDisplayTime + 500);
        timeoutRefs.current.push(fallbackTimeout);
      }
    }

    return () => {
      clearAllTimeouts();
    };
  }, [pathname]);

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
