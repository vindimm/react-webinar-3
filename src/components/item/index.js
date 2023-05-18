import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';
import { getFormattedPrice } from "../../utils";

function Item(props){

  // Счётчик выделений
  // const [count, setCount] = useState(0);

  const callbacks = {
    onCartAdd: () => {
      props.onCartAdd(props.item.code);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-price'>{getFormattedPrice(props.item.price)}</div>
      <div className='Item-actions'>
        <button onClick={() => callbacks.onCartAdd(props.item.code)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

Item.defaultProps = {
  onCartAdd: () => {},
}

export default React.memo(Item);
