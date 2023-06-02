import {memo} from 'react';
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../containers/login-menu";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import ProfileCard from "../../components/profile-card";

function Profile() {

  const select = useSelector(state => ({
    user: state.login.user,
  }));

  return (
    <PageLayout>
      <LoginMenu/>
      <Head title={'Магазин'}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileCard user={select.user}/>
    </PageLayout>
  );
}

export default memo(Profile);
