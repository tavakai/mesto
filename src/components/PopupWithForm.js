import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._btnForms = this._popup.querySelector('.popup__button');
    this._btnFormEdit = this._popup.querySelector('.popup__button_edit');
    this._btnFormAdd = this._popup.querySelector('.popup__button_add');
    this._btnFormAvatar = this._popup.querySelector('.popup__button_avatar');
  }

  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this.inputsValues = [];
    this._inputList.forEach((input) => {
      this.inputsValues[input.name] = input.value;
    });
    return this.inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => {
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
  // Метод прелоадера
  addPreloader(isLoading, text) {
    if (isLoading) {
      this._btnForms.textContent = 'Сохранение...';
    } else {
      this._btnForms.textContent = text;
    }
  }
}