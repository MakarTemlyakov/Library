import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { Button } from '../../components/button';
import { LoginForm } from '../../components/forms/login/loginform';
import { Loader } from '../../components/loader/loader';
import { Message } from '../../components/message/message';
import { signIn } from '../../components/slices/auth-slice';

import styles from './login.module.css';

export const Login = () => {
  const { isLoading, errorResponse, isAuth } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  const repeatSendingUserData = () => {
    if (userData) {
      dispatch(signIn(userData));
    }
  };

  if (isAuth) {
    return <Navigate to='/' replace={true} />;
  }

  const isShowLoginForm = !errorResponse || (errorResponse && errorResponse.status === 400);
  const NotSendingData = errorResponse && errorResponse.status !== 400;

  return (
    <section>
      {isShowLoginForm && <LoginForm setUserData={setUserData} />}
      {NotSendingData && (
        <Message
          title='Вход не выполнен'
          text='Что-то пошло не так. Попробуйте ещё раз'
          Component={
            <Button onClick={repeatSendingUserData} size='large'>
              повторить
            </Button>
          }
        />
      )}
      {isLoading && <Loader />}
    </section>
  );
};
