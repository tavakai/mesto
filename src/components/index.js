import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import {
  popupEdit,
  popupAdd,
  btnEditOpenPopup,
  btnAddOpenPopup,
  nameInput,
  jobInput,
  listCards,
  openedCard,
  formCardAdd,
  formEditProfile,
  cardTemplate,
  initialCards
} from '../utils/constants.js';

// Функция открытия карточки
const handleCardClick = function (name, src) {
  const popupCard = new PopupWithImage(openedCard, name, src);
  popupCard.open();
  popupCard.setEventListeners();
};

const userDataObj = {
  name: ".profile__name",
  info: ".profile__current-info"
}
const userInfo = new UserInfo(userDataObj);

// Генерация стартовых карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplate, handleCardClick);
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, listCards);

cardList.renderItems();

// Создание экземпляра попапа редактирования
const popupEditPopup = new PopupWithForm(popupEdit, (inputsValues) => {

  userInfo.setUserInfo(inputsValues);
  popupEditPopup.close();
});

// Создание экземпляра попапа добавления карточки
const popupAddCard = new PopupWithForm(popupAdd, (inputsValues) => {
  const dataArr = {
    name: inputsValues.card_title,
    link: inputsValues.card_img_url
  }
  const obj = [];
  obj.push(dataArr);

  const newCard = new Section({
    items: obj,
    renderer: (item) => {
      const card = new Card(item, cardTemplate, handleCardClick);
      const addCard = card.createCard();
      newCard.addItem(addCard);
    }
  }, listCards);
  newCard.renderItems();
  popupAddCard.close();
});

// Слушатель на открытие попапа профиля
btnEditOpenPopup.addEventListener('click', () => {
  popupEditPopup.open();
  resetPopupEdit.resetValidation();
  popupEditPopup.setEventListeners();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.info;
});

// Слушатель на открытие попапа новой карточки
btnAddOpenPopup.addEventListener('click', () => {
  popupAddCard.open();
  resetPopupAdd.resetValidation();
  popupAddCard.setEventListeners();
});

const validateObj = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Создание экземпляра формы для валидации
const resetPopupEdit = new FormValidator(validateObj, formEditProfile);
resetPopupEdit.enableValidation();

// Создание экземпляра формы для валидации
const resetPopupAdd = new FormValidator(validateObj, formCardAdd);
resetPopupAdd.enableValidation();