import cn from 'classnames';

import styles from './ratebutton.module.css';

export const RateButton = ({ isActiveSearch, onClick, isChangedSortType }) => (
  <button
    className={isActiveSearch ? cn(styles.hidden) : cn(styles.rateButton)}
    type='button'
    data-test-id='ratiing-button'
    onClick={onClick}
  >
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={isChangedSortType ? styles.scaleIcon : null}
    >
      <g opacity='0.9'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2.5 4C2.5 3.72386 2.72386 3.5 3 3.5H11.4999C11.7761 3.5 11.9999 3.72386 11.9999 4C11.9999 4.27614 11.7761 4.5 11.4999 4.5H3C2.72386 4.5 2.5 4.27614 2.5 4ZM11.5 6.5C11.7761 6.5 12 6.72386 12 7V11.793L13.6464 10.1468C13.8417 9.95155 14.1583 9.95157 14.3535 10.1468C14.5488 10.3421 14.5487 10.6587 14.3535 10.854L11.8536 13.3535L11.8535 13.3536C11.7631 13.444 11.6381 13.5 11.5 13.5L11.497 13.5C11.4303 13.4996 11.3667 13.4861 11.3086 13.4621C11.2496 13.4377 11.1944 13.4015 11.1464 13.3536L8.64645 10.8536C8.45118 10.6583 8.45118 10.3417 8.64645 10.1464C8.84171 9.95118 9.15829 9.95118 9.35355 10.1464L11 11.7929V7C11 6.72386 11.2239 6.5 11.5 6.5ZM3 7.5C2.72386 7.5 2.5 7.72386 2.5 8C2.5 8.27614 2.72386 8.5 3 8.5H7.49994C7.77608 8.5 7.99994 8.27614 7.99994 8C7.99994 7.72386 7.77608 7.5 7.49994 7.5H3ZM3 11.5C2.72386 11.5 2.5 11.7239 2.5 12C2.5 12.2761 2.72386 12.5 3 12.5H6.5C6.77614 12.5 7 12.2761 7 12C7 11.7239 6.77614 11.5 6.5 11.5H3Z'
          fill='#A7A7A7'
        />
      </g>
    </svg>
    <span className={styles.rateText}>По рейтингу</span>
  </button>
);
