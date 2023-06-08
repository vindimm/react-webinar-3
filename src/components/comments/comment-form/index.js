import {memo} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentForm({ activeCommentId, isAuth, onCancelClick }) {
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

  return (
    <form className={cn('')} action="#" method="post">
      <fieldset className={cn('fieldset')}>
        <legend className={cn('legend')}>Новый {titleText}</legend>
        <textarea className={cn('textarea')} rows="4" placeholder="Текст"></textarea>
        <div className={cn('buttons')}>
          <button className={cn('submit')} type="submit">Отправить</button>
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
  activeCommentId: PropTypes.string,
}

CommentForm.defaultProps = {
  activeCommentId: '',
}

export default memo(CommentForm);
