import {memo} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import { formatDate } from '../../../utils/date-format';
import './style.css';

function CommentItem({ userName, created, text }) {
  const cn = bem('CommentItem');
  
  return (
    <li className={cn()}>
      <div className={cn('info')}>
        <span className={cn('user')}><b>{userName}</b></span>
        <span className={cn('created')}>{formatDate(created)}</span>
      </div>
      <p className={cn('text')}>{text}</p>
      <button className={cn('answer')}>Ответить</button>
    </li>
  );
}

CommentItem.propTypes = {
  userName: PropTypes.string,
  created: PropTypes.string,
  text: PropTypes.string,
}

CommentItem.defaultProps = {
  userName: '',
  created: '',
  text: '',
}

export default memo(CommentItem);
