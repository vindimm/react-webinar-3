import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../containers/login-menu";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LoginForm from "../../components/login-form";

function Login() {
  const store = useStore();

  const {t} = useTranslate();

  const callbacks = {
    // Авторизация
    login: useCallback((data) => store.actions.login.login(data), [store]),
  }

  return (
    <PageLayout>
      <LoginMenu/>
      <Head title={'Магазин'}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm onLogin={callbacks.login}/>
    </PageLayout>
  );
}

export default memo(Login);
