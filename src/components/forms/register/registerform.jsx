import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { biggerLatterWithNumber, isEnStr, minLength } from '../../../utils/validation';
import { Button } from '../../button';

import styles from './registerform.module.css';

export const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [checked, setChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'all',
    defaultValues: {
      password: '',
    },
    shouldUseNativeValidation: true,
  });
  const onSubmit = (data) => console.log(data);
  const textButton = step === 3 ? 'зарегистрироваться' : step === 2 ? 'последний шаг' : 'следующий шаг';

  const onHandleClick = () => {
    if (step >= 3) {
      setStep(1);
    } else {
      setStep(step + 1);
    }
  };

  const isMinLengthError = errors.password?.type === 'minLength';
  const isBiggerLatterWithNumber = errors.password?.type === 'biggerLatterWithNumber';
  const idCorrectPassword = isDirty && !errors.password;
  const inputType = checked ? 'text' : 'password';

  const getFieldsByStep = (currentStep) => {
    switch (currentStep) {
      case 1: {
        return (
          <Fragment>
            <div className={styles.group}>
              <input
                className={styles.input}
                type='text'
                id='login'
                name='login'
                {...register('login', { required: true })}
              />
              <label className={styles.label} htmlFor='login'>
                Придумайте логин для входа
              </label>
              <span className={styles.help}>Используйте для логина латинский алфавит и цифры</span>
            </div>
            <div className={styles.group}>
              <input
                className={styles.input}
                type={inputType}
                id='password'
                name='password'
                {...register('password', {
                  validate: {
                    minLength,
                    biggerLatterWithNumber,
                  },
                  required: true,
                })}
              />
              <label className={styles.label} htmlFor='password'>
                Придумайте пароль для входа
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
                {idCorrectPassword && <span className={styles.correct} />}
              </label>

              <span className={styles.help}>
                Пароль <span className={isMinLengthError ? styles.error : null}>не менее 8 символов</span>,{' '}
                <span className={isBiggerLatterWithNumber ? styles.error : null}>с заглавной буквой</span> и цифрой
              </span>
            </div>
          </Fragment>
        );
      }

      case 2: {
        return (
          <Fragment>
            <div className={styles.group}>
              <input className={styles.input} type='text' id='firstName' name='firstName' required={true} />
              <label className={styles.label} htmlFor='firstName'>
                Имя
              </label>
            </div>
            <div className={styles.group}>
              <input className={styles.input} type='text' id='lastName' name='lastName' required={true} />
              <label className={styles.label} htmlFor='lastName'>
                Фамилия
              </label>
            </div>
          </Fragment>
        );
      }

      case 3: {
        return (
          <Fragment>
            <div className={styles.group}>
              <input className={styles.input} type='text' id='phone' name='phone' required={true} />
              <label className={styles.label} htmlFor='phone'>
                Номер телефона
              </label>
            </div>
            <div className={styles.group}>
              <input className={styles.input} type='text' id='email' name='email' required={true} />
              <label className={styles.label} htmlFor='email'>
                E-mail
              </label>
            </div>
          </Fragment>
        );
      }
      default:
        return null;
    }
  };

  return (
    <form id='register-form' className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.group}>
        <h2 className={styles.title}>Регистрация</h2>
        <strong className={styles.steps}>{step} шаг из 3</strong>
      </div>
      {getFieldsByStep(step)}
      <div className={`${styles.group} ${styles.button}`}>
        <Button size='large' onClick={onHandleClick}>
          {textButton}
        </Button>
        <div className={styles.groupLinks}>
          <Link to='#' className={styles.link}>
            Есть учётная запись?
          </Link>
          <Link to='#' className={`${styles.link} ${styles.exit}`}>
            войти
          </Link>
        </div>
      </div>
    </form>
  );
};
