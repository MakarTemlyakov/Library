import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
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
            className={username && errors.username ? `${styles.input} ${styles.invalid}` : `${styles.input}`}
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
            className={password && errors.password ? `${styles.input} ${styles.invalid}` : `${styles.input}`}
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
            {errors.password ? (
              <Fragment>
                <span className={`${styles.help} ${styles.error}`}>Неверный логин или пароль!</span>
                <span className={styles.help}>Восстановить?</span>
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
            <Link to='#' className={styles.link}>
              Нет учётной записи?
            </Link>
            <Link to='/register' className={`${styles.link} ${styles.exit}`}>
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </Modal>
  );
};

/* <Message
  text='Что-то пошло не так. Попробуйте ещё раз'
  title='Вход не выполнен'
  Component={
    <Button size='large' onClick={handleSubmit(onSubmit)}>
      повторить
    </Button>
  }
/>; */
