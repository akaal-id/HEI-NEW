'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  grandSchedule,
  heiTalkSchedule,
  culturalFestivalSchedule,
  businessMatchingSchedule,
  businessLoungeSchedule,
} from '../../data/schedule';
import { groupByDay } from './scheduleUtils';
import ScheduleDayGroup from './ScheduleDayGroup';
import styles from './ScheduleSection.module.css';

type ScheduleViewId =
  | 'grand'
  | 'hei-talk'
  | 'cultural-festival'
  | 'business-matching'
  | 'business-lounge';

interface ScheduleView {
  id: ScheduleViewId;
  label: string;
  items: typeof grandSchedule;
  showTrack: boolean;
}

const SCHEDULE_VIEWS: ScheduleView[] = [
  { id: 'grand', label: 'Grand Schedule', items: grandSchedule, showTrack: true },
  { id: 'hei-talk', label: 'HEI Talk', items: heiTalkSchedule, showTrack: false },
  {
    id: 'cultural-festival',
    label: 'Cultural Festival',
    items: culturalFestivalSchedule,
    showTrack: false,
  },
  {
    id: 'business-matching',
    label: 'Business Matching',
    items: businessMatchingSchedule,
    showTrack: false,
  },
  {
    id: 'business-lounge',
    label: 'Business Lounge',
    items: businessLoungeSchedule,
    showTrack: false,
  },
];

function getDefaultExpandedDate(dates: string[]): Set<string> {
  return dates.length > 0 ? new Set([dates[0]]) : new Set();
}

export default function ScheduleSection() {
  const [activeView, setActiveView] = useState<ScheduleViewId>('grand');
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  const currentView = SCHEDULE_VIEWS.find((view) => view.id === activeView) ?? SCHEDULE_VIEWS[0];

  const dayGroups = useMemo(
    () => groupByDay(currentView.items),
    [currentView.items]
  );

  const dayDates = useMemo(
    () => dayGroups.map((group) => group.date),
    [dayGroups]
  );

  useEffect(() => {
    setExpandedDates(getDefaultExpandedDate(dayDates));
  }, [activeView, dayDates]);

  const toggleDay = (date: string) => {
    setExpandedDates((prev) => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  };

  const expandAll = () => setExpandedDates(new Set(dayDates));
  const collapseAll = () => setExpandedDates(new Set());

  const expandedCount = expandedDates.size;
  const allExpanded = expandedCount === dayDates.length && dayDates.length > 0;

  return (
    <section className={styles.section} aria-labelledby="schedule-section-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Event Program</span>
          <h2 id="schedule-section-title" className={styles.title}>
            Full Event Schedule
          </h2>
          <p className={styles.description}>
            Browse sessions across HEI Talk, Cultural Festival, Business Matching, and the Business Lounge — or view everything in one timeline.
          </p>
        </header>

        <div
          className={styles.tabsScroll}
          role="tablist"
          aria-label="Schedule views"
        >
          <div className={styles.tabs}>
            {SCHEDULE_VIEWS.map((view) => {
              const isActive = view.id === activeView;
              return (
                <button
                  key={view.id}
                  type="button"
                  role="tab"
                  id={`schedule-tab-${view.id}`}
                  aria-selected={isActive}
                  aria-controls={`schedule-panel-${view.id}`}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                  onClick={() => setActiveView(view.id)}
                >
                  {view.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`schedule-panel-${activeView}`}
          aria-labelledby={`schedule-tab-${activeView}`}
          className={styles.panel}
        >
          {dayGroups.length > 1 && (
            <div className={styles.panelToolbar}>
              <p className={styles.panelHint}>
                Tap a day to expand or collapse its sessions.
              </p>
              <button
                type="button"
                className={styles.panelAction}
                onClick={allExpanded ? collapseAll : expandAll}
              >
                {allExpanded ? 'Collapse all' : 'Expand all'}
              </button>
            </div>
          )}

          <div className={styles.dayList}>
            {dayGroups.map((group, index) => (
              <ScheduleDayGroup
                key={group.date}
                group={group}
                dayIndex={index}
                isExpanded={expandedDates.has(group.date)}
                onToggle={() => toggleDay(group.date)}
                showTrack={currentView.showTrack}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
