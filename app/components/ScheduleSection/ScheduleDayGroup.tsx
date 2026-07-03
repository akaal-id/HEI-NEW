'use client';

import { ChevronDown } from 'lucide-react';
import type { DayGroup } from './scheduleUtils';
import ScheduleCard from './ScheduleCard';
import styles from './ScheduleSection.module.css';

interface ScheduleDayGroupProps {
  group: DayGroup;
  dayIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
  showTrack: boolean;
}

export default function ScheduleDayGroup({
  group,
  dayIndex,
  isExpanded,
  onToggle,
  showTrack,
}: ScheduleDayGroupProps) {
  const sessionCount = group.items.length;
  const panelId = `schedule-day-${group.date.replace(/\s/g, '-')}`;

  return (
    <div
      className={`${styles.dayAccordion} ${isExpanded ? styles.dayAccordionExpanded : ''}`}
    >
      <button
        type="button"
        className={styles.dayTrigger}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={panelId}
      >
        <span className={styles.dayIndex} aria-hidden="true">
          {String(dayIndex + 1).padStart(2, '0')}
        </span>

        <span className={styles.dayTriggerText}>
          <span className={styles.dayName}>{group.day}</span>
          <span className={styles.dayDate}>{group.date}</span>
        </span>

        <span className={styles.dayTriggerMeta}>
          <span className={styles.sessionCount}>
            {sessionCount} {sessionCount === 1 ? 'session' : 'sessions'}
          </span>
          <ChevronDown className={styles.dayChevron} aria-hidden="true" />
        </span>
      </button>

      <div
        id={panelId}
        className={styles.dayPanel}
        hidden={!isExpanded}
      >
        <div className={styles.dayPanelInner}>
          <div className={styles.timeline}>
            {group.items.map((item, index) => (
              <ScheduleCard
                key={item.id}
                item={item}
                showTrack={showTrack}
                isLast={index === group.items.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
