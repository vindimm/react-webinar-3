import {memo} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

import CommentItem from '../comment-item';

function CommentList({ comments }) {
  const cn = bem('CommentList');

  return (
    <ul className={cn()}>
      {comments.map((item) => {
        return <CommentItem userName={item.author._id} created={item.dateCreate} text={item.text} key={item._id} />
      })}
    </ul>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array,
}

CommentList.defaultProps = {
  comments: [],
}

export default memo(CommentList);
