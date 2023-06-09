import {React, memo} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

import CommentItem from '../comment-item';

function CommentList({ comments, activeCommentId, isAuth, onAnswerClick, onCancelClick, onSendComment, onSignIn }) {
  const cn = bem('CommentList');
  
  return (
    <ul className={cn()}>
      {comments.map((item) => {
        return (
          <CommentItem
            comment={item}
            activeCommentId={activeCommentId}
            key={item._id}
            isAuth={isAuth}
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
  isAuth: PropTypes.bool.isRequired,
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
