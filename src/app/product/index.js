import {memo, useCallback} from "react";
import {useParams} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Product() {

  const store = useStore();
  let { id } = useParams();
  id = Number(id);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие модального окна с корзиной
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Добавление товара в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <Head title='Название продукта!!!!!!!!!!!!'/>
      <BasketTool sum={select.sum} amount={select.amount} onOpen={callbacks.openModalBasket}/>
    </PageLayout>
  );
}

export default memo(Product);
