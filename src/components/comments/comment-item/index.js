import {memo} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import { formatDate } from '../../../utils/date-format';
import './style.css';

import CommentForm from '../comment-form';

function CommentItem({ comment, activeCommentId, newCommentId, isAuth, onAnswerClick, onCancelClick, onSendComment, onSignIn }) {
  const cn = bem('CommentItem');
  const MAX_LEVEL = 6;

  return (
    <li
      className={cn('',{'new': newCommentId === comment._id})}
      style={{marginLeft: `${(comment.level <= MAX_LEVEL ? comment.level : MAX_LEVEL) * 30}px`}}
    >
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
          activeCommentId={activeCommentId}
          activeCommentAuthor={comment.author.profile.name}
          onCancelClick={onCancelClick}
          onSendComment={onSendComment}
          onSignIn={onSignIn}
        />
      }
    </li>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object,
  activeCommentId: PropTypes.string,
  newCommentId: PropTypes.string,
  isAuth: PropTypes.bool.isRequired,
  onHandleAnswer: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSendComment: PropTypes.func,
  onSignIn: PropTypes.func,
}

CommentItem.defaultProps = {
  comment: {},
  activeCommentId: '',
  onHandleAnswer: () => {},
  onCancelClick: () => {},
  onSendComment: () => {},
  onSignIn: () => {},
}

export default memo(CommentItem);
