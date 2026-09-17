import { getSupabasePublicClient } from './supabase';
import { DEFAULT_NAV_MENU, type NavMenuItem } from './navMenu';

export interface SiteSettings {
  navbarVisible: boolean;
  navMenu: NavMenuItem[];
  sidebarContactVisible: boolean;
  sidebarGuideVisible: boolean;
  sidebarScheduleVisible: boolean;
  footerVisible: boolean;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  navbarVisible: true,
  navMenu: DEFAULT_NAV_MENU,
  sidebarContactVisible: true,
  sidebarGuideVisible: true,
  sidebarScheduleVisible: true,
  footerVisible: true,
};

interface SiteSettingsRow {
  id: string;
  navbar_visible: boolean;
  nav_menu: NavMenuItem[] | null;
  sidebar_contact_visible: boolean;
  sidebar_guide_visible: boolean;
  sidebar_schedule_visible: boolean;
  footer_visible: boolean;
}

export function rowToSiteSettings(row: SiteSettingsRow): SiteSettings {
  return {
    navbarVisible: row.navbar_visible,
    navMenu: row.nav_menu && row.nav_menu.length > 0 ? row.nav_menu : DEFAULT_NAV_MENU,
    sidebarContactVisible: row.sidebar_contact_visible,
    sidebarGuideVisible: row.sidebar_guide_visible,
    sidebarScheduleVisible: row.sidebar_schedule_visible,
    footerVisible: row.footer_visible,
  };
}

export function siteSettingsToRow(settings: SiteSettings) {
  return {
    navbar_visible: settings.navbarVisible,
    nav_menu: settings.navMenu,
    sidebar_contact_visible: settings.sidebarContactVisible,
    sidebar_guide_visible: settings.sidebarGuideVisible,
    sidebar_schedule_visible: settings.sidebarScheduleVisible,
    footer_visible: settings.footerVisible,
  };
}

/** Used by the root layout on every page load. Falls back to "everything visible" if Supabase isn't configured or unreachable. */
export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return DEFAULT_SITE_SETTINGS;

  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 'default')
    .maybeSingle();

  if (error || !data) {
    if (error) console.error('Error fetching site settings:', error);
    return DEFAULT_SITE_SETTINGS;
  }

  return rowToSiteSettings(data as SiteSettingsRow);
}
