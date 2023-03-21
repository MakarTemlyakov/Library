import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/button';
import { ResetPasswordForm } from '../../components/forms/resetpassword/resetpasswordform';
import { Loader } from '../../components/loader/loader';
import { Message } from '../../components/message/message';
import { removeError, removeSuccess } from '../../components/slices/auth-slice';

import styles from './resetpassword.module.css';

export const ResetPassword = ({ code }) => {
  const { errorResponse, successResponse, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClearSuccessResponse = () => {
    dispatch(removeSuccess());
    navigate('/login');
  };

  const onClearErrorResponse = () => {
    dispatch(removeError());
  };

  return (
    <section>
      {code && !errorResponse && !successResponse && <ResetPasswordForm code={code} />}
      {isLoading && <Loader />}
      {successResponse && successResponse.status === 200 && (
        <Message
          text='Зайдите в личный кабинет, Используя свои логин и новый пароль'
          title='Новые данные сохранены'
          Component={
            <Button onClick={() => onClearSuccessResponse()} size='large'>
              вход
            </Button>
          }
        />
      )}
      {errorResponse && errorResponse.status !== 200 && (
        <Message
          text='Что-то пошло не так. Попробуйте ещё раз'
          title='Данные не сохранились'
          Component={
            <Button onClick={() => onClearErrorResponse()} size='large'>
              повторить
            </Button>
          }
        />
      )}
    </section>
  );
};
