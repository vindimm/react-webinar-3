import {memo} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentForm({ activeCommentId, activeCommentAuthor, isAuth, message, onCancelClick, onMessageChange, onSendComment }) {
  const cn = bem('CommentForm');
  
  if (!isAuth) {
    const actionText = Boolean(activeCommentId) ? 'комментировать' : 'ответить';

    return (
      <div className={cn('stub')}>
        <Link className={cn('login')} to={'/login'}>Войдите</Link>, чтобы иметь возможность {actionText}
        {
          activeCommentId &&
          <button className={cn('cancelLink')} type="button" onClick={onCancelClick}>Отмена</button>
        }
      </div>
    )
  }

  const titleText = activeCommentId ? 'ответ' : 'комментарий';
  const placeholderText = activeCommentId ? `Мой ответ для ${activeCommentAuthor}` : 'Текст';

  return (
    <form
      className={cn('')}
      action="#"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        onSendComment();
      }}
    >
      <fieldset className={cn('fieldset')}>
        <legend className={cn('legend')}>Новый {titleText}</legend>
        <textarea
          className={cn('textarea')}
          rows="5"
          placeholder={placeholderText}
          value={message}
          onChange={(evt) => onMessageChange(evt.target.value)}
        >
        </textarea>
        <div className={cn('buttons')}>
          <button className={cn('submit')} type="submit" disabled={!message?.trim()}>Отправить</button>
          {
            activeCommentId &&
            <button className={cn('cancelButton')} type="button" onClick={onCancelClick}>Отмена</button>
          }
        </div>
      </fieldset>
    </form>
  );
}

CommentForm.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  message: PropTypes.string,
  activeCommentId: PropTypes.string,
  activeCommentAuthor: PropTypes.string,
  onCancelClick: PropTypes.func,
  onMessageChange: PropTypes.func,
  onSendComment: PropTypes.func,
}

CommentForm.defaultProps = {
  activeCommentId: '',
  activeCommentAuthor: '',
  onCancelClick: () => {},
  onMessageChange: () => {},
  onSendComment: () => {},
}

export default memo(CommentForm);
