import {memo, useCallback} from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import {AppRoute} from '../../const';
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onClose: () => props.onClose(),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={AppRoute.Product.replace(':id', props.item._id)} className={cn('titleLink')} onClick={callbacks.onClose}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.text}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  text: PropTypes.string,
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
  onClose: propTypes.func,
}

ItemBasket.defaultProps = {
  text: 'Удалить',
  onRemove: () => {},
  onClose: () => {},
}

export default memo(ItemBasket);
