import { useEffect, useState } from 'react';

import styles from './toastMessage.module.css';

export const ToastMessage = ({ text }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsVisible(false), 5000);
  }, [isVisible]);

  return (
    isVisible && (
      <div className={styles.toastMessage}>
        <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z'
            fill='#F42C4F'
            stroke='#F42C4F'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path d='M16 10V17' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
          <path
            d='M16 22.75C16.6904 22.75 17.25 22.1904 17.25 21.5C17.25 20.8096 16.6904 20.25 16 20.25C15.3096 20.25 14.75 20.8096 14.75 21.5C14.75 22.1904 15.3096 22.75 16 22.75Z'
            fill='white'
          />
        </svg>

        <p className={styles.textMessage}>{text}</p>
        <button type='button' className={styles.buttonClose} onClick={() => setIsVisible(false)}>
          <span className={styles.closeIcon} />
        </button>
      </div>
    )
  );
};
