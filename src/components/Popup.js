export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open() {
    this._popup.classList.add('popup_opened');
    // Добавление слушателя на Esc
    if (this._popup.classList.contains('popup_opened')) {
      document.addEventListener('keydown', this._handleEscClose);
    }
  }

  close() {
    this._popup.classList.remove('popup_opened');
    // Удаление слушателя Esc
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    // Слушатели закрытия по керстику и фону
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }

  _handleEscClose = (evt) => {
    if (evt.code == "Escape") {
      this.close();
    }
  }
}