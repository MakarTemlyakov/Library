import { Link } from 'react-router-dom';

import styles from './breadcrumbs.module.css';

export const Breadcrumbs = () => (
  <ul className={styles.breadcrumbs}>
    <li className={styles.breadcrumbsItem}>
      <Link className={styles.breadcrumbsLink} to='#'>
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
