import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { BookLink } from '../book-link/bool-link';
import { CategoriesList } from '../categories-list/categories-list';

import styles from './burger-menu.module.css';

export const BurgerMenu = ({ burgerRef }) => {
  const isActiveMenu = useSelector((state) => state.navigation.isMenuActive);
  const dispatch = useDispatch();

  return (
    isActiveMenu && (
      <nav
        data-test-id='burger-navigation'
        ref={burgerRef}
        className={isActiveMenu ? cn(styles.burgerMenu, styles.active) : cn(styles.burgerMenu)}
      >
        <ul className={styles.menu}>
          <li className={styles.menuTab}>
            <BookLink burgerShowCase='burger-showcase' />
            <CategoriesList burgerBooks='burger-books' />
          </li>
          <li className={styles.menuTab}>
            <NavLink
              data-test-id='burger-terms'
              to='/terms'
              className={({ isActive }) => (isActive ? `${styles.menuTabLink} ${styles.active}` : null)}
            >
              Правила пользования
            </NavLink>
          </li>
          <li className={styles.menuTab}>
            <NavLink
              data-test-id='burger-contract'
              to='/contract'
              className={({ isActive }) => (isActive ? `${styles.menuTabLink} ${styles.active}` : '')}
            >
              Договор оферты
            </NavLink>
          </li>
          <hr className={styles.blankLine} />

          <li className={styles.menuTab}>
            <NavLink
              to='/profile'
              className={({ isActive }) => (isActive ? `${styles.menuTabLink} ${styles.active}` : '')}
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.menuTab}>
            <NavLink
              to='/exit'
              className={({ isActive }) => (isActive ? `${styles.menuTabLink} ${styles.active}` : '')}
            >
              Выход
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  );
};
