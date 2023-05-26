import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { AppRoute } from "../../const";

const dictionary = {
  rus: {
    main: 'Главная',
  },
  eng: {
    main: 'Main',
  }
}

function Navigation({address, lang}) {
  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <Link to={address} className={cn('home')}>{dictionary[lang].main}</Link>
    </div>
  );
}

Navigation.propTypes = {
  address: PropTypes.string,
  lang: PropTypes.oneOf(['rus', 'eng']),
};

Navigation.defaultProps = {
  address: AppRoute.Main,
  lang: 'rus',
}

export default memo(Navigation);
