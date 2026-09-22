'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';
import Button from '../Button/Button';
import ContactModal from '../ContactModal/ContactModal';
import { DEFAULT_NAV_MENU, type NavMenuItem, type NavMenuLink } from '../../lib/navMenu';
import buttonStyles from '../Button/Button.module.css';
import styles from './Navbar.module.css';

interface NavbarProps {
  navMenu?: NavMenuItem[];
  registerButtonVisible?: boolean;
  registerButtonEnabled?: boolean;
}

function isPathActive(pathname: string | null, href: string): boolean {
  if (pathname === href) return true;
  if (href === '/') return false;
  return Boolean(pathname?.startsWith(`${href}/`));
}

export default function Navbar({
  navMenu = DEFAULT_NAV_MENU,
  registerButtonVisible = true,
  registerButtonEnabled = true,
}: NavbarProps) {
  const pathname = usePathname();
  const isArticlesPage = pathname === '/articles' || Boolean(pathname?.startsWith('/articles/'));
  const isCultureFestivalPage =
    pathname === '/programs/culture-festival' ||
    Boolean(pathname?.startsWith('/programs/culture-festival/'));
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
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
        !target.closest(`.${styles.mobileMenuItemWithDropdown}`)
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

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleMobileDropdown = (menu: string) => {
    setOpenMobileDropdown(openMobileDropdown === menu ? null : menu);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
    setOpenMobileDropdown(null);
  };

  const isHomePage = pathname === '/';
  const showScrolledLogo = isScrolled || isHomePage || isArticlesPage || isCultureFestivalPage;

  const visibleMenu = navMenu.filter((item) => item.visible);

  const renderDesktopChild = (child: NavMenuLink, parentEnabled: boolean) => {
    if (!child.visible) return null;

    if (!child.enabled || !parentEnabled) {
      return (
        <button
          key={child.key}
          type="button"
          className={`${styles.dropdownItem} ${styles.dropdownItemDisabled}`}
          disabled
        >
          {child.label}
        </button>
      );
    }

    return (
      <Link
        key={child.key}
        href={child.href}
        className={styles.dropdownItem}
        onClick={closeDropdowns}
      >
        {child.label}
      </Link>
    );
  };

  const renderDesktopItem = (item: NavMenuItem) => {
    const isActive = isPathActive(pathname, item.href);

    if (item.children && item.children.length > 0) {
      const isOpen = openDropdown === item.key;
      return (
        <div key={item.key} className={styles.menuItemWithDropdown}>
          <Button
            href={item.href}
            variant="secondary"
            className={`${styles.menuItem} ${isActive ? styles.menuItemActive : ''} ${isOpen ? styles.menuItemDropdownOpen : ''} ${!item.enabled ? styles.menuItemDisabled : ''}`}
            textClassName={styles.menuItemText}
            iconClassName={styles.menuItemIcon}
            icon={ChevronDown}
            onClick={(e?: React.MouseEvent) => {
              e?.preventDefault();
              toggleDropdown(item.key);
            }}
          >
            {item.label}
          </Button>
          {isOpen && (
            <div className={styles.dropdown}>
              {item.children.map((child) => renderDesktopChild(child, item.enabled))}
            </div>
          )}
        </div>
      );
    }

    if (!item.enabled) {
      return (
        <Button
          key={item.key}
          variant="tertiary"
          disabled
          className={`${styles.menuItem} ${buttonStyles.disabled}`}
          textClassName={styles.menuItemText}
          icon={undefined}
        >
          {item.label}
        </Button>
      );
    }

    return (
      <Button
        key={item.key}
        href={item.href}
        variant="tertiary"
        className={`${styles.menuItem} ${isActive ? styles.menuItemActive : ''}`}
        textClassName={styles.menuItemText}
        icon={undefined}
      >
        {item.label}
      </Button>
    );
  };

  const renderMobileChild = (child: NavMenuLink, parentEnabled: boolean) => {
    if (!child.visible) return null;

    if (!child.enabled || !parentEnabled) {
      return (
        <button
          key={child.key}
          type="button"
          className={`${styles.mobileSubmenuItem} ${styles.mobileSubmenuItemDisabled}`}
          disabled
        >
          {child.label}
        </button>
      );
    }

    return (
      <Link
        key={child.key}
        href={child.href}
        className={styles.mobileSubmenuItem}
        onClick={closeMobileMenu}
      >
        {child.label}
      </Link>
    );
  };

  const renderMobileItem = (item: NavMenuItem) => {
    const isActive = isPathActive(pathname, item.href);

    if (item.children && item.children.length > 0) {
      const isOpen = openMobileDropdown === item.key;
      return (
        <div key={item.key} className={styles.mobileMenuItemWithDropdown}>
          <Button
            href={item.href}
            variant="secondary"
            className={`${styles.mobileMenuItem} ${isActive ? styles.mobileMenuItemActive : ''} ${isOpen ? styles.mobileMenuItemDropdownOpen : ''} ${!item.enabled ? styles.menuItemDisabled : ''}`}
            textClassName={styles.mobileMenuItemText}
            iconClassName={styles.mobileMenuItemIcon}
            icon={ChevronDown}
            onClick={(e?: React.MouseEvent) => {
              e?.preventDefault();
              toggleMobileDropdown(item.key);
            }}
          >
            {item.label}
          </Button>
          <div className={`${styles.mobileSubmenu} ${isOpen ? styles.mobileSubmenuOpen : ''}`}>
            {item.children.map((child) => renderMobileChild(child, item.enabled))}
          </div>
        </div>
      );
    }

    if (!item.enabled) {
      return (
        <Button
          key={item.key}
          variant="tertiary"
          disabled
          className={`${styles.mobileMenuItem} ${buttonStyles.disabled}`}
          textClassName={styles.mobileMenuItemText}
          icon={undefined}
        >
          {item.label}
        </Button>
      );
    }

    return (
      <Button
        key={item.key}
        href={item.href}
        variant="tertiary"
        className={`${styles.mobileMenuItem} ${isActive ? styles.mobileMenuItemActive : ''}`}
        textClassName={styles.mobileMenuItemText}
        icon={undefined}
        onClick={closeMobileMenu}
      >
        {item.label}
      </Button>
    );
  };

  return (
    <nav className={`${styles.navbar} ${showScrolledLogo ? styles.scrolled : ''} ${isHidden ? styles.hidden : ''}`}>
      {/* Desktop Navbar */}
      <div className={styles.navbarContent}>
        <div className={`${styles.logoContainer} ${showScrolledLogo ? styles.logoContainerScrolled : ''}`}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/icon/D8 HEI Logo Long.svg"
              alt="D-8 Halal Expo Indonesia 2027"
              width={200}
              height={60}
              className={styles.logo}
              priority
            />
          </Link>
        </div>

        <div className={`${styles.menuContainer} ${isScrollingDown ? styles.menuHidden : ''}`}>
          {visibleMenu.map(renderDesktopItem)}

          {registerButtonVisible && (
            registerButtonEnabled ? (
              <Button
                href="/register/exhibitor"
                variant="primary"
                className={`${styles.menuItem} ${styles.registerButton}`}
                textClassName={`${styles.menuItemText} ${styles.registerButtonText}`}
                iconClassName={styles.registerButtonIcon}
              >
                Register Now
              </Button>
            ) : (
              <Button
                variant="primary"
                disabled
                className={`${styles.menuItem} ${styles.registerButton} ${buttonStyles.disabled}`}
                textClassName={`${styles.menuItemText} ${styles.registerButtonText}`}
                iconClassName={styles.registerButtonIcon}
              >
                Register Now
              </Button>
            )
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className={styles.mobileNavbar}>
        <div className={`${styles.mobileNavbarContainer} ${isScrollingDown ? styles.mobileNavbarHidden : ''}`}>
          <Link href="/" className={styles.mobileLogoLink} onClick={closeMobileMenu}>
            <Image
              src="/icon/D8 HEI Logo Long.svg"
              alt="D-8 Halal Expo Indonesia 2027"
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
          {visibleMenu.map(renderMobileItem)}

          {registerButtonVisible && (
            registerButtonEnabled ? (
              <Button
                href="/register/exhibitor"
                variant="primary"
                className={`${styles.mobileMenuItem} ${styles.mobileRegisterButton}`}
                textClassName={`${styles.mobileMenuItemText} ${styles.mobileRegisterButtonText}`}
                iconClassName={styles.mobileRegisterButtonIcon}
                onClick={closeMobileMenu}
              >
                Register Now
              </Button>
            ) : (
              <Button
                variant="primary"
                disabled
                className={`${styles.mobileMenuItem} ${styles.mobileRegisterButton} ${buttonStyles.disabled}`}
                textClassName={`${styles.mobileMenuItemText} ${styles.mobileRegisterButtonText}`}
                iconClassName={styles.mobileRegisterButtonIcon}
              >
                Register Now
              </Button>
            )
          )}
        </div>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </nav>
  );
}
