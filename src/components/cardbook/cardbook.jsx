import { useCallback, useEffect } from 'react';
import cn from 'classnames';

import noImg from '../../assets/img/no-image.svg';
import { Button } from '../button';
import { StarIcon } from '../icons/star/star-icon';

import styles from './cardbook.module.css';

export const CardBook = ({
  isListView,
  isHasImg,
  rating,
  author,
  title,
  bookedTill,
  year,
  image,
  isBooked,
  searchBookValue,
}) => {
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

  const getHighlightSearchWord = useCallback(() => {
    const words = title.split(new RegExp(`(${searchBookValue})`, 'gi'));

    return words.map((char) =>
      char.toLocaleLowerCase() === searchBookValue.toLocaleLowerCase() ? (
        <span style={{ color: 'red' }}>{char}</span>
      ) : (
        char
      )
    );
  }, [title, searchBookValue]);

  useEffect(() => {
    getHighlightSearchWord();
  }, [getHighlightSearchWord]);

  const btnClass = cn(styles.button, { [styles.buttonViewList]: isListView, [styles.buttonViewTile]: !isListView });

  return (
    <article className={cardClass} data-test-id='card'>
      <div className={cardImgWrapper}>
        <img className={isHasImg == null ? styles.noImg : ''} src={isHasImg !== null ? image.url : noImg} alt='' />
      </div>
      <div className={infoWrapper}>
        {rating > 0 ? (
          <ul className={ratingStart}>
            <li key={1}>
              <StarIcon isReview={true} />
            </li>
            <li key={2}>
              <StarIcon isReview={true} />
            </li>
            <li key={3}>
              <StarIcon isReview={true} />
            </li>
            <li key={4}>
              <StarIcon isReview={true} />
            </li>
            <li key={5}>
              <StarIcon />
            </li>
          </ul>
        ) : (
          <span className={bookCardRating}>еще нет оценок</span>
        )}

        <h6 className={bookCardTitle}>{getHighlightSearchWord()}</h6>

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
