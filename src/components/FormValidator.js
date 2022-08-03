export default class FormValidator {
  constructor(submitButton, inputSelector, errorClass, form) {
    this._form = form;
    this._submitBtn = submitButton;
    this._inputList = Array.from(this._form.querySelectorAll(inputSelector));
    this._errorClass = errorClass;
  }

  _checkInputValidity(inputElement) {
    // проверяем валидность и показываем ошибки
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, inputElement.validationMessage);
    }
  }

  _showInputError(inputElement, errorMessage) {
    // показ ошибки
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    // прячем ошибку
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._errorClass);
  }

  _enableBtn() {
    // делаем кнопку активной
    this._submitBtn.disabled = false;
  }

  _disableBtn() {
    // деактивируем кнопку
    this._submitBtn.disabled = true;
  }

  _hasInvalidInput() {
    // проверяем валидность инпута
    return this._inputList.some((inputValue) => !inputValue.validity.valid);
  }

  _toggleButtonState() {
    // переключаем кнопку в зависимости от того, валидный ли инпут в форме
    if (this._hasInvalidInput()) {
      this._disableBtn();
    } else {
      this._enableBtn();
    }
  }

  _setEventListeners() {
    // навешиваем слушателей
    this._toggleButtonState(this._inputList);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  enableValidation() {
    // включаем валидацию
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disableBtn();
    });
    this._setEventListeners();
  }
}
