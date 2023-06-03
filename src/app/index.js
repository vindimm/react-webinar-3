import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";
import {Routes, Route, Navigate} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import PrivateRoute from "../containers/private-route";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);

  useInit(() => {
    store.actions.login.checkAuth();
  }, [], true);

  return (
    <>
      <Routes>
        <Route index element={<Navigate to={'/page/1'}/>}/>
        <Route path={'/page/:id'} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={<PrivateRoute address={'/login'}><Profile/></PrivateRoute>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
