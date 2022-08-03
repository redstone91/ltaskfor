export default class Notification {
  constructor(message) {
    this._notifications = document.querySelector('.notifications');
    this._message = message;
    this._element = null;
  }

  _cloneNode() {
    // Клонируем элемент оповещения
    this._notificationElement = document
      .querySelector('#notification')
      .content
      .querySelector('.notification')
      .cloneNode(true);
  }

  _createNotification() {
    // Возвращаем наполненный элемент оповещения
    this._cloneNode();
    this._notificationElement.querySelector('.notification__message').textContent = this._message;
    return this._notificationElement;
  }

  _animatePopUp() {
    // Показываем элемент с анимацией
    this._element.classList.remove('notification__message_hided');
    this._element.classList.add('notification__message_shown');
  }

  _animateHideOut() {
    // Убираем элемент
    setTimeout(() => {
      this._element.classList.remove('notification__message_shown');
      this._element.classList.add('notification__message_hided');
    }, 1000);
    setTimeout(() => {
      // Удаляем элемент из DOM после всех анимаций
      this._element.remove();
      this._element = null;
    }, 2000);
  }

  popup() {
    this._element = this._createNotification(); // создаём элемент
    this._notifications.append(this._element); // добавляем элемент в DOM-дерево
    this._animatePopUp(); // анимация появления
    setTimeout(() => this._animateHideOut(), 5000); // через 5 секунд удаляем элемент с анимацией
  }
}
