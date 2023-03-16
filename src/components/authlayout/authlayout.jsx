import { Outlet } from 'react-router-dom';

import styles from './authlayout.module.css';

export const AuthLayout = () => {
  const test = 2;

  return (
    <main className={styles.layout}>
      <h1 className={styles.title}>Cleverland</h1>
      <Outlet />
    </main>
  );
};
