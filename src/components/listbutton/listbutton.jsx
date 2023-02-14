import classNames from 'classnames';

import styles from './listbutton.module.css';

export const ListButton = ({ selectedTypeView, onChangeType, isActiveSearch }) => {
  const activeClass = classNames(styles.viewTypeListButton, {
    [styles.hiddenButton]: isActiveSearch,
    [styles.activeView]: selectedTypeView === 1,
  });

  return (
    <button className={activeClass} type='button' onClick={() => onChangeType(1)} data-test-id='button-menu-view-list'>
      <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2.0835 10C2.0835 9.56282 2.43794 9.20837 2.87516 9.20837H17.1252C17.5624 9.20837 17.9168 9.56282 17.9168 10C17.9168 10.4373 17.5624 10.7917 17.1252 10.7917H2.87516C2.43794 10.7917 2.0835 10.4373 2.0835 10Z'
          fill='#A7A7A7'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2.0835 5.25004C2.0835 4.81282 2.43794 4.45837 2.87516 4.45837H17.1252C17.5624 4.45837 17.9168 4.81282 17.9168 5.25004C17.9168 5.68727 17.5624 6.04171 17.1252 6.04171H2.87516C2.43794 6.04171 2.0835 5.68727 2.0835 5.25004Z'
          fill='#A7A7A7'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2.0835 14.75C2.0835 14.3128 2.43794 13.9584 2.87516 13.9584H17.1252C17.5624 13.9584 17.9168 14.3128 17.9168 14.75C17.9168 15.1873 17.5624 15.5417 17.1252 15.5417H2.87516C2.43794 15.5417 2.0835 15.1873 2.0835 14.75Z'
          fill='#A7A7A7'
        />
      </svg>
      <span className={styles.visuallyHidden}>Вариант просмотра - Список</span>
    </button>
  );
};
