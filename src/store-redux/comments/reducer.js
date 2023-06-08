// Начальное состояние
const initialState = {
  comments: [],
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, comments: [], waiting: true};

    case "comments/load-success":
      return { ...state, comments: action.payload.data, waiting: false};

    case "comments/load-error":
      return { ...state, comments: [], waiting: false}; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
