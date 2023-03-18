import { ResetPasswordForm } from '../../components/forms/resetpassword/resetpasswordform';

import styles from './resetpassword.module.css';

export const ResetPassword = ({ code }) => {
  const test = 1;

  return (
    <section>
      <ResetPasswordForm code={code} />
    </section>
  );
};
