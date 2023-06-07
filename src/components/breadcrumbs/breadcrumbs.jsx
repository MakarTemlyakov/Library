import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import styles from './breadcrumbs.module.css';

export const Breadcrumbs = ({ title }) => {
  const route = useParams();
  const { categories } = useSelector((state) => state.navigation);
  const bookCategory = categories.find((category) => category.path === route.category);

  return (
    <ul className={styles.breadcrumbs}>
      <li className={styles.breadcrumbsItem}>
        <Link className={styles.breadcrumbsLink} to={`/books/${bookCategory.path}`}>
          {bookCategory.name}
        </Link>
      </li>
      <li className={styles.breadcrumbsItem}>
        <span className={styles.breadcrumbsActive}>{title}</span>
      </li>
    </ul>
  );
};
