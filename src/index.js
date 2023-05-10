import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement, createCounter} from './utils.js';
import App from './app.js';
import Store from './store.js';

const generateId = createCounter();

const store = new Store({
  list: [
    {code: generateId(), title: 'Название элемента'},
    {code: generateId(), title: 'Некий объект'},
    {code: generateId(), title: 'Заголовок'},
    {code: generateId(), title: 'Очень длинное название элемента из семи слов'},
    {code: generateId(), title: 'Запись'},
    {code: generateId(), title: 'Шестая запись'},
    {code: generateId(), title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} generateId={generateId}/>);
});

// Первый рендер приложения
root.render(<App store={store} generateId={generateId}/>);
