'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../../components/Button/Button';
import { DEFAULT_SITE_SETTINGS, type SiteSettings } from '../../../lib/siteSettings';
import type { NavMenuItem, NavMenuLink } from '../../../lib/navMenu';
import styles from './AdminComponentsForm.module.css';

type BooleanSiteSettingKey = {
  [K in keyof SiteSettings]: SiteSettings[K] extends boolean ? K : never;
}[keyof SiteSettings];

const SIDEBAR_CHILDREN: { key: BooleanSiteSettingKey; label: string }[] = [
  { key: 'sidebarContactVisible', label: 'Contact Us' },
  { key: 'sidebarGuideVisible', label: 'Guide' },
  { key: 'sidebarScheduleVisible', label: 'Schedule' },
];

function IndeterminateCheckbox({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean;
  indeterminate: boolean;
  onChange: (checked: boolean) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
    />
  );
}

function ToggleSwitch({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      className={`${styles.toggleSwitch} ${checked ? styles.toggleSwitchOn : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.toggleSwitchThumb} />
    </button>
  );
}

/**
 * One row for a nav menu link: a checkbox for "shown at all" and a switch for "clickable".
 * When `lockedOff` is set (the parent menu is unchecked or disabled), this row displays and
 * behaves as off too — it can't actually show/work on the site while its parent is off, so the
 * form shouldn't show it looking independently active. Its own stored value is untouched, so it
 * reappears as soon as the parent is turned back on.
 */
function NavItemRow({
  item,
  indent,
  lockedOff,
  onVisibleChange,
  onEnabledChange,
}: {
  item: NavMenuItem | NavMenuLink;
  indent: boolean;
  lockedOff?: boolean;
  onVisibleChange: (visible: boolean) => void;
  onEnabledChange: (enabled: boolean) => void;
}) {
  const displayVisible = lockedOff ? false : item.visible;
  const displayEnabled = lockedOff ? false : item.enabled;

  return (
    <div
      className={`${styles.navRow} ${indent ? styles.navRowChild : ''} ${lockedOff ? styles.navRowLocked : ''}`}
    >
      <label className={styles.navRowCheckbox}>
        <input
          type="checkbox"
          checked={displayVisible}
          disabled={lockedOff}
          onChange={(event) => onVisibleChange(event.target.checked)}
        />
        <span>{item.label}</span>
      </label>
      <div className={styles.navRowToggle}>
        <span className={styles.navRowToggleLabel}>
          {displayEnabled ? 'Enabled' : 'Disabled'}
        </span>
        <ToggleSwitch
          checked={displayEnabled}
          disabled={lockedOff}
          onChange={onEnabledChange}
          label={`${displayEnabled ? 'Disable' : 'Enable'} ${item.label}`}
        />
      </div>
    </div>
  );
}

export default function AdminComponentsForm() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/admin/site-settings');
      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await response.json();
      if (data.settings) setSettings(data.settings);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    try {
      const response = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Save failed');
      setSettings(data.settings);
      setSavedAt(Date.now());
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const setField = (key: BooleanSiteSettingKey, value: boolean) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const updateNavItem = (key: string, patch: Partial<Pick<NavMenuItem, 'visible' | 'enabled'>>) => {
    setSettings((current) => ({
      ...current,
      navMenu: current.navMenu.map((item) => (item.key === key ? { ...item, ...patch } : item)),
    }));
  };

  const updateNavChild = (
    parentKey: string,
    childKey: string,
    patch: Partial<Pick<NavMenuLink, 'visible' | 'enabled'>>
  ) => {
    setSettings((current) => ({
      ...current,
      navMenu: current.navMenu.map((item) =>
        item.key === parentKey && item.children
          ? {
              ...item,
              children: item.children.map((child) =>
                child.key === childKey ? { ...child, ...patch } : child
              ),
            }
          : item
      ),
    }));
  };

  const sidebarCheckedCount = SIDEBAR_CHILDREN.filter(({ key }) => settings[key]).length;
  const sidebarAllChecked = sidebarCheckedCount === SIDEBAR_CHILDREN.length;
  const sidebarIndeterminate = sidebarCheckedCount > 0 && !sidebarAllChecked;

  const setAllSidebar = (checked: boolean) => {
    setSettings((current) => ({
      ...current,
      sidebarContactVisible: checked,
      sidebarGuideVisible: checked,
      sidebarScheduleVisible: checked,
    }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Components</h1>
        <p className={styles.subtitle}>
          Choose which site-wide components are shown on the public pages.
        </p>
      </div>

      {isLoading ? (
        <p>Loading…</p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.group}>
            <label className={styles.toggleRow}>
              <input
                type="checkbox"
                checked={settings.navbarVisible}
                onChange={(event) => setField('navbarVisible', event.target.checked)}
              />
              <span>
                <strong>Navbar</strong>
                <span className={styles.toggleDescription}>
                  The top navigation bar and logo (and its mobile bottom nav equivalent). Control
                  each menu below: check the box to show a page in the menu, use the switch to
                  make it a working link or a &quot;Coming Soon&quot; preview.
                </span>
              </span>
            </label>

            <div className={styles.navMenuList}>
              {settings.navMenu.map((item) => (
                <div key={item.key}>
                  <NavItemRow
                    item={item}
                    indent={false}
                    onVisibleChange={(visible) => updateNavItem(item.key, { visible })}
                    onEnabledChange={(enabled) => updateNavItem(item.key, { enabled })}
                  />
                  {item.children && item.children.length > 0 && (
                    <div className={styles.navChildren}>
                      {item.children.map((child) => (
                        <NavItemRow
                          key={child.key}
                          item={child}
                          indent
                          lockedOff={!item.visible || !item.enabled}
                          onVisibleChange={(visible) =>
                            updateNavChild(item.key, child.key, { visible })
                          }
                          onEnabledChange={(enabled) =>
                            updateNavChild(item.key, child.key, { enabled })
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.group}>
            <label className={styles.toggleRow}>
              <IndeterminateCheckbox
                checked={sidebarAllChecked}
                indeterminate={sidebarIndeterminate}
                onChange={setAllSidebar}
              />
              <span>
                <strong>Side Bar</strong>
                <span className={styles.toggleDescription}>
                  The floating quick-actions rail on the right side of the page. Check all, or
                  pick individual items below.
                </span>
              </span>
            </label>

            <div className={styles.groupChildren}>
              {SIDEBAR_CHILDREN.map(({ key, label }) => (
                <label key={key} className={styles.toggleRowChild}>
                  <input
                    type="checkbox"
                    checked={settings[key]}
                    onChange={(event) => setField(key, event.target.checked)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <label className={styles.toggleRow}>
            <input
              type="checkbox"
              checked={settings.footerVisible}
              onChange={(event) => setField('footerVisible', event.target.checked)}
            />
            <span>
              <strong>Footer</strong>
              <span className={styles.toggleDescription}>
                The site footer shown at the bottom of every public page.
              </span>
            </span>
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.formActions}>
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? 'Saving…' : 'Save changes'}
            </Button>
            {savedAt && <span className={styles.savedHint}>Saved</span>}
          </div>
        </form>
      )}
    </div>
  );
}
