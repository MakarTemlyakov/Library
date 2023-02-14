import styles from './button.module.css';

export function Button({ children, color = 'primary' }) {
  return (
    <button className={`${styles.button} ${styles[color]}`} type='button'>
      {children}
    </button>
  );
}
