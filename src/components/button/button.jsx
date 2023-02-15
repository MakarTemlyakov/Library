import cn from 'classnames';

import styles from './button.module.css';

export function Button({ children, color = 'primary', size, className, isDisabled }) {
  const styleClass = cn(
    {
      [styles.secondary]: color === 'secondary',
      [styles.large]: size === 'large',
      [styles.small]: size === 'small',
      [styles.primary]: color === 'primary',
    },
    className
  );
  console.log(className);

  return (
    <button className={styleClass} type='button' disabled={isDisabled}>
      {children}
    </button>
  );
}
