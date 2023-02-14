import styles from './statusbook.module.css';

export const StatusBook = () => (
  <form className={styles.statusInfo}>
    <h6 className={styles.subtitle}>Статус:</h6>
    <label htmlFor='booking'>
      <input id='booking' type='checkbox' />
      <span>Забронирована</span>
    </label>
    <label htmlFor='getting'>
      <input id='getting' type='checkbox' />
      <span>Выдана</span>
    </label>
  </form>
);
