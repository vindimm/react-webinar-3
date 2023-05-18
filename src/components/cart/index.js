import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { getFormattedPrice } from "../../utils";
import ModalLayout from "../modal-layout";
import CartItem from "../cart-item";

function Cart({products, totalPrice, onClose, onCartRemove}){

  const totalText = products.length > 0 ?
    (<><span className="Cart-result">Итого</span><span>{getFormattedPrice(totalPrice)}</span></>) :
    'Корзина пуста';

  return (
    <ModalLayout title={'Корзина'} onClose={onClose}>
      <ul className="Cart-list">
        {products.map((product) => <CartItem item={product} onCartRemove={onCartRemove} key={product.code} />)}
      </ul>
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
