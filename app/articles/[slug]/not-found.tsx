import Link from 'next/link';
import Button from '../../components/Button/Button';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Article Not Found</h1>
      <p className={styles.description}>
        The article you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Button href="/articles" variant="primary">
        Back to Articles
      </Button>
    </div>
  );
}
