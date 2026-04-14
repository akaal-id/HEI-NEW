import styles from './SituationSection.module.css';

const COPY_ID =
  'Terkait pelaksanaan D-8 Halal Expo Indonesia, saat ini kami masih melakukan koordinasi intensif dengan Kementerian Luar Negeri guna menyesuaikan dengan rangkaian agenda KTT D-8. Oleh karena itu, penetapan jadwal terbaru akan segera kami sampaikan setelah mendapatkan arahan lebih lanjut.';

const COPY_EN =
  "The D-8 Halal Expo Indonesia has been rescheduled as we are currently awaiting further guidance and synchronization with the Ministry of Foreign Affairs, given the event's integration with the D-8 Summit agenda. We will announce the finalized schedule as soon as the coordination process is complete.";

export default function SituationSection() {
  return (
    <section className={styles.section} id="situation" aria-labelledby="situation-heading">
      <div className={styles.inner}>
        
        <div className={styles.grid}>
          <div className={styles.column}>
            <h1 id="situation-heading" className={styles.title}>
               Kami <em>memohon maaf</em> atas ketidaknyamanan yang ditimbulkan.
            </h1>
            <p lang="id" className={styles.text}>
              {COPY_ID}
            </p>
          </div>
          <div className={styles.divider} role="presentation" />
          <div className={styles.column}>
            <h1 id="situation-heading" className={styles.title}>
                We <em>sincerely apologize</em> for any inconvenience.
            </h1>
            <p lang="en" className={styles.text}>
              {COPY_EN}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
