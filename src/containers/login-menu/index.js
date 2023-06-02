import {memo, useCallback} from "react";
import PropTypes from 'prop-types';
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import {cn as bem} from '@bem-react/classname';
import LoginTools from "../../components/login-tools";
import SideLayout from "../../components/side-layout";

function LoginMenu() {
  const cn = bem('LoginMenu');
  const store = useStore();
  
  const select = useSelector(state => ({
    status: state.login.status,
    userName: state.login?.user?.username,
    waiting: state.login?.waiting,
  }));

  const callbacks = {
    logout: useCallback(() => store.actions.login.logout(), [store]),
  }

  return (
    <SideLayout padding="small" side="end">
      <LoginTools
        isAuth={select.status === 'auth'}
        userName={select.userName}
        address={'/login'}
        waiting={select.waiting}
        onLogout={callbacks.logout}
      />
    </SideLayout>
  )
} 

export default memo(LoginMenu);
