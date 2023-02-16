import { Link, useParams } from 'react-router-dom';

import styles from './breadcrumbs.module.css';

export const Breadcrumbs = ({
  categoryName = 'Бизнес книги',
  currentBookName = 'Грокаем алгоритмы. Иллюстрированное пособие для программистов илюбопытствующих',
}) => {
  const route = useParams();

  return (
    <ul className={styles.breadcrumbs}>
      <li className={styles.breadcrumbsItem}>
        <Link className={styles.breadcrumbsLink} to={`/books/${route.category}`}>
          {categoryName}
        </Link>
      </li>
      <li className={styles.breadcrumbsItem}>
        <span className={styles.breadcrumbsActive}>{currentBookName}</span>
      </li>
    </ul>
  );
};
