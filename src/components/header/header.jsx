import { createRef, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';

import avatar from '../../assets/img/avatar.png';
import logo from '../../assets/img/logo.svg';
import { BurgerMenu } from '../burger-menu/burger-menu';
import { toggleModeMenu } from '../slices/navigation-slice';

import styles from './header.module.css';

export const Header = () => {
  const isActiveMenu = useSelector((state) => state.navigation.isMenuActive);

  const dispatch = useDispatch();
  const burgerRef = useRef(null);
  const location = useLocation();
  const routeCategory = useParams();

  useEffect(() => {
    const onLeaveClick = (e) => {
      if (burgerRef.current && !burgerRef.current.contains(e.target)) {
        dispatch(toggleModeMenu(false));
      }

      if (!location.pathname.includes('books')) {
        dispatch(toggleModeMenu(false));
      }

      if (location.pathname.includes('books') && routeCategory.category !== 'all') {
        dispatch(toggleModeMenu(false));
      }
    };

    document.addEventListener('click', onLeaveClick);

    return () => {
      document.removeEventListener('click', onLeaveClick);
    };
  }, [burgerRef, dispatch, location.pathname, routeCategory.category]);

  const burgerOnClick = (e) => {
    e.stopPropagation();
    dispatch(toggleModeMenu(!isActiveMenu));
  };

  return (
    <header className={styles.header} data-test-id='header'>
      <div className='container'>
        <div className={styles.rowWrapper}>
          <NavLink to='/books/all'>
            <div className={styles.logo}>
              <img src={logo} alt='' />
              <p className={styles.logoName}>Cleverland</p>
            </div>
          </NavLink>
          <button
            data-test-id='button-burger'
            type='button'
            className={
              isActiveMenu ? cn(styles.burgerMenuWrapper, styles.burgerMenuWrapperActive) : cn(styles.burgerMenuWrapper)
            }
            onClick={burgerOnClick}
          >
            <span className={styles.burgerMenu} />
          </button>
          {isActiveMenu && <BurgerMenu burgerRef={burgerRef} />}
          <h3 className={styles.title}>Библиотека</h3>
          <div className={styles.user}>
            <span className={styles.userInfo}>Привет, Иван!</span>
            <img className={styles.userAvatar} src={avatar} alt='' />
          </div>
        </div>
      </div>
    </header>
  );
};
