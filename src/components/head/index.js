import {memo} from "react";
import PropTypes from "prop-types";
import Language from "../../components/language";
import './style.css';

const dict = {
  rus: {
    shop: 'Магазин',
  },
  eng: {
    shop: 'Shop',
  }
}

function Head({lang, onChange}){
  return (
    <div className='Head'>
      <h1>{dict[lang].shop}</h1>
      <Language lang={lang} onChange={onChange}/>
    </div>
  )
}

Head.propTypes = {
  lang: PropTypes.oneOf(['rus','eng']),
  onChange: PropTypes.func.isRequired,
};

Head.defaultProps = {
  lang: 'rus',
}

export default memo(Head);
