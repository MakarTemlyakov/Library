import { Button } from '../button';

import styles from './message.module.css';

export const Message = ({ text, title, Component }) => {
  const test = '';

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.group}>
        <p className={styles.text}>{text}</p>
      </div>
      <div className={styles.componentWrapper}>{Component}</div>
    </div>
  );
};
