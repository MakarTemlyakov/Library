import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../components/button';
import { RegisterForm } from '../../components/forms/register/registerform';
import { Loader } from '../../components/loader/loader';
import { Message } from '../../components/message/message';
import { Modal } from '../../components/modal/modal';
import { removeError } from '../../components/slices/auth-slice';

import styles from './register.module.css';

export const Register = () => {
  const { isLoading, errorResponse } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log({ errorResponse });

  return (
    <section className={styles.loginPage}>
      <h1 className={styles.title}>Cleverland</h1>
      {!errorResponse && <RegisterForm />}

      {errorResponse && errorResponse.status === 400 && (
        <Modal>
          <Message
            title='Данные не сохранились'
            text='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.'
            Component={
              <Button onClick={() => dispatch(removeError())} size='large'>
                Назад в регистрации
              </Button>
            }
          />
        </Modal>
      )}
      {errorResponse && errorResponse.status === 200 && (
        <Modal>
          <Message
            title='Регистрация успешна'
            text='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
            Component={
              <Button onClick={() => console.log('sending')} size='large'>
                вход
              </Button>
            }
          />
        </Modal>
      )}

      {errorResponse && errorResponse.status !== 400 && (
        <Modal>
          <Message
            title='Данные не сохранились'
            text='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
            Component={
              <Button onClick={() => console.log('sending')} size='large'>
                повторить
              </Button>
            }
          />
        </Modal>
      )}
    </section>
  );
};
