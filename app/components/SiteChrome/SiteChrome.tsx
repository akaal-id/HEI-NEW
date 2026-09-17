'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import MobileBottomNav from '../MobileBottomNav/MobileBottomNav';
import ContactButton from '../ContactButton/ContactButton';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import type { SiteSettings } from '../../lib/siteSettings';

interface SiteChromeProps {
  children: React.ReactNode;
  settings: SiteSettings;
}

/** Public-site chrome (navbar, footer, contact rail, etc.) — hidden on /admin, which has its own dashboard shell.
 * Elsewhere, each piece is toggled by the admin-editable settings from /admin/components. */
export default function SiteChrome({ children, settings }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin') ?? false;

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <LoadingScreen />
      {settings.navbarVisible && <Navbar navMenu={settings.navMenu} />}
      {children}
      {settings.footerVisible && <Footer />}
      {settings.navbarVisible && <MobileBottomNav />}
      <ScrollToTop />
      <ContactButton
        contactVisible={settings.sidebarContactVisible}
        guideVisible={settings.sidebarGuideVisible}
        scheduleVisible={settings.sidebarScheduleVisible}
      />
    </>
  );
}
