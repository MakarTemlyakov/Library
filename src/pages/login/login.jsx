import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/button';
import { LoginForm } from '../../components/forms/login/loginform';
import { Loader } from '../../components/loader/loader';
import { Message } from '../../components/message/message';
import { Modal } from '../../components/modal/modal';
import { signIn } from '../../components/slices/auth-slice';

import styles from './login.module.css';

export const Login = () => {
  const { isLoading, errorResponse, successResponse, isAuth } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const repeatSendingUserData = () => {
    if (userData) {
      dispatch(signIn(userData));
    }
  };

  return (
    <section>
      {!errorResponse && <LoginForm setUserData={setUserData} />}
      {isLoading && <Loader />}
      {errorResponse && (
        <Modal>
          <Message
            title='Вход не выполнен'
            text='Что-то пошло не так. Попробуйте ещё раз'
            Component={
              <Button onClick={repeatSendingUserData} size='large'>
                повторить
              </Button>
            }
          />
        </Modal>
      )}
    </section>
  );
};
