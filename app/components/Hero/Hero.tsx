import Image from 'next/image';
import Button from '../Button/Button';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge} aria-label="Event badge">HEI2026</span>
          <time className={styles.date} dateTime="2026-04">COMING IN APRIL 2026</time>
          <h1 className={styles.title}>
            The 6th<br/>Halal Expo<br/>Indonesia
          </h1>
          <p className={styles.subtitle}>
            Strengthening D-8 Halal Economy Through International Collaboration
          </p>
          <Button className={styles.button} href="#discover">Discover more</Button>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/kv/kv_raw.png"
            alt="Halal Expo Indonesia 2026"
            width={800}
            height={1000}
            className={styles.image}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

