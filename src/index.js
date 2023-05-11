import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement, createCounter} from './utils.js';
import App from './app.js';
import Store from './store.js';

const generatorId = createCounter();

const store = new Store(
  {
    list: [
      {code: generatorId(), selectionsCounter: 0, title: 'Название элемента'},
      {code: generatorId(), selectionsCounter: 0, title: 'Некий объект'},
      {code: generatorId(), selectionsCounter: 0, title: 'Заголовок'},
      {code: generatorId(), selectionsCounter: 0, title: 'Очень длинное название элемента из семи слов'},
      {code: generatorId(), selectionsCounter: 0, title: 'Запись'},
      {code: generatorId(), selectionsCounter: 0, title: 'Шестая запись'},
      {code: generatorId(), selectionsCounter: 0, title: 'Седьмая запись'},
    ],
  },
  generatorId
);

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
