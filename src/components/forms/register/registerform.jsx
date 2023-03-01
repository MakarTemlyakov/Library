import { Link } from 'react-router-dom';

import { Button } from '../../button';

import styles from './registerform.module.css';

export const RegisterForm = () => {
  let data;

  return (
    <form id='register-form' className={styles.registerForm}>
      <div className={styles.group}>
        <h2 className={styles.title}>Регистрация</h2>
        <strong className={styles.steps}>1 шаг из 3</strong>
      </div>
      <div className={styles.group}>
        <input className={styles.input} type='text' placeholder='Придумайте логин для входа' />
        <span className={styles.help}>Используйте для логина латинский алфавит и цифры</span>
      </div>
      <div className={styles.group}>
        <input className={styles.input} type='text' placeholder='Пароль' />
        <span className={styles.help}>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>
      </div>
      <div className={styles.group}>
        <Button size='large'>следующий шаг</Button>
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
