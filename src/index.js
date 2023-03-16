import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthLayout } from './components/authlayout/authlayout';
import { ForgetPassword } from './components/forms/forgetpassword/forgetpassword';
import { Layout } from './components/layout/layout';
import { LayoutMainPage } from './components/layoutmainpage/layoutmainpage';
import { ProtectedRoute } from './components/routes/protctedroute';
import { store } from './components/slices';
import { AgreementPage } from './pages/agreement';
import { BookPage } from './pages/book';
import { Login } from './pages/login/login';
import { MainPage } from './pages/main';
import { Register } from './pages/register/register';
import { ResetPassword } from './pages/resetpassword/resetpassword';
import { TermsPage } from './pages/terms';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // eslint-disable-next-line react/jsx-filename-extension
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
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-pass' element={<ForgetPassword />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
