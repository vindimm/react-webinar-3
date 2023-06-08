import {memo} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentItem({ userName, created, text }) {
  const cn = bem('Comment');
  
  return (
    <li className={cn()}>
      <div className={cn('info')}>
        <span className={cn('user')}>{userName}</span>
        <span className={cn('created')}>{created}</span>
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
