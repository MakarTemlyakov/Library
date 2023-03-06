import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '../../button';

import styles from './registerform.module.css';

export const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { isValid, errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const textButton = step === 3 ? 'зарегистрироваться' : step === 2 ? 'последний шаг' : 'следующий шаг';

  const onHandleClick = () => {
    if (step >= 3) {
      setStep(1);
    } else {
      setStep(step + 1);
    }
  };
  const minlength = (value) => (value) => value.length >= 7;

  const biggerLatterWithNumber = (value) =>
    value
      .replaceAll(' ', '')
      .split('')
      .some((char) => char === char.toUpperCase() && !Number.isNaN(Number(char)));
  console.log(errors.password);

  useEffect(() => {
    setError('password', {
      types: {
        validate: { minlength: 'Пароль не менее 8 символов, с заглавной буквой и цифрой' },
      },
    });
  }, [setError]);

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
                required={true}
                {...register('login')}
              />
              <label className={styles.label} htmlFor='login'>
                Придумайте логин для входа
              </label>
              <span className={styles.help}>Используйте для логина латинский алфавит и цифры</span>
            </div>
            <div className={styles.group}>
              <input
                className={styles.input}
                type='password'
                id='password'
                name='password'
                required={true}
                {...register('password', {
                  validate: minlength,
                  onBlur: (e) => console.log(e.target.value),
                })}
              />
              <label className={styles.label} htmlFor='password'>
                Придумайте пароль для входа
              </label>
              <label className={styles.checkboxLabel} htmlFor='show-password'>
                <input className={styles.checkboxInput} type='checkbox' id='show-password' />
                <span className={styles.checkMark} />
                <span className={styles.correct} />
              </label>
              {errors.password &&
                errors.password.types &&
                errors.password.types.validate &&
                errors.password.types.validate.minlength && (
                  <span className={styles.help}>{errors.password.types.validate.minlength}</span>
                )}
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
