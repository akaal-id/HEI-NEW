'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHidden(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px 0px -720px 0px' }
    );

    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isHidden ? styles.hidden : ''}`}>
      <Link href="/" className={styles.logoLink}>
        <Image
          src="/D8-assets/logo_D8_hor.svg"
          alt="HEI 2026 Logo"
          width={64}
          height={64}
          className={styles.logo}
          priority
        />
      </Link>
    </nav>
  );
}

