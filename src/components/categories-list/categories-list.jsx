import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

import categories from '../../data/categories';
import { toggleListCategory } from '../slices/navigation-slice';

import styles from './categories-list.module.css';

export const CategoriesList = ({ navigationBooks, burgerBooks }) => {
  const isVisibleCategoryList = useSelector((state) => state.navigation.isVisibleCategoryList);
  const location = useLocation();
  const dispatch = useDispatch();
  const isActiveMenu = useSelector((state) => state.navigation.isMenuActive);

  // что такое {[styles.bookListHidden]}??????
  const activeStyle = cn(styles.bookList, { [styles.bookListHidden]: !isVisibleCategoryList });

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
            to={`books/${category.route}`}
            className={({ isActive }) => (isActive ? styles.active : null)}
            data-test-id={isActiveMenu ? burgerBooks : navigationBooks}
          >
            {category.name} <span className={styles.bookCount}>{category.count}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
