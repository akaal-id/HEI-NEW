'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { EXHIBITORS } from '@/app/data/exhibitors';
import { BUYERS } from '@/app/data/buyers';
import type { ExhibitorZone } from '@/app/data/exhibitors';
import type { AttendanceStatus } from '@/app/data/buyers';
import DelegatesPanel from './DelegatesPanel';
import styles from './OurDelegates.module.css';

const EXHIBITOR_ZONES: ExhibitorZone[] = ['Indoor', 'Special Booth', 'Outdoor', 'Food Truck'];
const ATTENDANCE_STATUSES: AttendanceStatus[] = [
  'Confirmed',
  'Pending Confirmation',
  'Not Attending',
];

type MobileTab = 'exhibitors' | 'buyers';

export default function OurDelegatesFull() {
  const exhibitorSearchId = useId();
  const buyerSearchId = useId();
  const mobileTablistId = useId();

  const [mobileTab, setMobileTab] = useState<MobileTab>('exhibitors');
  const [isDesktop, setIsDesktop] = useState(false);
  const [exhibitorSearch, setExhibitorSearch] = useState('');
  const [buyerSearch, setBuyerSearch] = useState('');
  const [zoneFilter, setZoneFilter] = useState<ExhibitorZone | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<AttendanceStatus | 'all'>('all');

  const filteredExhibitors = useMemo(() => {
    const query = exhibitorSearch.trim().toLowerCase();
    return EXHIBITORS.filter((exhibitor) => {
      const matchesZone = zoneFilter === 'all' || exhibitor.zone === zoneFilter;
      const matchesSearch =
        !query || exhibitor.companyName.toLowerCase().includes(query);
      return matchesZone && matchesSearch;
    });
  }, [exhibitorSearch, zoneFilter]);

  const filteredBuyers = useMemo(() => {
    const query = buyerSearch.trim().toLowerCase();
    return BUYERS.filter((buyer) => {
      const matchesStatus =
        statusFilter === 'all' || buyer.attendanceStatus === statusFilter;
      const matchesSearch =
        !query ||
        buyer.name.toLowerCase().includes(query) ||
        buyer.companyName.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [buyerSearch, statusFilter]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handleChange = () => {
      setIsDesktop(mq.matches);
      if (mq.matches) setMobileTab('exhibitors');
    };
    handleChange();
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const handleMobileTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    tab: MobileTab
  ) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    setMobileTab(tab === 'exhibitors' ? 'buyers' : 'exhibitors');
  };

  const exhibitorPanel = (
    <div className={styles.columnPanel}>
      <div className={styles.columnHeader}>
        <h3 className={`${styles.columnTitle} ${styles.columnTitleActive}`}>
          Exhibitors
          <span className={styles.columnCount}>{EXHIBITORS.length}</span>
        </h3>
      </div>

      <div className={styles.filters}>
        <label className={styles.searchField} htmlFor={exhibitorSearchId}>
          <Search className={styles.searchIcon} aria-hidden="true" size={18} />
          <input
            id={exhibitorSearchId}
            type="search"
            className={styles.searchInput}
            placeholder="Search by company name…"
            value={exhibitorSearch}
            onChange={(e) => setExhibitorSearch(e.target.value)}
          />
        </label>
        <div className={styles.filterPills} role="group" aria-label="Filter by zone">
          <button
            type="button"
            className={`${styles.filterPill} ${zoneFilter === 'all' ? styles.filterPillActive : ''}`}
            onClick={() => setZoneFilter('all')}
            aria-pressed={zoneFilter === 'all'}
          >
            All zones
          </button>
          {EXHIBITOR_ZONES.map((zone) => (
            <button
              key={zone}
              type="button"
              className={`${styles.filterPill} ${zoneFilter === zone ? styles.filterPillActive : ''}`}
              onClick={() => setZoneFilter(zone)}
              aria-pressed={zoneFilter === zone}
            >
              {zone}
            </button>
          ))}
        </div>
      </div>

      <DelegatesPanel mode="exhibitors" exhibitors={filteredExhibitors} />
    </div>
  );

  const buyerPanel = (
    <div className={styles.columnPanel}>
      <div className={styles.columnHeader}>
        <h3 className={`${styles.columnTitle} ${styles.columnTitleActive}`}>
          Buyers
          <span className={styles.columnCount}>{BUYERS.length}</span>
        </h3>
      </div>

      <div className={styles.filters}>
        <label className={styles.searchField} htmlFor={buyerSearchId}>
          <Search className={styles.searchIcon} aria-hidden="true" size={18} />
          <input
            id={buyerSearchId}
            type="search"
            className={styles.searchInput}
            placeholder="Search by name or company…"
            value={buyerSearch}
            onChange={(e) => setBuyerSearch(e.target.value)}
          />
        </label>
        <div className={styles.filterPills} role="group" aria-label="Filter by attendance status">
          <button
            type="button"
            className={`${styles.filterPill} ${statusFilter === 'all' ? styles.filterPillActive : ''}`}
            onClick={() => setStatusFilter('all')}
            aria-pressed={statusFilter === 'all'}
          >
            All statuses
          </button>
          {ATTENDANCE_STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              className={`${styles.filterPill} ${statusFilter === status ? styles.filterPillActive : ''}`}
              onClick={() => setStatusFilter(status)}
              aria-pressed={statusFilter === status}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <DelegatesPanel mode="buyers" buyers={filteredBuyers} />
    </div>
  );

  return (
    <section
      className={styles.section}
      id="our-delegates"
      aria-labelledby="our-delegates-title"
    >
      <div className={`hei-container ${styles.container}`}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Our Delegates</span>
          <h2 id="our-delegates-title" className={styles.title}>
            Meet the Exhibitors &amp; Buyers
          </h2>
          <p className={styles.intro}>
            {EXHIBITORS.length} Exhibitors · {BUYERS.length} Buyers from multiple countries
          </p>
        </header>

        <div
          className={styles.mobileTabBar}
          role="tablist"
          id={mobileTablistId}
          aria-label="Delegate categories"
        >
          <button
            type="button"
            role="tab"
            id={`${mobileTablistId}-exhibitors`}
            aria-selected={mobileTab === 'exhibitors'}
            aria-controls={`${mobileTablistId}-exhibitors-panel`}
            className={`${styles.mobileTab} ${mobileTab === 'exhibitors' ? styles.mobileTabActive : ''}`}
            onClick={() => setMobileTab('exhibitors')}
            onKeyDown={(e) => handleMobileTabKeyDown(e, 'exhibitors')}
          >
            Exhibitors ({EXHIBITORS.length})
          </button>
          <button
            type="button"
            role="tab"
            id={`${mobileTablistId}-buyers`}
            aria-selected={mobileTab === 'buyers'}
            aria-controls={`${mobileTablistId}-buyers-panel`}
            className={`${styles.mobileTab} ${mobileTab === 'buyers' ? styles.mobileTabActive : ''}`}
            onClick={() => setMobileTab('buyers')}
            onKeyDown={(e) => handleMobileTabKeyDown(e, 'buyers')}
          >
            Buyers ({BUYERS.length})
          </button>
        </div>

        <div className={styles.columns}>
          <div
            className={`${styles.column} ${styles.columnExhibitors} ${mobileTab === 'exhibitors' ? styles.columnVisible : styles.columnHiddenMobile}`}
            role="tabpanel"
            id={`${mobileTablistId}-exhibitors-panel`}
            aria-labelledby={`${mobileTablistId}-exhibitors`}
            hidden={!isDesktop && mobileTab !== 'exhibitors'}
          >
            {exhibitorPanel}
          </div>
          <div
            className={`${styles.column} ${styles.columnBuyers} ${mobileTab === 'buyers' ? styles.columnVisible : styles.columnHiddenMobile}`}
            role="tabpanel"
            id={`${mobileTablistId}-buyers-panel`}
            aria-labelledby={`${mobileTablistId}-buyers`}
            hidden={!isDesktop && mobileTab !== 'buyers'}
          >
            {buyerPanel}
          </div>
        </div>
      </div>
    </section>
  );
}
