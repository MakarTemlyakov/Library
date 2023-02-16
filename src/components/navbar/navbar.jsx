import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { BookLink } from '../book-link/bool-link';
import { CategoriesList } from '../categories-list/categories-list';

import styles from './navbar.module.css';

export function NavBar() {
  return (
    <nav className={cn(styles.mainNavigation)} data-test-id='navbar'>
      <ul className={styles.menu}>
        <li className={styles.menuTab}>
          <BookLink navigationShowcase='navigation-showcase' />
          <CategoriesList navigationBooks='navigation-books' />
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
