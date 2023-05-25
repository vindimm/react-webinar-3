import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: []
    }
  }

  /**
   * Загрузка данных (id, title, price, count) с пагинацией
   * @param page Номер страницы
   * @param PRODUCTS_PER_PAGE Количество товаров на странице
   */
  async load(page, PRODUCTS_PER_PAGE) {
    const response =
      await fetch(`/api/v1/articles?limit=${PRODUCTS_PER_PAGE}&skip=${(page - 1) * 10}&fields=items(_id, title, price),count`);
    
    const json = await response.json();
    
    this.setState({
       ...this.getState(),
       list: json.result.items,
       count: json.result.count
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
