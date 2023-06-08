import {memo} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentLayout({ count, children }) {
  const cn = bem('CommentLayout');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Комментарии ({count})</h2>
      {children}
    </div>
  );
}

CommentLayout.propTypes = {
  count: PropTypes.number,
}

CommentLayout.defaultProps = {
  count: 0,
}

export default memo(CommentLayout);
