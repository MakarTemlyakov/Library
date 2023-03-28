import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import cn from 'classnames';

import styles from './categories-list.module.css';

export const CategoriesList = ({ navigationBooks, burgerBooks, categories }) => {
  const isVisibleCategoryList = useSelector((state) => state.navigation.isVisibleCategoryList);
  const books = useSelector((state) => state.navigation.books);

  const isActiveMenu = useSelector((state) => state.navigation.isMenuActive);
  const activeStyle = cn(styles.bookList, { [styles.bookListHidden]: !isVisibleCategoryList });

  const getCountBooks = (categoryName) =>
    books.filter((book) => book.categories.some((category) => category === categoryName)).length;

  return (
    <ul className={activeStyle}>
      <li className={styles.bookListItem}>
        <NavLink
          to='books/all'
          className={({ isActive }) => (isActive ? styles.active : null)}
          data-test-id={isActiveMenu ? burgerBooks : navigationBooks}
        >
          Все книги
        </NavLink>
      </li>
      {categories.map((category) => (
        <li key={category.id} className={styles.bookListItem}>
          <NavLink
            to={`books/${category.path}`}
            className={({ isActive }) => (isActive ? styles.active : null)}
            data-test-id={isActiveMenu ? burgerBooks : navigationBooks}
          >
            {category.name} <span className={styles.bookCount}>{getCountBooks(category.name)}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
