'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, CalendarDays, ClipboardPen, Home } from 'lucide-react';
import styles from './MobileBottomNav.module.css';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isGuide = pathname === '/guide' || Boolean(pathname?.startsWith('/guide/'));
  const isSchedule =
    pathname === '/schedule' || Boolean(pathname?.startsWith('/schedule/'));
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

      <Link
        href="/schedule"
        className={`${styles.item} ${isSchedule ? styles.itemActive : ''}`}
        aria-current={isSchedule ? 'page' : undefined}
      >
        <span className={styles.iconWrap} aria-hidden="true">
          <CalendarDays className={styles.icon} />
        </span>
        <span className={styles.label}>Schedule</span>
      </Link>

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
