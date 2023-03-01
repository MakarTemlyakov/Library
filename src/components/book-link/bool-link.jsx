import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';

import { fetchBooks, fetchBooksCategories, toggleListCategory } from '../slices/navigation-slice';

import styles from './book-link.module.css';

export const BookLink = ({ navigationShowcase, burgerShowCase }) => {
  const isVisibleCategoryList = useSelector((state) => state.navigation.isVisibleCategoryList);
  const [isActiveLink, setActiveLink] = useState(false);
  const isActiveMenu = useSelector((state) => state.navigation.isMenuActive);
  const dispatch = useDispatch();
  const location = useLocation();
  const iActiveLinkBooks = location.pathname.includes('books');
  const patch = useParams();
  const currentCategory = `books/${patch.category || 'all'}`;
  const styleClassArrow = cn(styles.arrow, { [styles.activeArrow]: isVisibleCategoryList });
  const bookLinkClass = cn(styles.menuTabLink, { [styles.active]: iActiveLinkBooks });
  const buttonIconClass = cn(styles.button, { [styles.buttonActive]: isVisibleCategoryList });

  useEffect(() => {
    if (iActiveLinkBooks) {
      setActiveLink(true);
      dispatch(toggleListCategory(true));
    } else {
      dispatch(toggleListCategory(false));
    }
  }, [iActiveLinkBooks, dispatch, isActiveMenu]);

  const onShowCategoryList = () => {
    if (iActiveLinkBooks && isActiveLink) {
      dispatch(toggleListCategory(!isVisibleCategoryList));
    }
  };

  return (
    <NavLink
      className={bookLinkClass}
      to={currentCategory}
      onClick={onShowCategoryList}
      data-test-id={isActiveMenu ? burgerShowCase : navigationShowcase}
    >
      Витрина книг
      <button className={buttonIconClass} type='button'>
        <svg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            className={styleClassArrow}
            fillRule='evenodd'
            clipRule='evenodd'
            fill='none'
            d='M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z'
          />
        </svg>
      </button>
    </NavLink>
  );
};
