const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Создание уникального ID
 * @returns {Function}
 */
export function createCounter() {
  let id = 1;
  return function() {
    return id++;
  }
}

/**
 * Принимает число и возвращает строку вида "N раз" в правильном падеже
 * @param amount {Number}
 * @returns {String}
 */
export function getAmount(amount){
  const lastDigit = amount % 10;
  const twoLastDigits = amount % 100;

  if ([2, 3, 4].includes(lastDigit) && !([12, 13, 14].includes(twoLastDigits))) {
    return `${amount} раза`;
  }

  return `${amount} раз`;
}
