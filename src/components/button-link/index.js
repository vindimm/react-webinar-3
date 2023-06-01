import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ButtonLink({title, address, t}) {
  const cn = bem('ButtonLink');
  return (
    <Link className={cn('')} to={address}>{title}</Link>    
  );
}

ButtonLink.propTypes = {
  address: PropTypes.string,
  title: PropTypes.string,
};

export default memo(ButtonLink);
