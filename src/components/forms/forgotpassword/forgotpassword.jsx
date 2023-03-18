import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import { isEmail } from '../../../utils/validation';
import { Button } from '../../button';
import { forgotPassword } from '../../slices/auth-slice';

import styles from './forgotpasswordform.module.css';

export const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const { errorResponse } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
    },
    shouldUseNativeValidation: true,
  });

  const onSubmit = (formValues) => {
    dispatch(forgotPassword(formValues.email));
  };

  return (
    <form id='forget_password-form' className={styles.forgetPasswordForm} onSubmit={handleSubmit(onSubmit)}>
      <header className={styles.header}>
        <Link className={styles.linkToBack} to='/login'>
          <span className={styles.iconToBack}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M9 6L3 12M3 12L9 18M3 12H21'
                stroke='#BFC4C9'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>
          <p className={styles.backToText}>Вход в личный кабинет</p>
        </Link>
      </header>
      <div className={styles.body}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <div className={styles.group}>
          <input
            className={errors.email ? `${styles.input} ${styles.invalid}` : `${styles.input}`}
            type='text'
            id='email'
            name='email'
            {...register('email', { validate: { isEmail } })}
          />
          <label className={styles.label} htmlFor='email'>
            E-mail
          </label>
          {errors.email ? (
            <span className={`${styles.help} ${styles.error}`}>Введите корректный e-mail</span>
          ) : errorResponse ? (
            <span className={`${styles.help} ${styles.error}`}>errr</span>
          ) : (
            <span className={styles.help}>
              На это email будет отправлено письмо с инструкциями по восстановлению пароля
            </span>
          )}
        </div>
        <div className={`${styles.group} ${styles.button}`}>
          <Button size='large' isSubmit={true}>
            восстановить
          </Button>
          <div className={styles.groupLinks}>
            <span className={styles.question}>Нет учётной записи?</span>
            <Link to='/register' className={`${styles.link} ${styles.exit}`}>
              Регистрация
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};
