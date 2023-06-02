import {memo, useRef} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginForm({onLogin, error}) {
  const cn = bem('LoginForm');
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      onLogin({login: loginRef.current.value, password: passwordRef.current.value});
    }
  }

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <form className={cn('form')} onSubmit={callbacks.onSubmit}>
        <label className={cn('label')}>
          Логин
          <input className={cn('input')} type="text" ref={loginRef} id="login"/>
        </label>
        <label className={cn('label')}>
          Пароль
          <input className={cn('input')} type="password" ref={passwordRef} id="password"/>
        </label>
        {Boolean(error) && <p className={cn('error')}>{error}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func,
  error: PropTypes.string
};

LoginForm.defaultProps = {
  onLogin: () => {},
  error: ''
}

export default memo(LoginForm);
