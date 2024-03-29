import { useState } from 'react';
import classNames from 'classnames';

import styles from './searchbox.module.css';

export const SearchBox = ({ isCollapse, onSearch }) => {
  const activeClass = classNames(styles.searchBar, { [styles.active]: isCollapse });
  const [searchValue, setSearchValue] = useState('');

  const searchChange = (e) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      data-test-id='input-search'
      type='text'
      name='search'
      placeholder='Поиск книги или автора'
      className={activeClass}
      onChange={(e) => searchChange(e)}
    />
  );
};
