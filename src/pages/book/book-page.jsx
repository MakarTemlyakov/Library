import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FreeMode, Mousewheel, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import bookiMG from '../../assets/img/111.png';
import noImg from '../../assets/img/no-image.svg';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { Button } from '../../components/button/button';
import { Comment } from '../../components/comment/comment';
import { StarIcon } from '../../components/icons/star/star-icon';
import { Slider } from '../../components/slider/slider';
import books from '../../data/books';

import styles from './book-page.module.css';

export function BookPage() {
  const bookParam = useParams();
  const book = books[`${bookParam.category}`].find((b) => b.id === bookParam.bookId);

  const [isShowCommentMode, setCommentMode] = useState(false);

  return (
    <section className={styles.bookPage} data-test-id='book-page'>
      <div className='container'>
        <Breadcrumbs />
        <div className={styles.columnLayout}>
          <div className={styles.columnWapper}>
            <Slider bookImg={book.image} />
          </div>
          <h1 className={styles.bookTitle}>{book.title}</h1>
          <span className={styles.bookAuthor}>
            {book.author},
            <time>
              <span>{book.year}</span>
            </time>
          </span>
          <div className={styles.bookBooking}>
            <Button>Забронировать</Button>
          </div>
          <div className={styles.bookAbout}>
            <h2 className={styles.bookAboutTitle}>О книге</h2>
            <div className={styles.bookAboutDescription}>
              <p>
                Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
                решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута,
                изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое
                время?
              </p>
              <p>
                Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
                алгоритмы — это веселое и увлекательное занятие.
              </p>
            </div>
          </div>
        </div>

        <h3 className={styles.bookRatingTitle}>Рейтинг</h3>
        <div className={styles.bookRating}>
          <ul className={styles.bookRatingStars}>
            <li className={styles.bookRatingStarItem}>
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
                <dd>Питер</dd>
              </dl>
              <dl>
                <dt>Год издания</dt>
                <dd>2019</dd>
              </dl>
              <dl>
                <dt>Страниц</dt>
                <dd>288</dd>
              </dl>
              <dl>
                <dt>Переплёт</dt>
                <dd>Мягкая обложка</dd>
              </dl>
              <dl>
                <dt>Формат</dt>
                <dd>70х100</dd>
              </dl>
            </div>
            <div className={styles.detailInfoGroup}>
              <dl>
                <dt>Жанр</dt>
                <dd>Компьютерная литература</dd>
              </dl>
              <dl>
                <dt>Вес</dt>
                <dd>370 г</dd>
              </dl>
              <dl>
                <dt>ISBN</dt>
                <dd>978-5-4461-0923-4</dd>
              </dl>
              <dl className={styles.multipleGroup}>
                <dt>Изготовитель</dt>
                <dd>
                  <p>ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29</p>
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
          <Button>Оценить книгу</Button>
        </div>
      </div>
    </section>
  );
}
