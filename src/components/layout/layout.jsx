import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { Footer } from '../footer/footer';
import { Header } from '../header';
import { initUser } from '../slices/auth-slice';
import { fetchBooks } from '../slices/books-slice';
import { fetchBooksCategories } from '../slices/navigation-slice';

const isAuth = false;

export const Layout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBooksCategories());
    dispatch(fetchBooks());
    dispatch(initUser());
  }, [dispatch]);

  console.log({ user });
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
