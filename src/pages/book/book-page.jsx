import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { Button } from '../../components/button/button';
import { Comment } from '../../components/comment/comment';
import { Loader } from '../../components/loader/loader';
import { Rating } from '../../components/rating/rating';
import { fetchBooksById } from '../../components/slices/navigation-slice';
import { Slider } from '../../components/slider/slider';
import { ToastMessage } from '../../components/toastmessage/testmessage';

import styles from './book-page.module.css';

export function BookPage() {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const { isError, isLoading, book } = useSelector((state) => state.navigation);

  const [isShowCommentMode, setCommentMode] = useState(false);

  useEffect(() => {
    dispatch(fetchBooksById(bookId));
  }, [dispatch, bookId]);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <ToastMessage text={isError} />
  ) : (
    <section className={styles.bookPage} data-test-id='book-page'>
      {book !== null && (
        <div className='container'>
          <Breadcrumbs />
          <div className={styles.columnLayout}>
            <div className={styles.columnWapper}>
              <Slider images={book.images} />
            </div>
            <h1 className={styles.bookTitle}>{book.title}</h1>
            <span className={styles.bookAuthor}>
              {book.authors.map((author) => author)},{' '}
              <time>
                <span>{book.issueYear}</span>
              </time>
            </span>
            <div className={styles.bookBooking}>
              <Button size='large' color='secondary'>
                Забронировать
              </Button>
            </div>
            <div className={styles.bookAbout}>
              <h2 className={styles.bookAboutTitle}>О книге</h2>
              <div className={styles.bookAboutDescription}>
                <p>{book.description}</p>
              </div>
            </div>
          </div>

          <h3 className={styles.bookRatingTitle}>Рейтинг</h3>
          <div className={styles.bookRating}>
            <Rating bookRating={book.rating} />
            {book.rating > 0 ? (
              <span className={styles.bookRatingTotal}>{book.rating}</span>
            ) : (
              <span className={styles.bookEmptyRaiting}>еще нет оценок</span>
            )}
          </div>
          <div className={styles.detailInfo}>
            <h4 className={styles.detailInfoTitle}>Подробная информация</h4>
            <div className={styles.detailInfoWrapper}>
              <div className={styles.detailInfoGroup}>
                <dl>
                  <dt>Издательство</dt>
                  <dd>{book.publish}</dd>
                </dl>
                <dl>
                  <dt>Год издания</dt>
                  <dd>{book.issueYear}</dd>
                </dl>
                <dl>
                  <dt>Страниц</dt>
                  <dd>{book.pages}</dd>
                </dl>
                <dl>
                  <dt>Переплёт</dt>
                  <dd>{book.cover}</dd>
                </dl>
                <dl>
                  <dt>Формат</dt>
                  <dd>{book.format}</dd>
                </dl>
              </div>
              <div className={styles.detailInfoGroup}>
                <dl>
                  <dt>Жанр</dt>
                  {book.categories.map((category) => (
                    <dd>{category}</dd>
                  ))}
                </dl>
                <dl>
                  <dt>Вес</dt>
                  <dd>{book.weight} г</dd>
                </dl>
                <dl>
                  <dt>ISBN</dt>
                  <dd>{book.ISBN}</dd>
                </dl>
                <dl className={styles.multipleGroup}>
                  <dt>Изготовитель</dt>
                  <dd>
                    <p>{book.producer}</p>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className={styles.commenWrapper}>
            <h5 className={styles.reviewTitle}>
              Отзывы <span className={styles.reviewCount}>{book.commentCount} </span>
              <button
                type='button'
                data-test-id='button-hide-reviews'
                onClick={() => setCommentMode(!isShowCommentMode)}
                className={isShowCommentMode ? `${styles.button} ${styles.buttonActive}` : `${styles.button}`}
              >
                <svg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z'
                    fill='#363636'
                  />
                </svg>
              </button>
            </h5>

            {book.commentCount > 0 && isShowCommentMode && (
              <ul className={styles.commentsList}>
                <li className={styles.commentItem}>
                  <Comment />
                </li>
                <li className={styles.commentItem}>
                  <Comment />
                </li>
                <li className={styles.commentItem}>
                  <Comment />
                </li>
              </ul>
            )}
          </div>
          <div className={styles.reviewButton} data-test-id='button-rating'>
            <Button size='large' color='primary'>
              Оценить книгу
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
