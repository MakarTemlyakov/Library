import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { BookLink } from '../book-link/bool-link';
import { CategoriesList } from '../categories-list/categories-list';
import { fetchBooksCategories } from '../slices/navigation-slice';

import styles from './navbar.module.css';

export function NavBar() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.navigation.categories);

  useEffect(() => {
    dispatch(fetchBooksCategories());
  }, [dispatch]);

  return (
    <nav className={cn(styles.mainNavigation)} data-test-id='navbar'>
      <ul className={styles.menu}>
        <li className={styles.menuTab}>
          <BookLink navigationShowcase='navigation-showcase' />
          <CategoriesList navigationBooks='navigation-books' categories={categories} />
        </li>
        <li className={styles.menuTab}>
          <NavLink
            to='/terms'
            data-test-id='navigation-terms'
            className={({ isActive }) => (isActive ? `${styles.menuTabLink} ${styles.active}` : null)}
          >
            Правила пользования
          </NavLink>
        </li>
        <li className={styles.menuTab}>
          <NavLink
            to='/contract'
            data-test-id='navigation-contract'
            className={({ isActive }) => (isActive ? `${styles.menuTabLink} ${styles.active}` : '')}
          >
            Договор оферты
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
