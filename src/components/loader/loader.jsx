import styles from './loader.module.css';

export const Loader = () => (
  <div className={styles.overlay}>
    <div className={styles.loader} />
  </div>
);
