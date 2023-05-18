import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cartProductsAmount = store.getCartProductsAmount();
  const cartTotalPrice = store.getCartTotalPrice();

  const callbacks = {
    onCartOpen: useCallback(() => {
     store.openCart();
    }, [store]),

    onCartAdd: useCallback((code) => {
      store.addInCart(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls productsAmount={cartProductsAmount} totalPrice={cartTotalPrice} onCartOpen={callbacks.onCartOpen}/>
      <List list={list} onCartAdd={callbacks.onCartAdd}/>
    </PageLayout>
  );
}

export default App;
