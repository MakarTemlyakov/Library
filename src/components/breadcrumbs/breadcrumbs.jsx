import { Link, useParams } from 'react-router-dom';

import styles from './breadcrumbs.module.css';

export const Breadcrumbs = () => {
  const route = useParams();

  return (
    <ul className={styles.breadcrumbs}>
      <li className={styles.breadcrumbsItem}>
        <Link className={styles.breadcrumbsLink} to={`/books/${route.category}`}>
          Бизнес книги
        </Link>
      </li>
      <li className={styles.breadcrumbsItem}>
        <span className={styles.breadcrumbsActive}>
          Грокаем алгоритмы. Иллюстрированное пособие для программистов илюбопытствующих
        </span>
      </li>
    </ul>
  );
};
