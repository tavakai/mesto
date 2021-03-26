import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, confirm) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form_confirm');
    this._confirm = confirm;
  }

  setEventListeners() {
    super.setEventListeners();
  }

  open() {
    super.open();
  }

  createSubmit(submit) {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      submit();
    });
  }
}