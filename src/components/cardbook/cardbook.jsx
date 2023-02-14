import bookiMG from '../../assets/img/111.png';
import noImg from '../../assets/img/no-image.svg';
import { StarIcon } from '../icons/star/star-icon';

import styles from './cardbook.module.css';

export const CardBook = ({ isListView, isHasImg, rating, author, title, bookedTill, year, isBooked }) => (
  <article
    className={
      isListView ? `${styles.bookCard} ${styles.bookCardViewList}` : `${styles.bookCard} ${styles.bookCardViewTile}`
    }
    data-test-id='card'
  >
    <div className={isListView ? `${styles.bookCardImgViewListWrppaer}` : `${styles.bookCardImgViewTileWrppaer}`}>
      <img className={isHasImg == null ? styles.noImg : ''} src={isHasImg !== null ? bookiMG : noImg} alt='' />
    </div>
    <div className={isListView ? `${styles.viewListWrapper}` : ''}>
      {rating > 0 ? (
        <ul
          className={
            isListView
              ? `${styles.ratingStars} ${styles.ratingStarsViewList}`
              : `${styles.ratingStars} ${styles.ratingStarsViewTile}`
          }
        >
          <li>
            <StarIcon isReview={true} />
          </li>
          <li>
            <StarIcon isReview={true} />
          </li>
          <li>
            <StarIcon isReview={true} />
          </li>
          <li>
            <StarIcon isReview={true} />
          </li>
          <li>
            <StarIcon />
          </li>
        </ul>
      ) : (
        <span
          className={
            isListView
              ? `${styles.bookCardRating} ${styles.bookCardRatingViewList}`
              : `${styles.bookCardRating} ${styles.bookCardRatingViewTile}`
          }
        >
          еще нет оценок
        </span>
      )}

      <h6
        className={
          isListView
            ? `${styles.bookCardTitle} ${styles.bookCardTitleViewList}`
            : `${styles.bookCardTitle} ${styles.bookCardTitleViewTile}`
        }
      >
        {title}
      </h6>
      <p
        className={
          isListView
            ? `${styles.bookCardAuthor} ${styles.bookCardAuthorViewList}`
            : `${styles.bookCardAuthor} ${styles.bookCardAuthorViewTile}`
        }
      >
        {author}, <time dateTime={year}>{year}</time>
      </p>
      <button
        className={
          isListView ? `${styles.button} ${styles.buttonViewList}` : `${styles.button} ${styles.buttonViewTile}`
        }
        type='button'
        disabled={bookedTill != null}
      >
        {bookedTill ? 'Занята до 23.04' : isBooked ? 'Забронирована' : 'Забронировать'}
      </button>
    </div>
  </article>
);
