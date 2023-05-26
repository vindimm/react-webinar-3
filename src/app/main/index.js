import {memo, useCallback, useEffect} from 'react';
import {AppRoute, PRODUCTS_PER_PAGE} from '../../const';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Container from "../../components/container";
import BasketTool from "../../components/basket-tool";
import Navigation from "../../components/navigation";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.page,
    productsCount: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.language,
  }));

  useEffect(() => {
    store.actions.catalog.load(select.page, PRODUCTS_PER_PAGE);
  }, [select.page, PRODUCTS_PER_PAGE]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    changeLanguage: useCallback((evt) => store.actions.language.setLanguage(evt.target.value), [store]),

    changePage: useCallback((page) => store.actions.catalog.setPage(page), [store]),
  }

  const renders = {
    item: useCallback((item, lang) => {
      return (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          address={AppRoute.Product.replace(':id', item._id)}
          lang={select.lang}
        />)
      }, [callbacks.addToBasket, select.lang]),
  };

  const dict = {
    rus: {
      shop: 'Магазин',
    },
    eng: {
      shop: 'Shop',
    }
  }

  return (
    <PageLayout>
      <Head title={dict[select.lang].shop} lang={select.lang} onChange={callbacks.changeLanguage}/>
      <Container justify="spacebetween">
        <Navigation adress={AppRoute.Main} lang={select.lang}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.lang}/>
      </Container>
      <List list={select.list} renderItem={renders.item} lang={select.lang}/>
      <Container justify="flexend">
        <Pagination
          currentPage={Number(select.page) || 1}
          productsCount={select.productsCount}
          onPageChange={callbacks.changePage}
        />
      </Container>
    </PageLayout>
  );
}

export default memo(Main);
