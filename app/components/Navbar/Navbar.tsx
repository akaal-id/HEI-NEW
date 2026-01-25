'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Button from '../Button/Button';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Initialize scroll position
    lastScrollY.current = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);
      
      // Menu shows by default when scrolled, only hides when actively scrolling down
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Actively scrolling down past 50px - hide menu
        setIsScrollingDown(true);
      } else {
        // Scrolling up, at top, or no movement - show menu
        setIsScrollingDown(false);
      }
      
      lastScrollY.current = currentScrollY;
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
      <div className={styles.navbarContent}>
      <div className={`${styles.logoContainer} ${isScrolled ? styles.logoContainerScrolled : ''}`}>
        <Link href="/" className={styles.logoLink}>
          <Image
              src="/icon/D8 HEI Logo Long.svg"
              alt="D-8 Halal Expo Indonesia 2026"
              width={200}
              height={60}
            className={styles.logo}
            priority
          />
        </Link>
      </div>

        <div className={`${styles.menuContainer} ${isScrollingDown ? styles.menuHidden : ''}`}>
          <Button 
            href="#home" 
            variant="tertiary" 
            className={styles.menuItem}
            textClassName={styles.menuItemText}
            icon={undefined}
          >
            Home
          </Button>
          
          <Button 
            href="#about" 
            variant="secondary" 
            className={styles.menuItem}
            textClassName={styles.menuItemText}
            iconClassName={styles.menuItemIcon}
            icon={ChevronDown}
          >
            About Us
          </Button>
          
          <Button 
            href="#programs" 
            variant="secondary" 
            className={styles.menuItem}
            textClassName={styles.menuItemText}
            iconClassName={styles.menuItemIcon}
            icon={ChevronDown}
          >
            Our Programs
          </Button>
          
          <Button 
            href="#partner" 
            variant="tertiary" 
            className={styles.menuItem}
            textClassName={styles.menuItemText}
            icon={undefined}
          >
            Our Partner
          </Button>
          
          <Button 
            href="#article" 
            variant="tertiary" 
            className={styles.menuItem}
            textClassName={styles.menuItemText}
            icon={undefined}
          >
            Article & Media
          </Button>
          
          <Button 
            href="#register" 
            variant="primary" 
            className={`${styles.menuItem} ${styles.registerButton}`}
            textClassName={`${styles.menuItemText} ${styles.registerButtonText}`}
            iconClassName={styles.registerButtonIcon}
          >
            Register Now
          </Button>
        </div>
      </div>
    </nav>
  );
}

