import {React, Fragment, memo} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

import CommentItem from '../comment-item';

function CommentList({ comments, activeCommentId, isAuth, onAnswerClick, onCancelClick, onMessageChange, onSendComment }) {
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
            onMessageChange={onMessageChange}
            onSendComment={onSendComment}
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
  onMessageChange: PropTypes.func,
  onSendComment: PropTypes.func,
}

CommentList.defaultProps = {
  comments: [],
  activeCommentId: '',
  onHandleAnswer: () => {},
  onCancelClick: () => {},
  onMessageChange: () => {},
  onSendComment: () => {},
}

export default memo(CommentList);
