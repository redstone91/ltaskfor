import './index.css';
import Section from '../components/Section';
import Product from '../components/Product';
import {
  productsContainer,
  formElement,
  submitButton,
  inputSelector,
  errorClass,
  sortButton,
} from '../utils/elements';
import Notification from '../components/Notification';
import defaultProducts from '../utils/defaultProducts';
import FormValidator from '../components/FormValidator';

let productsState;

const handleLocalStorage = () => {
  const store = localStorage.getItem('products');
  if (!store) {
    localStorage.setItem('products', JSON.stringify(defaultProducts));
  }
  productsState = JSON.parse(localStorage.getItem('products'));
};

const handleLocalChange = (data) => {
  localStorage.setItem('products', JSON.stringify(data));
};

handleLocalStorage();

// Создание экземпляра секции и дефолтных товаров
const productsSection = new Section(
  {
    items: productsState,
    renderer: (data) => {
      const product = new Product(
        data,
        '#product',
        (selectedProduct) => {
          new Notification(`Товар «${selectedProduct.name}» успешно удалён`).popup();
          productsSection.deleteItem(selectedProduct);
        },
      );
      productsContainer.append(product.generateProductMarkUp());
    },
  },
  productsContainer,
  handleLocalChange,
);

// Рендер дефолных товаров
productsSection.render();

// Функция возвращает объект с ключами и значениями выбранной формы
const getInputValues = (selectedForm) => {
  const form = new FormData(selectedForm);
  const formValues = {};
  /* eslint-disable-next-line */
  for (const [key, value] of form.entries()) {
    formValues[key] = value;
  }
  return formValues;
};

// Обработчик сабмита формы
const handleSubmit = (evt) => {
  evt.preventDefault();
  const inputData = getInputValues(formElement);
  const newProduct = new Product(
    inputData,
    '#product',
    (selectedProduct) => {
      new Notification(`Товар «${selectedProduct.name}» успешно удалён`).popup();
      productsSection.deleteItem(selectedProduct);
    },
  );
  productsSection.addItem(inputData, newProduct.generateProductMarkUp());
  // formElement.removeEventListener('submit', handleSubmit);
  formElement.reset();
  new Notification(`Товар  «${newProduct.name}» успешно добавлен`).popup();
};

// Добавление слушателя на кнопку сабмита
formElement.addEventListener('submit', handleSubmit);

const formValidator = new FormValidator(
  submitButton,
  inputSelector,
  errorClass,
  formElement,
);

// Активация валидатора
formValidator.enableValidation();

// Обработчик сортировки
const handleSorting = (event) => {
  new Notification(`Товары отсортированы ${event.target.options[event.target.selectedIndex].text.toLowerCase()}`).popup();
  productsSection.sortByProperty(sortButton.value);
};

sortButton.addEventListener('change', handleSorting);
