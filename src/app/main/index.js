import {memo} from 'react';
import {useParams} from 'react-router-dom';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";

import Navigation from "../../containers/navigation";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from '../../containers/login-menu';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";

function Main() {

  const store = useStore();
  const {id} = useParams();
  const pageNumber = Number(id);

  useInit(() => {
    // Берем данные из адресной строки и записываем их в store
    store.actions.catalog.initParams();
    store.actions.catalog.setPageNumber(pageNumber);
    store.actions.catalog.load(pageNumber);
    store.actions.categories.load();
  }, [pageNumber], true);

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
