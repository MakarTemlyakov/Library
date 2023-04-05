import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { CardBook } from '../../components/cardbook/cardbook';
import { CloseIcon } from '../../components/close-icon/close-icon';
import { ListButton } from '../../components/listbutton/listbutton';
import { Loader } from '../../components/loader/loader';
import { RateButton } from '../../components/ratebutton/ratebutton';
import { SearchBox } from '../../components/searchbox/searchbox';
import { TileButton } from '../../components/tilebutton/tilebutton';
import { ToastMessage } from '../../components/toastmessage/testmessage';

import styles from './main-page.module.css';

export function MainPage() {
  const { category } = useParams();
  const books = useSelector((state) => state.navigation.books);
  const currentCategory = useSelector((state) => state.navigation.categories.find((x) => x.path === category));
  const [booksByCategory, setBooksByCategory] = useState(books);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [selectedTypeView, setTypeView] = useState(0);
  const [isActiveSearch, setActiveSearch] = useState(false);
  const [isChangedSortType, setIsChangedSortType] = useState(false);
  const [searchBookValue, setSearchBookValue] = useState('');

  const isListView = selectedTypeView === 1;

  const searchFilter = (searchValue) => {
    const filtredBooks = booksByCategory.filter((book) => book.title.toLowerCase().includes(searchValue.toLowerCase()));

    setSearchBookValue(searchValue);

    setSearchedBooks(filtredBooks);
  };

  const {
    navigation: { isLoading, isError },
    auth: { isAuth },
  } = useSelector((state) => state);

  const activeClass = classNames(styles.searchIcon, { [styles.hiddenButton]: isActiveSearch });

  const sortBooks = useCallback(
    (filterdBooks) => {
      let sorted = [];

      if (isChangedSortType) {
        sorted = [...filterdBooks].sort((a, b) => a.rating - b.rating);
      } else {
        sorted = [...filterdBooks].sort((a, b) => b.rating - a.rating);
      }

      setBooksByCategory(sorted);
      setSearchedBooks(sorted);
    },
    [isChangedSortType]
  );

  useEffect(() => {
    const filterdBooks =
      category === 'all' ? books : books.filter((book) => book.categories.some((c) => c === currentCategory?.name));

    sortBooks(filterdBooks);
  }, [sortBooks, books, currentCategory?.name, category]);

  const changeSortType = () => setIsChangedSortType(!isChangedSortType);

  const turnOnActiveSearch = () => setActiveSearch(true);

  const turnOffActiveSearch = () => setActiveSearch(false);

  const onChangeType = (type) => setTypeView(type);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <ToastMessage text={isError} />
  ) : (
    <section className={styles.MainPage} data-test-id='main'>
      <div className={styles.layoutBooks}>
        <div className={styles.controlPanelBooks}>
          <button className={activeClass} type='button' onClick={turnOnActiveSearch} data-test-id='button-search-open'>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.3335 2.66671C4.75617 2.66671 2.66683 4.75605 2.66683 7.33337C2.66683 9.9107 4.75617 12 7.3335 12C9.91083 12 12.0002 9.9107 12.0002 7.33337C12.0002 4.75605 9.91083 2.66671 7.3335 2.66671ZM1.3335 7.33337C1.3335 4.01967 4.01979 1.33337 7.3335 1.33337C10.6472 1.33337 13.3335 4.01967 13.3335 7.33337C13.3335 10.6471 10.6472 13.3334 7.3335 13.3334C4.01979 13.3334 1.3335 10.6471 1.3335 7.33337Z'
                fill='#A7A7A7'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10.6284 10.6286C10.8887 10.3683 11.3108 10.3683 11.5712 10.6286L14.4712 13.5286C14.7315 13.789 14.7315 14.2111 14.4712 14.4714C14.2108 14.7318 13.7887 14.7318 13.5284 14.4714L10.6284 11.5714C10.368 11.3111 10.368 10.889 10.6284 10.6286Z'
                fill='#A7A7A7'
              />
            </svg>
          </button>
          <SearchBox isCollapse={isActiveSearch} onSearch={searchFilter} />
          <button
            className={styles.closeButton}
            type='button'
            onClick={turnOffActiveSearch}
            data-test-id='button-search-close'
          >
            <CloseIcon />
          </button>
          <RateButton isActiveSearch={isActiveSearch} onClick={changeSortType} isChangedSortType={isChangedSortType} />
          <TileButton selectedTypeView={selectedTypeView} onChangeType={onChangeType} isActiveSearch={isActiveSearch} />
          <ListButton selectedTypeView={selectedTypeView} onChangeType={onChangeType} isActiveSearch={isActiveSearch} />
        </div>
        {searchedBooks.length > 0 ? (
          <ul
            className={
              isListView
                ? `${styles.bookCards} ${styles.bookCardsListView}`
                : `${styles.bookCards} ${styles.bookCardsTileView}`
            }
          >
            {searchedBooks.map((book) => (
              <li key={book.id}>
                <NavLink to={`/books/${currentCategory?.path}/${book.id}`}>
                  <CardBook
                    bookId={book.id}
                    isHasImg={book.image}
                    isListView={isListView}
                    rating={book.rating}
                    author={book.author}
                    title={book.title}
                    bookedTill={book.bookedTill}
                    year={book.year}
                    isBooked={book.isBooked}
                    searchBookValue={searchBookValue}
                  />
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.categoryEmpty}>В этой категории книг ещё нет</div>
        )}
      </div>
    </section>
  );
}
