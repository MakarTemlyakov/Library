import { useState } from 'react';

import userAvatar from '../../assets/img/comment_user-avatar.png';
import { StarIcon } from '../icons/star/star-icon';

import styles from './comment.module.css';

export const Comment = () => {
  const [isShowCommentMode, setCommentMode] = useState(false);

  return (
    <div className={styles.comment} data-test-id='comment'>
      <div className={styles.commentAuthorInfo}>
        <img className={styles.commentAuthorAvatar} src={userAvatar} alt='' />
        <span>Иван Иванов</span>
        <span className={styles.commentDate}>
          <time>5 января 2019</time>
        </span>
      </div>
      <ul className={styles.ratingStars}>
        <li>
          <StarIcon isReview={true} />
        </li>
        <li>
          <StarIcon isReview={true} />
        </li>
        <li>
          <StarIcon isReview={true} />
        </li>
        <li>
          <StarIcon isReview={true} />
        </li>
        <li>
          <StarIcon />
        </li>
      </ul>
      <p className={styles.commentDescription}>
        Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не оставляет шанса
        для анализа существующих паттернов поведения. Для современного мира внедрение современных методик предоставляет
        широкие возможности для позиций, занимаемых участниками в отношении поставленных задач. Как уже неоднократно
        упомянуто, сделанные на базе интернет-аналитики выводы будут в равной степени предоставлены сами себе. Вот вам
        яркий пример современных тенденций — глубокий уровень погружения создаёт предпосылки для своевременного
        выполнения сверхзадачи. И нет сомнений, что акционеры крупнейших компаний, инициированные исключительно
        синтетически, превращены в посмешище, хотя само их существование приносит несомненную пользу обществу.
      </p>
    </div>
  );
};
