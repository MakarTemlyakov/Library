import classNames from 'classnames';
import styles from './tilebutton.module.css';

export const TileButton = ({ selectedTypeView, onChangeType, isActiveSearch }) => {
  const activeClass = classNames(styles.viewTypeTileButton, {
    [styles.hiddenButton]: isActiveSearch,
    [styles.activeView]: selectedTypeView === 0,
  });

  return (
    <button
      className={activeClass}
      type='button'
      onClick={() => onChangeType(0)}
      data-test-id='button-menu-view-window'
    >
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M1.52273 0.875C1.165 0.875 0.875 1.165 0.875 1.52273V6.70455C0.875 7.06228 1.165 7.35227 1.52273 7.35227H6.70455C7.06228 7.35227 7.35227 7.06228 7.35227 6.70455V1.52273C7.35227 1.165 7.06228 0.875 6.70455 0.875H1.52273ZM2.17045 6.05682V2.17045H6.05682V6.05682H2.17045ZM9.29545 0.875C8.93772 0.875 8.64773 1.165 8.64773 1.52273V6.70455C8.64773 7.06228 8.93772 7.35227 9.29545 7.35227H14.4773C14.835 7.35227 15.125 7.06228 15.125 6.70455V1.52273C15.125 1.165 14.835 0.875 14.4773 0.875H9.29545ZM9.94318 6.05682V2.17045H13.8295V6.05682H9.94318ZM0.875 9.29545C0.875 8.93772 1.165 8.64773 1.52273 8.64773H6.70455C7.06228 8.64773 7.35227 8.93772 7.35227 9.29545V14.4773C7.35227 14.835 7.06228 15.125 6.70455 15.125H1.52273C1.165 15.125 0.875 14.835 0.875 14.4773V9.29545ZM2.17045 9.94318V13.8295H6.05682V9.94318H2.17045ZM9.29545 8.64773C8.93772 8.64773 8.64773 8.93772 8.64773 9.29545V14.4773C8.64773 14.835 8.93772 15.125 9.29545 15.125H14.4773C14.835 15.125 15.125 14.835 15.125 14.4773V9.29545C15.125 8.93772 14.835 8.64773 14.4773 8.64773H9.29545ZM9.94318 13.8295V9.94318H13.8295V13.8295H9.94318Z'
          fill='white'
        />
      </svg>
      <span className={styles.visuallyHidden}>Вариант просмотра - Плитка</span>
    </button>
  );
};
