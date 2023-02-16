import { Link } from 'react-router-dom';

import { FaceBookIcon } from '../icons/social/face-book-icon';
import { InstagramIcon } from '../icons/social/instagram-icon';
import { LinkedinIcon } from '../icons/social/linkedin-icon';
import { VkIcon } from '../icons/social/vk-icon';

import styles from './footer.module.css';

const socialIcons = [
  { id: 0, iconComponent: <FaceBookIcon /> },
  { id: 1, iconComponent: <InstagramIcon /> },
  { id: 2, iconComponent: <VkIcon /> },
  { id: 3, iconComponent: <LinkedinIcon /> },
];

export const Footer = () => (
  <footer className={styles.footer} data-test-id='footer'>
    <div className='container'>
      <div className={styles.rowWrapper}>
        <p className={styles.copyRight}>© 2020-2023 Cleverland. Все права защищены.</p>
        <ul className={styles.social}>
          {socialIcons.map((socialItem) => (
            <li key={socialItem.id} className={styles.socialItem}>
              <Link className={styles.socialLink} to='#'>
                {socialItem.iconComponent}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);
