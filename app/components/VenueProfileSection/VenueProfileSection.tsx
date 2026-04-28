import { CalendarDays, Clock3, MapPin } from 'lucide-react';
import Button from '../Button/Button';
import styles from './VenueProfileSection.module.css';

const venueProfileContent = {
  eyebrow: 'THE VENUE',
  title: 'Senayan Indoor Tennis Complex, Jakarta',
  address:
    'Jl. Pintu Satu Senayan No.B, RT.1/RW.3, Gelora, Tanah Abang, Central Jakarta City, Special Capital Region of Jakarta 10270, Indonesia',
  date: '8 - 12 July 2026',
  time: '08:00 - 20:00 WIB',
  mapEmbedUrl: 'https://www.google.com/maps?q=Tennis+Indoor+Senayan+Jakarta&output=embed',
  directionsUrl: 'https://maps.google.com/?q=Tennis+Indoor+Senayan+Jakarta',
  learnMoreUrl: '/venue',
};

export default function VenueProfileSection() {
  return (
    <section className={styles.section} id="venue-profile" aria-labelledby="venue-profile-title">
      <div className={styles.backgroundLayer} aria-hidden="true"></div>
      <div className={styles.overlayLayer} aria-hidden="true"></div>

      <div className={styles.container}>
        <div className={styles.gridCard}>
          <div className={styles.mapWrap}>
            <iframe
              title="Tennis Indoor Senayan map"
              src={venueProfileContent.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.mapFrame}
            ></iframe>
          </div>

          <div className={styles.contentWrap}>
            <span className={styles.eyebrow}>{venueProfileContent.eyebrow}</span>
            <h2 id="venue-profile-title" className={styles.title}>
              {venueProfileContent.title}
            </h2>

            <p className={styles.address}>
              <MapPin className={styles.addressIcon} aria-hidden />
              <span>{venueProfileContent.address}</span>
            </p>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <CalendarDays className={styles.metaIcon} aria-hidden />
                <span>{venueProfileContent.date}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock3 className={styles.metaIcon} aria-hidden />
                <span>{venueProfileContent.time}</span>
              </div>
            </div>

            <div className={styles.buttonRow}>
              <Button href={venueProfileContent.directionsUrl} variant="primary">
                Get Direction
              </Button>
              <Button href={venueProfileContent.learnMoreUrl} variant="secondary">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
