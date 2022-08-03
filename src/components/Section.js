export default class Section {
  constructor({ items, renderer }, containerElement, handleLocalChange) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = containerElement;
    this._handleLocalChange = handleLocalChange;
  }

  render(sorted = false) {
    // Рендер товаров
    if (sorted) {
      this._itemsSorted.forEach((item) => {
        this._renderer(item);
      });
    } else {
      this._items.forEach((item) => {
        this._renderer(item);
      });
    }
    this._handleLocalChange(this._items);
  }

  sortByProperty(type) {
    // Сортировка товаров
    let isSorted = false;

    while (this._containerElement.firstChild) {
      // очищаем DOM
      this._containerElement.removeChild(this._containerElement.lastChild);
    }
    if (type === 'byPriceIncrease') {
      // по возрастанию
      this._itemsSorted = [...this._items].sort((a, b) => a.price - b.price);
      isSorted = true;
    }
    if (type === 'byPriceDecrease') {
      // по убыванию
      this._itemsSorted = [...this._items].sort((a, b) => b.price - a.price);
      isSorted = true;
    }
    if (type === 'byName') {
      // по названию
      this._itemsSorted = [...this._items]
        .sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      isSorted = true;
    }
    this.render(isSorted); // рендерим новое положение товаров
  }

  addItem(data, element) {
    // Добавление товара
    this._items.unshift(data);
    this._handleLocalChange(this._items);
    element.classList.add('new-product');
    this._containerElement.prepend(element);
  }

  deleteItem({
    name, desc, image, price,
  }) {
    // Удаление товара
    this._items
      .splice(this._items
        .findIndex( // находим нужный индекс
          (item) => { // удаляем товар при совпадении всех свойств
            if (
              item.name === name
              && item.desc === desc
              && item.image === image
              && item.price === price) {
              return true;
            }
            return false;
          },
        ), 1); // удаляем только первое совпдаение
    this._handleLocalChange(this._items);
  }
}
