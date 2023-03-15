import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { Footer } from '../footer/footer';
import { Header } from '../header';
import { fetchBooks, fetchBooksCategories } from '../slices/navigation-slice';

const isAuth = false;

export const Layout = () => {
  const [isActiveMenu, setActiveMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([dispatch(fetchBooksCategories()), dispatch(fetchBooks())]);
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <main className='main'>
        <div className='container'>
          <Outlet />
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};
