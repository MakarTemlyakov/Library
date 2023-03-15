import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout/layout';
import { LayoutMainPage } from './components/layoutmainpage/layoutmainpage';
import { ProtectedRoute } from './components/routes/protctedroute';
import { store } from './components/slices';
import { AgreementPage } from './pages/agreement';
import { BookPage } from './pages/book';
import { Login } from './pages/login/login';
import { MainPage } from './pages/main';
import { Register } from './pages/register/register';
import { TermsPage } from './pages/terms';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route element={<LayoutMainPage />}>
              <Route path='/' element={<Navigate to='/books/all' />} />
              <Route path='/books/:category' element={<MainPage />} />
              <Route path='/terms' element={<TermsPage />} />
              <Route path='/contract' element={<AgreementPage />} />
            </Route>
            <Route path='/books/:category/:bookId' element={<BookPage />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
