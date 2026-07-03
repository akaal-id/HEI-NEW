import type { AttendanceStatus, Buyer } from '@/app/data/buyers';
import { getCountryFlag } from './countryFlag';
import styles from './OurDelegates.module.css';

interface BuyerCardProps {
  buyer: Buyer;
}

const STATUS_CLASS: Record<AttendanceStatus, string> = {
  Confirmed: styles.statusConfirmed,
  'Pending Confirmation': styles.statusPending,
  'Not Attending': styles.statusNotAttending,
};

export default function BuyerCard({ buyer }: BuyerCardProps) {
  const { name, country, companyName, attendanceStatus } = buyer;
  const flag = country.trim() ? getCountryFlag(country) : '';
  const statusClass = STATUS_CLASS[attendanceStatus];

  return (
    <article className={styles.buyerCard}>
      <div className={styles.buyerMain}>
        <h3 className={styles.buyerName}>{name}</h3>
        {companyName.trim() ? (
          <p className={styles.buyerCompany}>{companyName}</p>
        ) : null}
        {country.trim() ? (
          <p className={styles.buyerCountry}>
            {flag ? <span aria-hidden="true">{flag}</span> : null}
            <span>{country}</span>
          </p>
        ) : null}
      </div>
      <span className={`${styles.statusBadge} ${statusClass}`}>{attendanceStatus}</span>
    </article>
  );
}
