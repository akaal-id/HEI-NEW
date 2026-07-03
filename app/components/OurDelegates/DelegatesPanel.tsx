import { EXHIBITORS } from '@/app/data/exhibitors';
import { BUYERS } from '@/app/data/buyers';
import type { Exhibitor, ExhibitorZone } from '@/app/data/exhibitors';
import type { AttendanceStatus, Buyer } from '@/app/data/buyers';
import ExhibitorCard from './ExhibitorCard';
import BuyerCard from './BuyerCard';
import styles from './OurDelegates.module.css';

interface DelegatesPanelProps {
  mode: 'exhibitors' | 'buyers';
  limit?: number;
  exhibitors?: Exhibitor[];
  buyers?: Buyer[];
}

function exhibitorKey(exhibitor: Exhibitor, index: number) {
  return `${exhibitor.zone}-${exhibitor.boothNumber}-${exhibitor.companyName}-${index}`;
}

function buyerKey(buyer: Buyer, index: number) {
  return `${buyer.name}-${buyer.companyName}-${index}`;
}

export default function DelegatesPanel({
  mode,
  limit,
  exhibitors = EXHIBITORS,
  buyers = BUYERS,
}: DelegatesPanelProps) {
  const exhibitorItems = limit && limit > 0 ? exhibitors.slice(0, limit) : exhibitors;
  const buyerItems = limit && limit > 0 ? buyers.slice(0, limit) : buyers;

  if (mode === 'exhibitors') {
    if (exhibitorItems.length === 0) {
      return <p className={styles.emptyState}>No exhibitors match your filters.</p>;
    }

    return (
      <div className={styles.exhibitorGrid} role="list">
        {exhibitorItems.map((exhibitor, index) => (
          <div key={exhibitorKey(exhibitor, index)} role="listitem">
            <ExhibitorCard exhibitor={exhibitor} />
          </div>
        ))}
      </div>
    );
  }

  if (buyerItems.length === 0) {
    return <p className={styles.emptyState}>No buyers match your filters.</p>;
  }

  return (
    <div className={styles.buyerList} role="list">
      {buyerItems.map((buyer, index) => (
        <div key={buyerKey(buyer, index)} role="listitem">
          <BuyerCard buyer={buyer} />
        </div>
      ))}
    </div>
  );
}

export type { ExhibitorZone, AttendanceStatus };
