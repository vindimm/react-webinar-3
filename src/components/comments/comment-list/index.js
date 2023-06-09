import {React, memo} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

import CommentItem from '../comment-item';

function CommentList({ comments, activeCommentId, newCommentId, userId, onAnswerClick, onCancelClick, onSendComment, onSignIn }) {
  const cn = bem('CommentList');
  // Находим индекс последнего прямого потомка для комментария, на который отвечаем.
  const lastChildCommentIndex = comments.findLastIndex((comment) => comment.parent._id === activeCommentId);
  // id комментария, под которым показываем форму ответа (последний из дочерних у activeComment)
  const lastChildCommentId = lastChildCommentIndex === -1 ? activeCommentId : comments[lastChildCommentIndex]?._id;

  return (
    <ul className={cn()}>
      {comments.map((item) => {
        return (
          <CommentItem
            comment={item}
            activeCommentId={activeCommentId}
            lastChildCommentId={lastChildCommentId}
            newCommentId={newCommentId}
            key={item._id}
            userId={userId}
            onAnswerClick={onAnswerClick}
            onCancelClick={onCancelClick}
            onSendComment={onSendComment}
            onSignIn={onSignIn}
          />
        )
      })}
    </ul>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array,
  activeCommentId: PropTypes.string,
  newCommentId: PropTypes.string,
  userId: PropTypes.string,
  onHandleAnswer: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSendComment: PropTypes.func,
  onSignIn: PropTypes.func,
}

CommentList.defaultProps = {
  comments: [],
  activeCommentId: '',
  onHandleAnswer: () => {},
  onCancelClick: () => {},
  onSendComment: () => {},
  onSignIn: () => {},
}

export default memo(CommentList);
