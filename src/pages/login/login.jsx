import { RegisterForm } from '../../components/forms/register/registerform';

import styles from './login.module.css';

export const Login = () => {
  const data = 'dsad';

  return (
    <section className={styles.loginPage}>
      <h1 className={styles.title}>Cleverland</h1>
      <RegisterForm />
    </section>
  );
};
