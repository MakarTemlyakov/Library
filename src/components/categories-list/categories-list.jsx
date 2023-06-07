import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import cn from 'classnames';

import styles from './categories-list.module.css';

export const CategoriesList = ({ navigationBooks, burgerBooks, categories }) => {
  const isVisibleCategoryList = useSelector((state) => state.navigation.isVisibleCategoryList);
  const books = useSelector((state) => state.navigation.books);

  const isActiveMenu = useSelector((state) => state.navigation.isMenuActive);
  const activeStyle = cn(styles.bookList, { [styles.bookListHidden]: !isVisibleCategoryList });

  return (
    <ul className={activeStyle}>
      {categories.map((category) => (
        <li key={category.id} className={styles.bookListItem}>
          <NavLink
            to={`books/${category.path}`}
            className={({ isActive }) => (isActive ? styles.active : null)}
            data-test-id={isActiveMenu ? burgerBooks : navigationBooks}
          >
            {category.name} <span className={styles.bookCount}>{category.booksCount}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
