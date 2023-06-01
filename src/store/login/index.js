import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class LoginState extends StoreModule {

  initState() {
    return {
      status: 'noAuth',
      user: null,
      token: null
    }
  }

  /**
   * @param {{login: string, password: string}} data
   * Авторизация пользователя
   */
  async login(data) {
    // Сброс текущего пользователя
    this.setState({
      status: 'noAuth',
      user: null,
      token: null
    });

    try {
      const response = await fetch(`/api/v1/users/sign`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      });

      const json = await response.json();

      // Авторизация прошла успешно
      this.setState({
        status: 'auth',
        user: json.result.user,
        token: json.result.token
      }, 'Загружен товар из АПИ');

    } catch (e) {
      // Ошибка при авторизации
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        status: 'noAuth',
        user: null,
        token: null
      });
    }
  }
}

export default LoginState;
