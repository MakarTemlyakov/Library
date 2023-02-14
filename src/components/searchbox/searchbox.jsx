import classNames from 'classnames';

import styles from './searchbox.module.css';

export const SearchBox = ({ isCollapse }) => {
  const activeClass = classNames(styles.searchBar, { [styles.active]: isCollapse });

  return (
    <input
      data-test-id='input-search'
      type='text'
      name='search'
      placeholder='Поиск книги или автора'
      className={activeClass}
    />
  );
};
