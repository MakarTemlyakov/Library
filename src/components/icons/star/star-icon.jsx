import cn from 'classnames';

import styles from './star.module.css';

export const StarIcon = ({ isReview }) => {
  const styleClass = cn(styles.star, { [styles.reviewed]: isReview });

  return (
    <svg width='20' height='19' viewBox='0 0 20 19' xmlns='http://www.w3.org/2000/svg' className={styleClass}>
      <path
        d='M7.59798 6.30426L10 0.549456L12.402 6.30426C12.5419 6.63938 12.8576 6.86723 13.2187 6.89608L19.4493 7.39383L14.7036 11.4448C14.4276 11.6804 14.3064 12.0508 14.391 12.4042L15.8415 18.4636L10.5041 15.215C10.1945 15.0266 9.80547 15.0266 9.4959 15.215L4.15848 18.4636L5.60898 12.4042C5.69359 12.0508 5.57245 11.6804 5.29644 11.4448L0.550667 7.39383L6.78134 6.89608C7.14244 6.86723 7.4581 6.63938 7.59798 6.30426Z'
        stroke='#FFBC1F'
      />
    </svg>
  );
};
