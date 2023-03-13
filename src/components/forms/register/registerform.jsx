import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { isBiggerLatter, isCharNumber, isEmail, isPhone, minLength, strLatinAlphabet } from '../../../utils/validation';
import { Button } from '../../button';
import { Message } from '../../message/message';
import { Modal } from '../../modal/modal';
import { authRegister } from '../../slices/auth-slice';

import styles from './registerform.module.css';

const buttonText = {
  registration: 'зарегистрироваться',
  nextStep: 'следующий шаг',
  prevStep: 'последний шаг',
};

const validationTypes = {
  minLength: 'minLength',
  isBiggerLatter: 'isBiggerLatter',
  strLatinAlphabet: 'strLatinAlphabet',
  isCharNumber: 'isCharNumber',
  isPhone: 'isPhone',
};

const inputTypesState = {
  text: 'text',
  password: 'password',
};

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
      dirtyFields: { username = false, password = false, firstName = false, lastName = false },
    },
  } = useForm({
    mode: 'all',
    defaultValues: {
      password: '',
      username: '',
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
    },
    shouldUseNativeValidation: true,
  });

  const dispatch = useDispatch();
  const textButton = step === 3 ? buttonText.registration : step === 2 ? buttonText.prevStep : buttonText.nextStep;
  const isMinLengthError = errors.password?.type === validationTypes.minLength;
  const isBiggerLatterRule = errors.password?.type === validationTypes.isBiggerLatter;
  const idCorrectPassword = isDirty && !errors.password;
  const isCharLatinAlphabet = errors.username?.type === validationTypes.strLatinAlphabet;
  const isCharNumberRule = errors.username?.type === validationTypes.isCharNumber;
  const inputType = checked ? inputTypesState.text : inputTypesState.password;
  const isSubmitButtonType = textButton === buttonText.registration ? true : false;
  const isDisabled = isValid ? false : true;

  const onHandleClick = () => {
    if (step === 3) return;
    if (step >= 3) {
      setStep(1);
    } else {
      setStep(step + 1);
    }
  };

  const onSubmit = (formValues) => {
    const user = formValues;
    console.log({ onSubmit: user });
    dispatch(authRegister(user));
  };

  const getFieldsByStep = (currentStep) => {
    switch (currentStep) {
      case 1: {
        return (
          <Fragment>
            <div className={styles.group}>
              <input
                className={username && errors.username ? `${styles.input} ${styles.invalid}` : `${styles.input}`}
                type='text'
                id='username'
                name='username'
                {...register('username', {
                  validate: { isCharNumber, strLatinAlphabet },
                  required: true,
                })}
              />
              <label className={styles.label} htmlFor='username'>
                Придумайте логин для входа
              </label>
              <span className={isCharNumberRule ? `${styles.error} ${styles.help}` : `${styles.help}`}>
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
                    isCharNumber,
                    minLength,
                    isBiggerLatter,
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

              <span
                className={
                  errors.password?.type === validationTypes.isCharNumber
                    ? `${styles.help} ${styles.error}`
                    : styles.help
                }
              >
                Пароль <span className={isMinLengthError ? styles.error : null}>не менее 8 символов</span>,{' '}
                <span className={isBiggerLatterRule ? styles.error : null}>с заглавной буквой</span> и цифрой
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
                {...register('phone', { validate: { isPhone } })}
              />
              <label className={styles.label} htmlFor='phone'>
                Номер телефона
              </label>
              <span className={errors.phone ? `${styles.help} ${styles.error}` : `${styles.help}`}>
                В формате +375 (xx) xxx-xx-xx
              </span>
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
    <Modal>
      <form id='register-form' className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.group}>
          <h2 className={styles.title}>Регистрация</h2>
          <strong className={styles.steps}>{step} шаг из 3</strong>
        </div>
        {getFieldsByStep(step)}
        <div className={`${styles.group} ${styles.button}`}>
          <Button size='large' onClick={onHandleClick} isDisabled={isDisabled} isSubmit={isSubmitButtonType}>
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
    </Modal>
  );
};
