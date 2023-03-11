import cn from 'classnames';

import styles from './button.module.css';

export function Button({ children, color = 'primary', size, className, isDisabled, onClick, isSubmit }) {
  const styleClass = cn(
    {
      [styles.secondary]: color === 'secondary',
      [styles.large]: size === 'large',
      [styles.small]: size === 'small',
      [styles.primary]: color === 'primary',
    },
    className
  );

  return (
    <button className={styleClass} type={isSubmit ? 'submit' : 'button'} disabled={isDisabled} onClick={onClick}>
      {children}
    </button>
  );
}
