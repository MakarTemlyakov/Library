import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/button';
import { RegisterForm } from '../../components/forms/register/registerform';
import { Loader } from '../../components/loader/loader';
import { Message } from '../../components/message/message';
import { authRegister, removeError, removeSuccess } from '../../components/slices/auth-slice';

import styles from './register.module.css';

export const Register = () => {
  const { isLoading, errorResponse, successResponse } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isShowForm = !errorResponse && !successResponse;
  const isShowSuccessMessage = successResponse && successResponse === 200;
  const isShowFailedMessage = errorResponse && errorResponse.status !== 400;
  const isShowInvalidEmailMessage = errorResponse && errorResponse.status === 400;

  const clearSuccsesResponse = () => {
    dispatch(removeSuccess());
    navigate('/login');
  };

  const repeatSendingUserData = () => {
    if (userData) {
      dispatch(authRegister(userData));
    }
  };

  return (
    <section className={styles.loginPage}>
      {isShowForm && <RegisterForm setUserData={setUserData} />}

      {isShowSuccessMessage && (
        <Message
          title='Регистрация успешна'
          text='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
          Component={
            <Button onClick={clearSuccsesResponse} size='large'>
              вход
            </Button>
          }
        />
      )}

      {isShowFailedMessage && (
        <Message
          title='Данные не сохранились'
          text='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
          Component={
            <Button onClick={repeatSendingUserData} size='large'>
              повторить
            </Button>
          }
        />
      )}
      {isShowInvalidEmailMessage && (
        <Message
          title='Данные не сохранились'
          text='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.'
          Component={
            <Button onClick={() => dispatch(removeError())} size='large'>
              Назад в регистрации
            </Button>
          }
        />
      )}
      {isLoading && <Loader />}
    </section>
  );
};
