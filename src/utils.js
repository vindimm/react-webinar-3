/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Создание массива категорий с учетом вложенности из
 * одномерного массива объектов с указателями на родительские элементы
 * @param {Array<Object>} elements
 * @returns {Array<Object>}
 */

export function getCategories(elements) {
  // Создание дерева из начального массива
  const makeTree = (arr) => {
    // Добавляем элементам свойство parent со значением {_id: null}, если оно равно null
    arr.map((item) => {
      if (!item.parent) {
        item.parent = {_id: null};
      }
    });

    const makeChildren = (items, _id = null) => items
      .filter(item => item.parent._id === _id)
      .map(item => ({...item, children: makeChildren(items, item._id)}));

    return makeChildren(elements);
  }

  // Обход дерева в глубину и добавление дефисов согласно уровню вложенности
  const makeList = (tree) => {
    const categories = [];
    const step = (item, level = '') => {
      categories.push({value: item._id, title: `${level} ${item.title}`});
      item.children.forEach((child) => step(child, `- ${level}`));
    }
    tree.forEach((item) => {
      step(item);
    });
    return categories;
  };

  // Создание дерева из начального массива
  const categoriesTree = makeTree(elements);
  // Создание списка категорий на основе дерева категорий
  return makeList(categoriesTree);
}
