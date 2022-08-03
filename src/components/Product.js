export default class Product {
  constructor(data, templateSelector, callback) {
    this.name = data.name;
    this.desc = data.desc;
    this.image = data.image;
    this.price = data.price;
    this._templateSelector = templateSelector;
    this._callback = callback;
  }

  _cloneTemplate() {
    // Клонирует template и записывает пустой клон в this._productElement:
    this._productElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.product')
      .cloneNode(true);
  }

  _formatPrice() {
    // Форматирование цены
    this._productPriceFormated = `${new Intl.NumberFormat('ru-RU').format(this.price)} руб.`;
  }

  _setEventListeners() {
    // Установка слушателей

    // Получаем разметку кнопку корзины
    this._deleteButton = this._productElement.querySelector('.product__delete-button');

    // Добавляем слушатель на кнопку корзины:
    this._deleteButton.addEventListener('click', () => {
      this._removeProduct();
    });
  }

  generateProductMarkUp() {
    // Генерация html разметки с товаром

    // получаем разметку пустого товара из template
    this._cloneTemplate();
    this._formatPrice();

    // Находим элементы товара:
    this._productNameElement = this._productElement.querySelector('.product__title');
    this._productDescElement = this._productElement.querySelector('.product__desc');
    this._productImageElement = this._productElement.querySelector('.product__image');
    this._productPriceElement = this._productElement.querySelector('.product__price');

    // Подставляем данные в разметку:
    this._productImageElement.src = this.image;
    this._productImageElement.alt = this.name;
    this._productNameElement.textContent = this.name;
    this._productDescElement.textContent = this.desc;
    this._productPriceElement.textContent = this._productPriceFormated;

    // Навешиваем слушателей событий:
    this._setEventListeners();

    // Возваращем готовую верстку товара
    return this._productElement;
  }

  _removeProduct() {
    // Удаление товара
    this._productElement.classList.add('remove-product'); // анимация удаления
    this._callback(this);
    const deleteElement = () => { // удаляем элемент после анимации
      this._productElement.remove();
      this._productElement = null;
    };
    setTimeout(deleteElement, 420);
  }
}
