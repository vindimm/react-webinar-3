import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard({user}) {
  const cn = bem('ProfileCard');
 
  return (
    <div className={cn()}>
      <h1 className={cn('title')}>Профиль</h1>
      <div className={cn('line')}>
        <span className={cn('label')}>Имя: </span>
        <b className={cn('value')}>{user?.profile.name}</b>
      </div>
      <div className={cn('line')}>
        <span className={cn('label')}>Телефон: </span>
        <b className={cn('value')}>{user?.profile.phone}</b>
      </div>
      <div className={cn('line')}>
        <span className={cn('label')}>email: </span>
        <b className={cn('value')}>{user?.email}</b>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.object
};

export default memo(ProfileCard);
