import {memo, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
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
  const { page } = useParams();

  useEffect(() => {
    store.actions.catalog.load(page, PRODUCTS_PER_PAGE);
  }, [page, PRODUCTS_PER_PAGE]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    productsCount: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Container justify="spacebetween">
        <Navigation/>
        <BasketTool  onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </Container>
      <List list={select.list} renderItem={renders.item}/>
      <Container justify="flexend">
        <Pagination currentPage={Number(page) || 1} productsCount={select.productsCount}/>
      </Container>
    </PageLayout>
  );
}

export default memo(Main);
