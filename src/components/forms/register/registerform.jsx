import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { biggerLatterWithNumber, charNumber, isEmail, minLength, strLatinAlphabet } from '../../../utils/validation';
import { Button } from '../../button';

import styles from './registerform.module.css';

export const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [checked, setChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      isValid,
      dirtyFields: { login = false, password = false, firstName = false, lastName = false },
    },
  } = useForm({
    mode: 'all',
    defaultValues: {
      password: '',
      login: '',
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
    },
    shouldUseNativeValidation: true,
  });
  const onSubmit = (formValues) => console.log(formValues);
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
  const isCharLatinAlphabet = errors.login?.type === 'strLatinAlphabet';
  const isCharNumber = errors.login?.type === 'charNumber';
  const inputType = checked ? 'text' : 'password';
  const getFieldsByStep = (currentStep) => {
    switch (currentStep) {
      case 1: {
        return (
          <Fragment>
            <div className={styles.group}>
              <input
                className={login && errors.login ? `${styles.input} ${styles.invalid}` : `${styles.input}`}
                type='text'
                id='login'
                name='login'
                {...register('login', {
                  validate: { charNumber, strLatinAlphabet },
                  required: true,
                })}
              />
              <label className={styles.label} htmlFor='login'>
                Придумайте логин для входа
              </label>
              <span className={isCharNumber ? `${styles.error} ${styles.help}` : `${styles.help}`}>
                Используйте для логина{' '}
                <span className={isCharLatinAlphabet ? styles.error : null}>латинский алфавит</span> и цифры
              </span>
            </div>
            <div className={styles.group}>
              <input
                className={password && errors.password ? `${styles.input} ${styles.invalid}` : `${styles.input}`}
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
              <input
                className={errors.firstName ? `${styles.input} ${styles.invalid}` : `${styles.input}`}
                type='text'
                id='firstName'
                name='firstName'
                {...register('firstName', { required: 'Поле не может быть пустым' })}
              />
              <label className={styles.label} htmlFor='firstName'>
                Имя
              </label>
              {errors.firstName && <span className={`${styles.help} ${styles.error}`}>{errors.firstName.message}</span>}
            </div>
            <div className={styles.group}>
              <input
                className={errors.lastName ? `${styles.input} ${styles.invalid}` : `${styles.input}`}
                type='text'
                id='lastName'
                name='lastName'
                {...register('lastName', { required: 'Поле не может быть пустым' })}
              />
              <label className={styles.label} htmlFor='lastName'>
                Фамилия
              </label>
              {errors.lastName && <span className={`${styles.help} ${styles.error}`}>{errors.lastName.message}</span>}
            </div>
          </Fragment>
        );
      }

      case 3: {
        return (
          <Fragment>
            <div className={styles.group}>
              <input
                className={styles.input}
                type='text'
                id='phone'
                name='phone'
                {...register('phone', { required: 'Поле не может быть пустым' })}
              />
              <label className={styles.label} htmlFor='phone'>
                Номер телефона
              </label>
              <span className={styles.help}>В формате +375 (xx) xxx-xx-xx</span>
            </div>
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
              {errors.email && <span className={`${styles.help} ${styles.error}`}>Введите корректный e-mail</span>}
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
        {textButton === 'зарегистрироваться' ? (
          <Button size='large' onClick={onHandleClick} isDisabled={isValid ? false : true} isSubmit={true}>
            {textButton}
          </Button>
        ) : (
          <Button size='large' onClick={onHandleClick} isDisabled={isValid ? false : true} isSubmit={true}>
            {textButton}
          </Button>
        )}
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
