import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout/layout';
import { LayoutMainPage } from './components/layoutmainpage/layoutmainpage';
import { store } from './components/slices';
import { AgreementPage } from './pages/agreement';
import { BookPage } from './pages/book';
import { Login } from './pages/login/login';
import { MainPage } from './pages/main';
import { TermsPage } from './pages/terms';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const isAuth = false;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Layout />}>
            <Route element={<LayoutMainPage />}>
              <Route path='/' element={<Navigate to='/books/all' />} />
              <Route path='/books/:category' element={<MainPage />} />
              <Route path='/terms' element={<TermsPage />} />
              <Route path='/contract' element={<AgreementPage />} />
            </Route>
            <Route path='/books/:category/:bookId' element={<BookPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
