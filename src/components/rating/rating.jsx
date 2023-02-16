import cn from 'classnames';

import { StarIcon } from '../icons/star/star-icon';

import styles from './rating.module.css';

export const Rating = ({ bookRating, className }) => {
  const stars = [...Array(5)];

  return (
    <ul className={styles.bookRatingStars}>
      {stars.map((star, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index} className={styles.bookRatingStarItem}>
          <StarIcon isReview={index + 1 <= Math.floor(bookRating)} />
        </li>
      ))}
    </ul>
  );
};
