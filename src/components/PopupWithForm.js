import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this.inputsValues = [];
    this._inputList.forEach((input) => {
      this.inputsValues[input.name] = input.value;
    });
    return this.inputsValues;
  }

  _submitCall(evt) {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => this._submitCall(evt));
  }

  close() {
    super.close();
    this._popupForm.reset();
    this._popup.removeEventListener('submit', this._submitCall);
  }
}