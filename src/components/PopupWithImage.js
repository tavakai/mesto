import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = document.querySelector('.popup__img-card');
    this._popupAlt = document.querySelector('.popup__subscribe');
  }
  
  openCard(cardTitle, cardImg) {
    super.open();
    this._popupImg.src = cardImg;
    this._popupAlt.textContent = cardTitle;
  }
}