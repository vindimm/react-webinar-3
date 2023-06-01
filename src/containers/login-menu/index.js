import {memo} from "react";
import PropTypes from 'prop-types';
import useSelector from "../../hooks/use-selector";
import {cn as bem} from '@bem-react/classname';
import LoginTools from "../../components/login-tools";
import SideLayout from "../../components/side-layout";

function LoginMenu() {
  const cn = bem('LoginMenu');

  const select = useSelector(state => ({
    status: state.login.status,
    userName: state.login?.user?.username,
  }));

  return (
    <SideLayout padding="medium" side="end">
      <LoginTools
        isAuth={select.status === 'auth'}
        userName={select.userName}
        address={'/login'}
      />
    </SideLayout>
  )
}

export default memo(LoginMenu);
