import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {getPaginationPages} from "../../utils";
import {AppRoute, PRODUCTS_PER_PAGE} from "../../const";
import './style.css';

function Pagination({currentPage, productsCount}) {

  const cn = bem('Pagination');
  const lastPage = Math.ceil(productsCount / PRODUCTS_PER_PAGE);
  const pages = getPaginationPages(currentPage, lastPage);

  return (
    <ul className={cn()}>
      {pages.map((item) =>
        item > 0 ?
        (<li className={cn('item')} key={item}>
          <Link
            to={AppRoute.Catalog.replace(':page', `${item}`)}
            className={item === currentPage ? cn('link', {active: true}) : cn('link')}
          >
            {item}
          </Link>
        </li>) :
        (<li className={cn('item')} key={item}>...</li>) 
      )}
    </ul>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  productsCount: PropTypes.number,
}

Pagination.defaultTypes = {
  currentPage: 1,
  productsCount: 100
}

export default memo(Pagination);
