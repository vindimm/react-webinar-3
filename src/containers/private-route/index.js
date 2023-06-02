import { memo } from "react";
import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function PrivateRoute({ children }) {

  const select = useSelector(state => ({
    status: state.login.status,
  }));

  if (select.status === 'noAuth') {
    return <Navigate to={'/login'}/>
  }

  return children;
} 

export default memo(PrivateRoute);
