import { Outlet } from 'react-router-dom';

import { NavBar } from '../navbar/navbar';

import styles from './layoutmainpage.module.css';

export const LayoutMainPage = () => (
  <div className={styles.rowWrapper}>
    <NavBar />
    <Outlet />
  </div>
);
