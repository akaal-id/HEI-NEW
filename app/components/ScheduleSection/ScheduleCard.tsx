import type { ScheduleItem, ScheduleTrack } from '../../data/schedule';
import styles from './ScheduleSection.module.css';

const TRACK_LABELS: Record<ScheduleTrack, string> = {
  'hei-talk': 'Talk',
  'cultural-festival': 'Cultural Festival',
  'business-matching': 'Business Matching',
  // 'business-lounge': 'Business Lounge',
};

interface ScheduleCardProps {
  item: ScheduleItem;
  showTrack?: boolean;
  isLast?: boolean;
}

function shouldShowPerformersLine(item: ScheduleItem): boolean {
  if (item.performers.length > 0) return true;
  return item.track !== 'business-matching'; // && item.track !== 'business-lounge';
}

export default function ScheduleCard({
  item,
  showTrack = false,
  isLast = false,
}: ScheduleCardProps) {
  const showPerformers = shouldShowPerformersLine(item);
  const isConfirmed = item.status === 'confirmed';
  const hasPerformers = item.performers.length > 0;

  return (
    <article
      className={`${styles.card} ${styles[`cardTrack_${item.track}`]} ${isLast ? styles.cardLast : ''}`}
      aria-labelledby={`schedule-${item.id}-title`}
    >
      <div className={styles.cardRail} aria-hidden="true">
        <span className={styles.cardDot} />
        {!isLast && <span className={styles.cardLine} />}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardTop}>
          <time className={styles.cardTime}>{item.time}</time>
          <span
            className={`${styles.statusBadge} ${isConfirmed ? styles.statusConfirmed : styles.statusTbc}`}
          >
            {isConfirmed ? 'Confirmed' : 'To Be Confirmed'}
          </span>
        </div>

        <div className={styles.cardMain}>
          {showTrack && (
            <span className={`${styles.trackBadge} ${styles[`track_${item.track}`]}`}>
              {TRACK_LABELS[item.track]}
            </span>
          )}

          <h3 id={`schedule-${item.id}-title`} className={styles.cardTitle}>
            {item.agendaName}
          </h3>

          {showPerformers && (
            <div className={styles.cardPerformers}>
              {hasPerformers ? (
                <ul className={styles.performerList}>
                  {item.performers.map((performer) => (
                    <li key={performer}>{performer}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.performerTba}>TBA</p>
              )}
            </div>
          )}

          {item.host && (
            <p className={styles.cardHost}>Hosted by {item.host}</p>
          )}
        </div>
      </div>
    </article>
  );
}
