import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button } from '../../button';
import { Modal } from '../../modal/modal';
import { signIn } from '../../slices/auth-slice';

import styles from './loginform.module.css';

const inputTypesState = {
  text: 'text',
  password: 'password',
};

export const LoginForm = ({ setUserData }) => {
  const [checked, setChecked] = useState(false);
  const { errorResponse } = useSelector((state) => state.auth);
  const isInvalidCredentials = errorResponse && errorResponse.status === 400;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      dirtyFields: { username = false, password = false, firstName = false, lastName = false },
    },
  } = useForm({
    mode: 'all',
    defaultValues: {
      password: '',
      username: '',
    },
    shouldUseNativeValidation: true,
  });

  const onSubmit = (formValues) => {
    const user = formValues;

    setUserData(user);

    dispatch(signIn(user));
  };

  const inputType = checked ? inputTypesState.text : inputTypesState.password;

  return (
    <Modal>
      <form id='register-form' className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.group}>
          <h2 className={styles.title}>Вход в личный кабинет </h2>
        </div>
        <div className={styles.group}>
          <input
            className={isInvalidCredentials ? `${styles.input} ${styles.invalid}` : `${styles.input}`}
            type='text'
            id='username'
            name='username'
            {...register('username', { required: true })}
          />
          <label className={styles.label} htmlFor='username'>
            Логин
          </label>
        </div>
        <div className={styles.group}>
          <input
            className={isInvalidCredentials ? `${styles.input} ${styles.invalid}` : `${styles.input}`}
            type={inputType}
            id='password'
            name='password'
            {...register('password', { required: true })}
          />
          <label className={styles.label} htmlFor='password'>
            Пароль
          </label>
          <label className={styles.checkboxLabel} htmlFor='show-password'>
            <input
              className={styles.checkboxInput}
              type='checkbox'
              id='show-password'
              onChange={() => setChecked(!checked)}
              checked={checked}
            />
            <span className={styles.checkMark} />
          </label>
          <div className={styles.forgetPassword}>
            {isInvalidCredentials ? (
              <Fragment>
                <span className={`${styles.help} ${styles.error}`}>Неверный логин или пароль!</span>
                <Link to='/forgot-pass' className={styles.help}>
                  Восстановить?
                </Link>
              </Fragment>
            ) : (
              <span className={styles.help}>Забыли логин или пароль?</span>
            )}
          </div>
        </div>
        <div className={`${styles.group} ${styles.button}`}>
          <Button size='large' isSubmit={true}>
            Вход
          </Button>
          <div className={styles.groupLinks}>
            <span className={styles.link}>Нет учётной записи?</span>
            <Link to='/register' className={`${styles.link} ${styles.exit}`}>
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </Modal>
  );
};
