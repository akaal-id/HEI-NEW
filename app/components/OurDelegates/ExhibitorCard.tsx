import type { Exhibitor } from '@/app/data/exhibitors';
import { getCountryFlag } from './countryFlag';
import styles from './OurDelegates.module.css';

interface ExhibitorCardProps {
  exhibitor: Exhibitor;
}

export default function ExhibitorCard({ exhibitor }: ExhibitorCardProps) {
  const { boothNumber, companyName, country } = exhibitor;
  const flag = country.trim() ? getCountryFlag(country) : '';

  return (
    <article className={styles.exhibitorCard}>
      <span className={styles.boothBadge}>Booth {boothNumber}</span>
      <h3 className={styles.exhibitorCompany}>{companyName}</h3>
      {country.trim() ? (
        <p className={styles.exhibitorCountry}>
          {flag ? <span aria-hidden="true">{flag}</span> : null}
          <span>{country}</span>
        </p>
      ) : null}
    </article>
  );
}
