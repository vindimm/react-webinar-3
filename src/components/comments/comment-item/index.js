import {memo} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import { formatDate } from '../../../utils/date-format';
import './style.css';

import CommentForm from '../comment-form';

function CommentItem({ comment, message, activeCommentId, isAuth, onAnswerClick, onCancelClick, onMessageChange, onSendComment }) {
  const cn = bem('CommentItem');
  const MAX_LEVEL = 6;

  return (
    <li className={cn()} style={{marginLeft: `${(comment.level <= MAX_LEVEL ? comment.level : MAX_LEVEL) * 30}px`}}>
      <div className={cn('info')}>
        <span className={cn('user')}>{comment.author.profile.name}</span>
        <span className={cn('created')}>{formatDate(comment.dateCreate)}</span>
      </div>
      <p className={cn('text')}>{comment.text}</p>
      <button className={cn('answer')} onClick={() => onAnswerClick(comment._id)}>Ответить</button>
      {
        activeCommentId === comment._id &&
        <CommentForm
          isAuth={isAuth}
          message={message}
          activeCommentId={activeCommentId}
          activeCommentAuthor={comment.author.profile.name}
          onCancelClick={onCancelClick}
          onMessageChange={onMessageChange}
          onSendComment={onSendComment}
        />
      }
    </li>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object,
  message: PropTypes.string,
  activeCommentId: PropTypes.string,
  isAuth: PropTypes.bool.isRequired,
  onHandleAnswer: PropTypes.func,
  onCancelClick: PropTypes.func,
  onMessageChange: PropTypes.func,
  onSendComment: PropTypes.func,
}

CommentItem.defaultProps = {
  comment: {},
  activeCommentId: '',
  onHandleAnswer: () => {},
  onCancelClick: () => {},
  onMessageChange: () => {},
  onSendComment: () => {},
}

export default memo(CommentItem);
