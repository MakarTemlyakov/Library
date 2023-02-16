import cn from 'classnames';

import bookiMG from '../../assets/img/111.png';
import noImg from '../../assets/img/no-image.svg';
import { Button } from '../button';
import { StarIcon } from '../icons/star/star-icon';

import styles from './cardbook.module.css';

export const CardBook = ({ isListView, isHasImg, rating, author, title, bookedTill, year, isBooked }) => {
  const cardClass = cn(styles.bookCard, {
    [styles.bookCardViewList]: isListView,
    [styles.bookCardViewTile]: !isListView,
  });
  const cardImgWrapper = cn({
    [styles.bookCardImgViewListWrppaer]: isListView,
    [styles.bookCardImgViewTileWrppaer]: !isListView,
  });
  const infoWrapper = cn({ [styles.viewListWrapper]: isListView });
  const ratingStart = cn(styles.ratingStars, {
    [styles.ratingStarsViewList]: isListView,
    [styles.ratingStarsViewTile]: !isListView,
  });
  const bookCardRating = cn(styles.bookCardRating, {
    [styles.bookCardTitleViewList]: isListView,
    [styles.bookCardTitleViewTile]: !isListView,
  });

  const bookCardTitle = cn(styles.bookCardTitle, {
    [styles.bookCardTitleViewList]: isListView,
    [styles.bookCardTitleViewTile]: !isListView,
  });

  const bookCardAuthor = cn(styles.bookCardAuthor, {
    [styles.bookCardAuthorViewList]: isListView,
    [styles.bookCardAuthorViewTile]: !isListView,
  });

  const btnClass = cn(styles.button, { [styles.buttonViewList]: isListView, [styles.buttonViewTile]: !isListView });

  return (
    <article className={cardClass} data-test-id='card'>
      <div className={cardImgWrapper}>
        <img className={isHasImg == null ? styles.noImg : ''} src={isHasImg !== null ? bookiMG : noImg} alt='' />
      </div>
      <div className={infoWrapper}>
        {rating > 0 ? (
          <ul className={ratingStart}>
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
          <span className={bookCardRating}>еще нет оценок</span>
        )}

        <h6 className={bookCardTitle}>{title}</h6>
        <p className={bookCardAuthor}>
          {author}, <time dateTime={year}>{year}</time>
        </p>

        <Button color='primary' size='small' isDisabled={bookedTill != null} className={btnClass}>
          {bookedTill ? 'Занята до 23.04' : isBooked ? 'Забронирована' : 'Забронировать'}
        </Button>
      </div>
    </article>
  );
};
