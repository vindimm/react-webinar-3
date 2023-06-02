import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginTools({isAuth, userName, address, waiting, onLogout}) {
  const cn = bem('LoginTools');

  return (
    <div className={cn()}>
      {(!isAuth && !waiting) &&
        <Link className={cn('button')} to={address}>Вход</Link>
      }
      {(isAuth && !waiting) &&
        <>
          <Link className={cn('link')} to={'/profile'}>{userName}</Link>
          <button className={cn('button')} onClick={onLogout}>Выход</button>
        </>
      }
    </div>
  )
}

LoginTools.propTypes = {
  isAuth: PropTypes.bool,
  userName: PropTypes.string,
  address: PropTypes.string,
};

export default memo(LoginTools);
