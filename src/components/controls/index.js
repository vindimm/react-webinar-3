import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onCartOpen}){
  return (
    <div className='Controls'>
      <div className='Controls-info'>В корзине: <b>пусто</b></div>
      <button onClick={onCartOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onCartOpen: PropTypes.func
};

Controls.defaultProps = {
  onCartOpen: () => {}
}

export default React.memo(Controls);
