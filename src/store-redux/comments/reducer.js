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

    case "comments/send-start":
      return { ...state, waiting: true};

    case "comments/send-success":
      return { 
        ...state,
        comments: [...state.comments, action.payload],
        waiting: false
      };

    case "comments/send-error":
      return { ...state, waiting: false};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
