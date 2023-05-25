import {memo, useEffect, useCallback} from "react";
import {useParams} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import ProductContent from "../../components/product-content";
import Navigation from "../../components/navigation";
import BasketTool from "../../components/basket-tool";
import Container from "../../components/container";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Product() {

  const store = useStore();
  let { id } = useParams();

  useEffect(() => {
    store.actions.product.load(id);
    // Очищаем store при демонтировании, чтобы при повторном открытии Product избежать мерцания старых данных
    return () => {
      store.actions.product.clean();
    };
  }, [store, id]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product.item,
    title: state.product.item?.title,
  }));

  const callbacks = {
    // Открытие модального окна с корзиной
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Добавление товара в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.title}/>
      <Container justify="spacebetween">
        <Navigation/>
        <BasketTool  onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </Container>
      <ProductContent product={select.product} onAdd={callbacks.addToBasket}/>
    </PageLayout>
  );
}

export default memo(Product);
