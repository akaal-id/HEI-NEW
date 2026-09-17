'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, GalleryHorizontal, LogOut, SlidersHorizontal } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabaseBrowserAuth';
import styles from './AdminShell.module.css';

const NAV_ITEMS = [
  { href: '/admin', label: 'Hero Carousel', icon: GalleryHorizontal },
  { href: '/admin/components', label: 'Components', icon: SlidersHorizontal },
];

interface AdminShellProps {
  email: string;
  children: React.ReactNode;
}

export default function AdminShell({ email, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <span className={styles.topbarTitle}>Admin Dashboard</span>

        <div className={styles.userMenu} ref={menuRef}>
          <button
            type="button"
            className={styles.userMenuTrigger}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
          >
            <span className={styles.userAvatar}>{email.charAt(0).toUpperCase()}</span>
            <span className={styles.userEmail}>{email}</span>
            <ChevronDown size={16} className={isMenuOpen ? styles.chevronOpen : ''} />
          </button>

          {isMenuOpen && (
            <div className={styles.userDropdown} role="menu">
              <div className={styles.userDropdownStatus}>
                <span className={styles.statusDot} aria-hidden />
                Signed in as
                <strong>{email}</strong>
              </div>
              <button type="button" className={styles.logoutButton} onClick={handleLogout}>
                <LogOut size={14} />
                Log out
              </button>
            </div>
          )}
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <Link href="/" className={styles.sidebarLogoLink}>
            <Image
              src="/icon/D8 HEI Logo Long.svg"
              alt="D-8 HEI"
              width={140}
              height={30}
              className={styles.sidebarLogo}
            />
          </Link>

          <nav className={styles.nav}>
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className={styles.main}>{children}</main>
      </div>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} D-8 Halal Expo Indonesia. All rights reserved.
      </footer>
    </div>
  );
}
