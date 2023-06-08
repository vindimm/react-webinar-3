import {memo} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import { formatDate } from '../../../utils/date-format';
import './style.css';

import CommentForm from '../comment-form';

function CommentItem({ comment, activeCommentId, isAuth, onAnswerClick, onCancelClick }) {
  const cn = bem('CommentItem');
  
  return (
    <li className={cn()}>
      <div className={cn('info')}>
        <span className={cn('user')}>{comment.author.profile.name}</span>
        <span className={cn('created')}>{formatDate(comment.dateCreate)}</span>
      </div>
      <p className={cn('text')}>{comment.text}</p>
      <button className={cn('answer')} onClick={() => onAnswerClick(comment._id)}>Ответить</button>
      {
        activeCommentId === comment._id &&
        <CommentForm isAuth={isAuth} activeCommentId={activeCommentId} onCancelClick={onCancelClick} />
      }
    </li>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object,
  activeCommentId: PropTypes.string,
  isAuth: PropTypes.bool.isRequired,
  onHandleAnswer: PropTypes.func,
  onCancelClick: PropTypes.func,
}

CommentItem.defaultProps = {
  comment: {},
  activeCommentId: '',
  onHandleAnswer: () => {},
  onCancelClick: () => {},
}

export default memo(CommentItem);
