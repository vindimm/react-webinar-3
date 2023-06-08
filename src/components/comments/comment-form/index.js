import {memo} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentForm({ isAuth }) {
  const cn = bem('CommentForm');

  if (!isAuth) {
    return (
      <div className={cn('')}>
        <Link className={cn('link')} to={'/login'}>Войдите</Link>, чтобы иметь возможность комментировать
      </div>
    )
  }

  return (
    <form className={cn('form')} action="#" method="post">
      <fieldset className={cn('fieldset')}>
        <legend className={cn('legend')}><b>Новый комментарий</b></legend>
        <textarea className={cn('textarea')} rows="4" placeholder="Текст"></textarea>
        <button className={cn('submit')} type="submit">Отправить</button>
      </fieldset>
    </form>
  );
}

CommentForm.propTypes = {
  isAuth: PropTypes.bool.isRequired,
}

CommentForm.defaultProps = {
}

export default memo(CommentForm);
