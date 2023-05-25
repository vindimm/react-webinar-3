import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Product extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      item: null
    }
  }

  // Загрузка подробной информации о товаре по его id, включая страну и категорию
  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
       item: json.result
    }, 'Загружен товар из АПИ по id');
  }

  clean() {
    this.setState({item: null});
  }
}

export default Product;
