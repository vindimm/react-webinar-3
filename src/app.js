import React from 'react';
import {createElement, getAmount} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @param generateId {Function} Функция, возвращающая уникальный id
 * @returns {React.ReactElement}
 */
function App({store, generateId}) {

  const list = store.getState().list;

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem(generateId())}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                   onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title}</div>
                {item.counter > 0 ? <div className='Item-counter'>{`|\u00A0\u00A0выделяли ${getAmount(item.counter)}`}</div> : ''}
                <div className='Item-actions'>
                  <button onClick={(evt) => {
                    evt.stopPropagation();
                    store.deleteItem(item.code);
                  }}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
