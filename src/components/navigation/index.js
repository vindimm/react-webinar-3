import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { AppRoute } from "../../const";

function Navigation() {
  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <Link to={AppRoute.Main} className={cn('home')}>Главная</Link>
    </div>
  );
}

export default memo(Navigation);
