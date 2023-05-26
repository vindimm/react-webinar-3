import {memo, useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import {AppRoute} from "../../const";
import './style.css';

function Item(props){

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  const dict = {
    rus: {
      add: 'Добавить'
    },
    eng: {
      add: 'Add'
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={AppRoute.Product.replace(':id', props.item._id)} className={cn('titleLink')}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{dict[props.lang].add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  lang: PropTypes.oneOf(['rus', 'eng']),
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  lang: 'rus',
  onAdd: () => {},
}

export default memo(Item);
