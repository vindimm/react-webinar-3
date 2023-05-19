import React, {useCallback} from "react";
import PropTypes from "prop-types";
import './style.css';
import { getFormattedPrice } from "../../utils";
import ModalLayout from "../modal-layout";
import List from "../list";
import CartItem from "../cart-item";

function Cart({products, totalPrice, onClose, onCartRemove}){
  const totalText = products.length > 0 ?
    (<><span className="Cart-result">Итого</span><span>{getFormattedPrice(totalPrice)}</span></>) :
    'Корзина пуста';

  const callbacks = {
    renderItem: useCallback((item) => {
      return (<CartItem item={item} onCartRemove={onCartRemove}/>);
    }, []),
  }
  
  return (
    <ModalLayout title={'Корзина'} onClose={onClose}>
      <List renderItem={callbacks.renderItem} list={products} />
      <div className="Cart-total">
        <b>{totalText}</b>
      </div>
    </ModalLayout>
  )
}

Cart.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onCartRemove: PropTypes.func.isRequired,
};

export default React.memo(Cart);
