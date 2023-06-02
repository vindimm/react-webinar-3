import StoreModule from "../module";
import {saveToken, getToken, dropToken} from "../token";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class LoginState extends StoreModule {

  initState() {
    return {
      status: 'unknown',
      user: null,
      error: null,
      waiting: false
    }
  }

  /**
   * @param {{login: string, password: string}} data
   * Авторизация пользователя
   */
  async login(data) {
    // Установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      });

      const json = await response.json();

      if (response.status === 200) {
        // Авторизация прошла успешно
        this.setState({
          ...this.getState(),
          status: 'auth',
          user: json.result.user,
          error: null,
          waiting: false
        }, 'Авторизация прошла успешно');

        saveToken(json.result.token);
      } else {
        // При авторизации произошла ошибка
        const errorMessage = json.error.data.issues[0].message;
        throw new Error(errorMessage);
      }
    } catch (err) {
      // Сохраняем данные об ошибке в стейт
      this.setState({
        status: 'noAuth',
        user: null,
        error: err.message,
        waiting: false
      }, 'Авторизация не удалась');
    }
  }

  /**
   * Проверка авторизации
   */
  async checkAuth() {
    const token = getToken();

    if (!token) {
      // Нет токена - не делаем запрос. устанавливаем статус 'noAuth'
      this.setState({
        ...this.getState(),
        status: 'noAuth',
        user: null,
        waiting: false
      }, 'Проверка авторизации... status noAuth. нет токена');

    } else if (this.getState().status !== 'auth') {
      // Есть токен и стаутус равен 'noAuth' или 'unknown' - делаем запрос
      // Установка признака ожидания загрузки
      this.setState({
        ...this.getState(),
        waiting: true
      });

      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': `${token}`
        }
      });
    
      const json = await response.json();

      if (response.status === 200) {
        // Авторизация прошла успешно
        this.setState({
          ...this.getState(),
          status: 'auth',
          user: json.result,
          waiting: false,
          error: null
        }, 'Авторизация прошла успешно');
      } else {
        // Не получилось авторизоваться
        this.setState({
          ...this.getState(),
          status: 'noAuth',
          user: null,
          waiting: false
        }, 'Авторизация не удалась, ошибка запроса');
      }
    }
  }

  /**
   * Сброс авторизации
   */
  async logout() {
    this.setState({
      ...this.getState(),
      status: 'noAuth',
      user: null,
      error: null
    }, 'Авторизация сброшена');

    const token = getToken();

    await fetch(`/api/v1/users/sign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': `${token}`
      }
    });

    dropToken();
  }
}

export default LoginState;
