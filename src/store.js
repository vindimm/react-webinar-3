/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Открытие модалки с корзиной
   */
  openCart() {
    this.setState({
      ...this.state,
      isCartOpen: true
    })
  };

  /**
   * Закрытие модалки с корзиной
   */
  closeCart() {
    this.setState({
      ...this.state,
      isCartOpen: false
    })
  };
 
  /**
   * Добавление товара в корзину по его коду
   * @param code {number}
   */
  addInCart(code) {
    const currentProductAmount = this.state.cartProducts.find((item) => item.code === code)?.amount || 0;
    this.setState({
      ...this.state,
      cartProducts: [
        ...this.state.cartProducts.filter(item => item.code !== code),
        {code, amount: currentProductAmount + 1}
      ]
    })
  }

  /**
   * Получение общей стоимости товаров в корзине
   * @returns {Number}
   */
  getCartTotalPrice() {
    const totalPrice = this.state.cartProducts.reduce((accum, item) => {
      return (this.state.list.find((product) => product.code === item.code)).price * item.amount + accum;
    }, 0);
    return totalPrice;
  }

  /**
   * Получение общего кол-ва уникальных товаров в корзине
   * @returns {Number}
   */
  getCartProductsAmount() {
    return this.state.cartProducts.length;
  }
}

export default Store;
