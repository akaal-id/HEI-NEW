import type { ScheduleItem } from '../../data/schedule';

export interface DayGroup {
  day: string;
  date: string;
  items: ScheduleItem[];
}

function parseTimeSortKey(item: ScheduleItem): number {
  const dateMs = Date.parse(item.date) || 0;
  const startTimeRaw = item.time.split(/[–-]/)[0].trim();
  const [h, m] = startTimeRaw.split('.').map((n) => parseInt(n, 10) || 0);
  return dateMs + (h * 60 + m) * 60 * 1000;
}

/** Group schedule items by event day, sorted chronologically with items ordered by start time. */
export function groupByDay(items: ScheduleItem[]): DayGroup[] {
  const map = new Map<string, DayGroup>();

  for (const item of items) {
    if (!map.has(item.date)) {
      map.set(item.date, { day: item.day, date: item.date, items: [] });
    }
    map.get(item.date)!.items.push(item);
  }

  const groups = Array.from(map.values()).sort(
    (a, b) => (Date.parse(a.date) || 0) - (Date.parse(b.date) || 0)
  );

  for (const group of groups) {
    group.items.sort((a, b) => parseTimeSortKey(a) - parseTimeSortKey(b));
  }

  return groups;
}
