'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';
import Button from '../Button/Button';
import ContactModal from '../ContactModal/ContactModal';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'about' | 'programs' | 'register' | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<'about' | 'programs' | 'register' | null>(null);
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(`.${styles.menuItemWithDropdown}`) &&
        !target.closest(`.${styles.mobileMenuItemWithDropdown}`) &&
        !target.closest(`.${styles.registerDropdownWrapper}`)
      ) {
        setOpenDropdown(null);
        setOpenMobileDropdown(null);
      }
    };

    if (openDropdown || openMobileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [openDropdown, openMobileDropdown]);

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

  const toggleDropdown = (menu: 'about' | 'programs' | 'register') => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleMobileDropdown = (menu: 'about' | 'programs' | 'register') => {
    setOpenMobileDropdown(openMobileDropdown === menu ? null : menu);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
    setOpenMobileDropdown(null);
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
            className={`${styles.menuItem} ${pathname === '/' ? styles.menuItemActive : ''}`}
            textClassName={styles.menuItemText}
            icon={undefined}
          >
            Home
          </Button>

          <div className={styles.menuItemWithDropdown}>
            <Button
              href="/about"
              variant="secondary"
              className={`${styles.menuItem} ${pathname === '/about' ? styles.menuItemActive : ''} ${openDropdown === 'about' ? styles.menuItemDropdownOpen : ''}`}
              textClassName={styles.menuItemText}
              iconClassName={styles.menuItemIcon}
              icon={ChevronDown}
              onClick={(e?: React.MouseEvent) => {
                e?.preventDefault();
                toggleDropdown('about');
              }}
            >
              About Us
            </Button>
            {openDropdown === 'about' && (
              <div className={styles.dropdown}>
                <Link href="/about/d8-organization" className={styles.dropdownItem} onClick={closeDropdowns}>
                  About D-8 Summit
                </Link>
                <Link href="/about/d8-expo" className={styles.dropdownItem} onClick={closeDropdowns}>
                  About D-8 HEI 2026
                </Link>
                <Link href="/about/organizer" className={styles.dropdownItem} onClick={closeDropdowns}>
                  About Organizer
                </Link>
              </div>
            )}
          </div>

          <div className={styles.menuItemWithDropdown}>
            <Button
              href="/programs"
              variant="secondary"
              className={`${styles.menuItem} ${pathname === '/programs' || pathname?.startsWith('/programs/') ? styles.menuItemActive : ''} ${openDropdown === 'programs' ? styles.menuItemDropdownOpen : ''}`}
              textClassName={styles.menuItemText}
              iconClassName={styles.menuItemIcon}
              icon={ChevronDown}
              onClick={(e?: React.MouseEvent) => {
                e?.preventDefault();
                toggleDropdown('programs');
              }}
            >
              Our Programs
            </Button>
            {openDropdown === 'programs' && (
              <div className={styles.dropdown}>
                <Link href="/programs/exhibition" className={styles.dropdownItem} onClick={closeDropdowns}>
                  Exhibition
                </Link>
                <Link href="/programs/business-matching" className={styles.dropdownItem} onClick={closeDropdowns}>
                  Business Matching
                </Link>
                <Link href="/programs/investment" className={styles.dropdownItem} onClick={closeDropdowns}>
                  Investment Match Making
                </Link>
                <Link href="/programs/youth-event" className={styles.dropdownItem} onClick={closeDropdowns}>
                  D-8 HEI Youth
                </Link>
                <Link href="/programs/hei-talk" className={styles.dropdownItem} onClick={closeDropdowns}>
                  D-8 HEI Talk
                </Link>
                <Link href="/programs/culture-festival" className={styles.dropdownItem} onClick={closeDropdowns}>
                  D-8 HEI Culture Festival
                </Link>
              </div>
            )}
          </div>

          <Button
            href="/partners"
            variant="tertiary"
            className={`${styles.menuItem} ${pathname === '/partners' ? styles.menuItemActive : ''}`}
            textClassName={styles.menuItemText}
            icon={undefined}
          >
            Our Partner
          </Button>

          <Button
            href="/articles"
            variant="tertiary"
            className={`${styles.menuItem} ${pathname === '/articles' || pathname?.startsWith('/articles/') ? styles.menuItemActive : ''}`}
            textClassName={styles.menuItemText}
            icon={undefined}
          >
            Article & Media
          </Button>

          <div className={styles.registerDropdownWrapper}>
            <Button
              variant="primary"
              className={`${styles.menuItem} ${styles.registerButton} ${openDropdown === 'register' ? styles.menuItemDropdownOpen : ''}`}
              textClassName={`${styles.menuItemText} ${styles.registerButtonText}`}
              iconClassName={styles.registerButtonIcon}
              icon={ChevronDown}
              onClick={(e?: React.MouseEvent) => {
                e?.preventDefault();
                toggleDropdown('register');
              }}
            >
              Register Now
            </Button>
            {openDropdown === 'register' && (
              <div className={styles.registerDropdown}>
                <Link href="/register/exhibitor" className={styles.registerDropdownItem} onClick={closeDropdowns}>
                  Register as Exhibitor
                </Link>
                <Link href="/register/buyer" className={styles.registerDropdownItem} onClick={closeDropdowns}>
                  Register as Buyer
                </Link>
                <Link href="/register/visitor" className={styles.registerDropdownItem} onClick={closeDropdowns}>
                  Register as Visitor
                </Link>
              </div>
            )}
          </div>
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
            className={`${styles.mobileMenuItem} ${pathname === '/' ? styles.mobileMenuItemActive : ''}`}
            textClassName={styles.mobileMenuItemText}
            icon={undefined}
            onClick={closeMobileMenu}
          >
            Home
          </Button>

          <div className={styles.mobileMenuItemWithDropdown}>
            <Button
              href="/about"
              variant="secondary"
              className={`${styles.mobileMenuItem} ${pathname === '/about' ? styles.mobileMenuItemActive : ''} ${openMobileDropdown === 'about' ? styles.mobileMenuItemDropdownOpen : ''}`}
              textClassName={styles.mobileMenuItemText}
              iconClassName={styles.mobileMenuItemIcon}
              icon={ChevronDown}
              onClick={(e?: React.MouseEvent) => {
                e?.preventDefault();
                toggleMobileDropdown('about');
              }}
            >
              About Us
            </Button>
            <div className={`${styles.mobileSubmenu} ${openMobileDropdown === 'about' ? styles.mobileSubmenuOpen : ''}`}>
              <Link href="/about/d8-organization" className={styles.mobileSubmenuItem} onClick={closeMobileMenu}>
                About D-8 Summit
              </Link>
              <Link href="/about/d8-expo" className={styles.mobileSubmenuItem} onClick={closeMobileMenu}>
                About D8 HEI 2026
              </Link>
              <Link href="/about/organizer" className={styles.mobileSubmenuItem} onClick={closeMobileMenu}>
                About Organizer
              </Link>
            </div>
          </div>

          <div className={styles.mobileMenuItemWithDropdown}>
            <Button
              href="/programs"
              variant="secondary"
              className={`${styles.mobileMenuItem} ${pathname === '/programs' || pathname?.startsWith('/programs/') ? styles.mobileMenuItemActive : ''} ${openMobileDropdown === 'programs' ? styles.mobileMenuItemDropdownOpen : ''}`}
              textClassName={styles.mobileMenuItemText}
              iconClassName={styles.mobileMenuItemIcon}
              icon={ChevronDown}
              onClick={(e?: React.MouseEvent) => {
                e?.preventDefault();
                toggleMobileDropdown('programs');
              }}
            >
              D8 HEI Programs
            </Button>
            <div className={`${styles.mobileSubmenu} ${openMobileDropdown === 'programs' ? styles.mobileSubmenuOpen : ''}`}>
              <Link href="/programs/exhibition" className={styles.mobileSubmenuItem} onClick={closeMobileMenu}>
                Exhibition
              </Link>
              <Link href="/programs/business-matching" className={styles.mobileSubmenuItem} onClick={closeMobileMenu}>
                Business Matching
              </Link>
              <Link href="/programs/investment" className={styles.mobileSubmenuItem} onClick={closeMobileMenu}>
                Investment Match Making
              </Link>
              <Link href="/programs/youth-event" className={styles.mobileSubmenuItem} onClick={closeMobileMenu}>
                D-8 HEI Youth
              </Link>
              <Link href="/programs/hei-talk" className={styles.mobileSubmenuItem} onClick={closeMobileMenu}>
                D-8 HEI Talk
              </Link>
              <Link href="/programs/culture-festival" className={styles.mobileSubmenuItem} onClick={closeMobileMenu}>
                D-8 HEI Culture Festival
              </Link>
            </div>
          </div>

          <Button
            href="/partners"
            variant="tertiary"
            className={`${styles.mobileMenuItem} ${pathname === '/partners' ? styles.mobileMenuItemActive : ''}`}
            textClassName={styles.mobileMenuItemText}
            icon={undefined}
            onClick={closeMobileMenu}
          >
            Our Partner
          </Button>

          <Button
            href="/articles"
            variant="tertiary"
            className={`${styles.mobileMenuItem} ${pathname === '/articles' || pathname?.startsWith('/articles/') ? styles.mobileMenuItemActive : ''}`}
            textClassName={styles.mobileMenuItemText}
            icon={undefined}
            onClick={closeMobileMenu}
          >
            Article & Media
          </Button>

          <div className={styles.mobileMenuItemWithDropdown}>
            <Button
              variant="primary"
              className={`${styles.mobileMenuItem} ${styles.mobileRegisterButton} ${openMobileDropdown === 'register' ? styles.mobileMenuItemDropdownOpen : ''}`}
              textClassName={`${styles.mobileMenuItemText} ${styles.mobileRegisterButtonText}`}
              iconClassName={styles.primaryButtonIcon}
              icon={ChevronDown}
              onClick={(e?: React.MouseEvent) => {
                e?.preventDefault();
                toggleMobileDropdown('register');
              }}
            >
              Register Now
            </Button>
            <div className={`${styles.mobileSubmenu} ${openMobileDropdown === 'register' ? styles.mobileSubmenuOpen : ''}`}>
              <Link href="/register/exhibitor" className={styles.mobileSubmenuItem} onClick={closeMobileMenu}>
                Register as Exhibitor
              </Link>
              <Link href="/register/buyer" className={styles.mobileSubmenuItem} onClick={closeMobileMenu}>
                Register as Buyer
              </Link>
              <Link href="/register/visitor" className={styles.mobileSubmenuItem} onClick={closeMobileMenu}>
                Register as Visitor
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </nav>
  );
}

