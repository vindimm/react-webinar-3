import {memo} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from '../../containers/login-menu';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";

function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.categories.load();
    store.actions.catalog.initParams();
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <LoginMenu/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
