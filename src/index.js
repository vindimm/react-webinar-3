import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement, createCounter} from './utils.js';
import App from './app.js';
import Store from './store.js';

const generateId = createCounter();

const store = new Store({
  list: [
    {code: generateId(), counter: 0, title: 'Название элемента'},
    {code: generateId(), counter: 0, title: 'Некий объект'},
    {code: generateId(), counter: 0, title: 'Заголовок'},
    {code: generateId(), counter: 0, title: 'Очень длинное название элемента из семи слов'},
    {code: generateId(), counter: 0, title: 'Запись'},
    {code: generateId(), counter: 0, title: 'Шестая запись'},
    {code: generateId(), counter: 0, title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} generateId={generateId}/>);
});

// Первый рендер приложения
root.render(<App store={store} generateId={generateId}/>);
