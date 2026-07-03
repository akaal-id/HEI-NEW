import { EXHIBITORS } from '@/app/data/exhibitors';
import { BUYERS } from '@/app/data/buyers';

function uniqueCountryCount(items: { country: string }[]): number {
  const countries = new Set<string>();
  for (const item of items) {
    const country = item.country.trim();
    if (country) countries.add(country);
  }
  return countries.size;
}

export function getDelegateMetrics() {
  return {
    exhibitorCount: EXHIBITORS.length,
    exhibitorCountryCount: uniqueCountryCount(EXHIBITORS),
    buyerCount: BUYERS.length,
    buyerCountryCount: uniqueCountryCount(BUYERS),
  };
}
