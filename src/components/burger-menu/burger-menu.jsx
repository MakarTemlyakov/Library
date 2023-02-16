import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { BookLink } from '../book-link/bool-link';
import { CategoriesList } from '../categories-list/categories-list';

import styles from './burger-menu.module.css';

export const BurgerMenu = ({ burgerRef, dataTestTerms, dataTestContract, dataTestShowcase, dataTestBooks }) => {
  const isActiveMenu = useSelector((state) => state.navigation.isMenuActive);
  const burgerMenuClass = cn(styles.burgerMenu, { [styles.active]: isActiveMenu });
  const tabMenuLink = cn(styles.menuTabLink);
  const activeLink = cn(styles.menuTabLink, styles.active);

  return (
    isActiveMenu && (
      <nav data-test-id='burger-navigation' ref={burgerRef} className={burgerMenuClass}>
        <ul className={styles.menu}>
          <li className={styles.menuTab}>
            <BookLink burgerShowCase='burger-showcase' />
            <CategoriesList burgerBooks='burger-books' />
          </li>
          <li className={styles.menuTab}>
            <NavLink
              data-test-id='burger-terms'
              to='/terms'
              className={({ isActive }) => (isActive ? activeLink : tabMenuLink)}
            >
              Правила пользования
            </NavLink>
          </li>
          <li className={styles.menuTab}>
            <NavLink
              data-test-id='burger-contract'
              to='/contract'
              className={({ isActive }) => (isActive ? activeLink : tabMenuLink)}
            >
              Договор оферты
            </NavLink>
          </li>
          <hr className={styles.blankLine} />

          <li className={styles.menuTab}>
            <NavLink to='/profile' className={({ isActive }) => (isActive ? activeLink : tabMenuLink)}>
              Профиль
            </NavLink>
          </li>
          <li className={styles.menuTab}>
            <NavLink to='/exit' className={({ isActive }) => (isActive ? activeLink : tabMenuLink)}>
              Выход
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  );
};
