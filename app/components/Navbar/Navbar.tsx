'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';
import Button from '../Button/Button';
import ContactModal from '../ContactModal/ContactModal';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleContactModal = () => {
    setIsContactModalOpen(!isContactModalOpen);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isHidden ? styles.hidden : ''}`}>
      {/* Desktop Navbar */}
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
            href="/" 
            variant="tertiary" 
            className={styles.menuItem}
            textClassName={styles.menuItemText}
            icon={undefined}
          >
            Home
          </Button>
          
          <Button 
            href="/about" 
            variant="secondary" 
            className={styles.menuItem}
            textClassName={styles.menuItemText}
            iconClassName={styles.menuItemIcon}
            icon={ChevronDown}
          >
            About Us
          </Button>
          
          <Button 
            href="/programs" 
            variant="secondary" 
            className={styles.menuItem}
            textClassName={styles.menuItemText}
            iconClassName={styles.menuItemIcon}
            icon={ChevronDown}
          >
            Our Programs
          </Button>
          
          <Button 
            href="/partners" 
            variant="tertiary" 
            className={styles.menuItem}
            textClassName={styles.menuItemText}
            icon={undefined}
          >
            Our Partner
          </Button>
          
          <Button 
            href="/articles" 
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

      {/* Mobile Navbar */}
      <div className={styles.mobileNavbar}>
        <div className={`${styles.mobileNavbarContainer} ${isScrollingDown ? styles.mobileNavbarHidden : ''}`}>
          <Link href="/" className={styles.mobileLogoLink} onClick={closeMobileMenu}>
            <Image
              src="/icon/D8 HEI Logo Long.svg"
              alt="D-8 Halal Expo Indonesia 2026"
              width={150}
              height={45}
              className={styles.mobileLogo}
              priority
            />
          </Link>
          <div className={styles.mobileActionButtons}>
            <button 
              className={styles.mobileContactButton}
              onClick={toggleContactModal}
              aria-label="Contact us"
            >
              <Phone className={styles.mobileContactIcon} />
            </button>
            <button 
              className={styles.mobileMenuButton}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={styles.mobileMenuIcon} />
              ) : (
                <Menu className={styles.mobileMenuIcon} />
              )}
            </button>
          </div>
        </div>

        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <Button 
            href="/" 
            variant="tertiary" 
            className={styles.mobileMenuItem}
            textClassName={styles.mobileMenuItemText}
            icon={undefined}
            onClick={closeMobileMenu}
          >
            D8 HEI Overview
          </Button>
          
          <Button 
            href="/about" 
            variant="secondary" 
            className={styles.mobileMenuItem}
            textClassName={styles.mobileMenuItemText}
            iconClassName={styles.mobileMenuItemIcon}
            icon={ChevronDown}
            onClick={closeMobileMenu}
          >
            About Us
          </Button>
          
          <Button 
            href="/programs" 
            variant="secondary" 
            className={styles.mobileMenuItem}
            textClassName={styles.mobileMenuItemText}
            iconClassName={styles.mobileMenuItemIcon}
            icon={ChevronDown}
            onClick={closeMobileMenu}
          >
            D8 HEI Programs
          </Button>
          
          <Button 
            href="/partners" 
            variant="tertiary" 
            className={styles.mobileMenuItem}
            textClassName={styles.mobileMenuItemText}
            icon={undefined}
            onClick={closeMobileMenu}
          >
            Our Partner
          </Button>
          
          <Button 
            href="/articles" 
            variant="tertiary" 
            className={styles.mobileMenuItem}
            textClassName={styles.mobileMenuItemText}
            icon={undefined}
            onClick={closeMobileMenu}
          >
            Article & Media
          </Button>
          
          <Button 
            href="#register" 
            variant="primary" 
            className={`${styles.mobileMenuItem} ${styles.mobileRegisterButton}`}
            textClassName={`${styles.mobileMenuItemText} ${styles.mobileRegisterButtonText}`}
            iconClassName={styles.mobileRegisterButtonIcon}
            onClick={closeMobileMenu}
          >
            Register Now
          </Button>
        </div>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </nav>
  );
}

