import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cartProductsAmount = store.getCartProductsAmount();
  const cartTotalPrice = store.getCartTotalPrice();
  const cartProductsList = store.getCartProductsList();
  const isCartOpen = store.isCartOpen();

  const callbacks = {
    onCartOpen: useCallback(() => {
     store.openCart();
    }, [store]),

    onCartClose: useCallback(() => {
     store.closeCart();
    }, [store]),

    onCartAdd: useCallback((code) => {
      store.addInCart(code);
    }, [store]),

    onCartRemove: useCallback((code) => {
      store.removeFromCart(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls productsAmount={cartProductsAmount} totalPrice={cartTotalPrice} onCartOpen={callbacks.onCartOpen}/>
      <List list={list} onCartAdd={callbacks.onCartAdd}/>
      {isCartOpen &&
        <Cart
          products={cartProductsList}
          totalPrice={cartTotalPrice}
          onClose={callbacks.onCartClose}
          onCartRemove={callbacks.onCartRemove}
        />}
    </PageLayout>
  );
}

export default App;
