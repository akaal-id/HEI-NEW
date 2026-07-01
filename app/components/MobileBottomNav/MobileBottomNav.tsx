'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, CalendarDays, ClipboardPen, Home } from 'lucide-react';
import styles from './MobileBottomNav.module.css';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isGuide = pathname === '/guide' || Boolean(pathname?.startsWith('/guide/'));
  const isRegister =
    pathname === '/register' || Boolean(pathname?.startsWith('/register/'));

  return (
    <nav className={styles.nav} aria-label="Mobile navigation">
      <Link
        href="/"
        className={`${styles.item} ${isHome ? styles.itemActive : ''}`}
        aria-current={isHome ? 'page' : undefined}
      >
        <span className={styles.iconWrap} aria-hidden="true">
          <Home className={styles.icon} />
        </span>
        <span className={styles.label}>Home</span>
      </Link>

      <Link
        href="/guide"
        className={`${styles.item} ${isGuide ? styles.itemActive : ''}`}
        aria-current={isGuide ? 'page' : undefined}
      >
        <span className={styles.iconWrap} aria-hidden="true">
          <BookOpen className={styles.icon} />
        </span>
        <span className={styles.label}>Guide</span>
      </Link>

      <button
        type="button"
        className={`${styles.item} ${styles.itemDisabled}`}
        disabled
        aria-disabled="true"
        aria-label="Schedule (coming soon)"
      >
        <span className={styles.iconWrap} aria-hidden="true">
          <CalendarDays className={styles.icon} />
        </span>
        <span className={styles.label}>Schedule</span>
      </button>

      <Link
        href="/register"
        className={`${styles.item} ${isRegister ? styles.itemActive : ''}`}
        aria-current={isRegister ? 'page' : undefined}
      >
        <span className={styles.iconWrap} aria-hidden="true">
          <ClipboardPen className={styles.icon} />
        </span>
        <span className={styles.label}>Register</span>
      </Link>
    </nav>
  );
}
