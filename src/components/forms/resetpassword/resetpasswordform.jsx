import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { isBiggerLatter, isCharNumber, minLength, strLatinAlphabet } from '../../../utils/validation';
import { Button } from '../../button';
import { resetPassword } from '../../slices/auth-slice';

import styles from './resetpasswordform.module.css';

const inputTypesState = {
  text: 'text',
  password: 'password',
};

const validationTypes = {
  minLength: 'minLength',
  isBiggerLatter: 'isBiggerLatter',
  strLatinAlphabet: 'strLatinAlphabet',
  isCharNumber: 'isCharNumber',
  isPhone: 'isPhone',
};

export const ResetPasswordForm = ({ code }) => {
  const [checked, setChecked] = useState({ newPassword: false, confirmPassword: false });
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: 'all',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },

    shouldUseNativeValidation: true,
  });

  const { newPassword, confirmPassword } = watch();
  const isCharNumberRule = errors.newPassword?.type === validationTypes.isCharNumber;
  const isMinLengthError = errors.newPassword?.type === validationTypes.minLength;
  const isBiggerLatterRule = errors.newPassword?.type === validationTypes.isBiggerLatter;
  const isMatchPasswords = newPassword === confirmPassword;

  const onChecked = (e) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  const onSubmit = (formValues) => {
    const credentials = {
      password: formValues.newPassword,
      passwordConfirmation: formValues.confirmPassword,
      code,
    };
    console.log({ f1: credentials });
    dispatch(resetPassword(credentials));
  };

  return (
    <form id='reset_password-form' className={styles.resetPasswordForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.group}>
        <h2 className={styles.title}>Восстановление пароля</h2>
      </div>
      <div className={styles.group}>
        <input
          className={styles.input}
          type={checked.newPassword ? 'text' : 'password'}
          id='newPassword'
          {...register('newPassword', { required: true, validate: { isCharNumber, minLength, isBiggerLatter } })}
        />
        <label className={styles.label} htmlFor='newPassword'>
          Новый пароль
        </label>
        <label className={styles.checkboxLabel}>
          <input
            className={styles.checkboxInput}
            type='checkbox'
            onChange={(e) => onChecked(e)}
            checked={checked.newPassword}
            name='newPassword'
          />
          <span className={styles.checkMark} />
        </label>
        <span className={isCharNumberRule ? `${styles.help} ${styles.error}` : styles.help}>
          Пароль <span className={isMinLengthError ? styles.error : null}>не менее 8 символов</span>,{' '}
          <span className={isBiggerLatterRule ? styles.error : null}>с заглавной буквой</span> и цифрой
        </span>
      </div>
      <div className={styles.group}>
        <input
          type={checked.confirmPassword ? 'text' : 'password'}
          className={
            dirtyFields.confirmPassword && !isMatchPasswords ? `${styles.input} ${styles.invalid}` : `${styles.input}`
          }
          id='confirmPassword'
          {...register('confirmPassword', { required: true })}
        />
        <label className={styles.label} htmlFor='confirmPassword'>
          Повторите пароль
        </label>
        <label className={styles.checkboxLabel}>
          <input
            className={styles.checkboxInput}
            type='checkbox'
            onChange={(e) => onChecked(e)}
            checked={checked.confirmPassword}
            name='confirmPassword'
          />
          <span className={styles.checkMark} />
        </label>

        {dirtyFields.confirmPassword && !isMatchPasswords && (
          <span className={`${styles.help} ${styles.error}`}>Пароли не совпадают</span>
        )}
      </div>
      <div className={`${styles.group} ${styles.button}`}>
        <Button size='large' isSubmit={true}>
          Сохранить изменения
        </Button>
        <p className={styles.helpText}>После сохранения войдите в библиотеку, Ииспользуя новый пароль</p>
      </div>
    </form>
  );
};
