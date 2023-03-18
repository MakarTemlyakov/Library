import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ForgotPasswordForm } from '../../components/forms/forgotpassword/forgotpassword';
import { Message } from '../../components/message/message';
import { ResetPassword } from '../resetpassword/resetpassword';

import styles from './forgotpassword.module.css';

export const ForgotPassword = () => {
  const { isSuccess } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();

  if (searchParams.get('code')) {
    const code = searchParams.get('code');

    return <ResetPassword code={code} />;
  }

  return (
    <section>
      {isSuccess ? (
        <Message
          title='Письмо выслано'
          text='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
        />
      ) : (
        <ForgotPasswordForm />
      )}
    </section>
  );
};
