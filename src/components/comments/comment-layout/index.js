import {memo} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

import CommentForm from "../comment-form";

function CommentLayout({ count, isAuth, children }) {
  const cn = bem('CommentLayout');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Комментарии ({count})</h2>
      {children}
      <CommentForm isAuth={isAuth} />
    </div>
  );
}

CommentLayout.propTypes = {
  count: PropTypes.number,
  isAuth: PropTypes.bool,
}

CommentLayout.defaultProps = {
  count: 0,
  isAuth: false,
}

export default memo(CommentLayout);
