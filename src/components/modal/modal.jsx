import styles from './modal.module.css';

export const Modal = ({ text, children }) => {
  const test = '';

  return (
    <div className={styles.overlay}>
      <h1 className={styles.title}>Cleverland</h1>
      {children}
    </div>
  );
};
