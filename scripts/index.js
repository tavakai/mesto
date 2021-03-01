import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Popups
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupCard = document.querySelector(".popup_card");

// Popups button open
const btnEditOpenPopup = document.querySelector(".profile__button-edit");
const btnAddOpenPopup = document.querySelector(".profile__button-add");

// Свяжем текстовое содержимое полей
const profileName = document.querySelector(".profile__name");
const profileCurrent = document.querySelector(".profile__current-info");
const nameInput = document.querySelector(".popup__input_value_name");
const jobInput = document.querySelector(".popup__input_value_current");
const listCards = document.querySelector(".elements");

// Находим форму в DOM
const formElement = document.querySelector(".popup__form");
const formCardAdd = document.querySelector(".popup__form_add");
const formEditProfile = document.querySelector(".popup__form_edit");
const formsList = [formCardAdd, formEditProfile];

// Поля попапа добавления карточки
const cardTitle = document.querySelector(".popup__input_value_title");
const linkImg = document.querySelector(".popup__input_value_img");

// Привязка шаблона карточки
const cardTemplate = document.querySelector(".card_view-popup");

// Элементы открытой карточки
const cardImgFullScreen = document.querySelector(".popup__img-card");
const cardSubscribe = document.querySelector(".popup__subscribe");

// Функция занесения данных профиля в попап редактирования
const profileDataImpot = function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCurrent.textContent;
}

const validateObj = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Стартовый массив с карточками
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Картинка Архыз",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Картинка Челябинская область",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Картинка Иваново",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Картинка Камчатка",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Картинка Холмогорский район",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Картинка Байкал",
  },
];

// Функция открытия карточки
const handleCardClick = function (name, src) {
  cardImgFullScreen.src = src;
  cardSubscribe.textContent = name;
  togglePopup(popupCard);
};

// Открытие/закрытие попапа
const togglePopup = function (popup) {
  popup.classList.toggle("popup_opened");
  if (popup.classList.contains("popup_opened")) {
    // Обработчик на Escape
    document.addEventListener("keydown", toggleEvtEsc);
  } else {
    document.removeEventListener("keydown", toggleEvtEsc);
  }
};

// Закрытие попапа по клику Escape
const toggleEvtEsc = function (evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.code == "Escape") {
    togglePopup(openedPopup);
  }
};

// Генерация стартовых карточек
const cards = initialCards.map(item => {
  const newCard = new Card(item, cardTemplate, handleCardClick);
  return newCard.createCard();
});
listCards.append(...cards);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", function (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileCurrent.textContent = jobInput.value;
  togglePopup(popupEdit);
});


// Добавление карточки через попап
formCardAdd.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const doNewCardRender = {
    name: cardTitle.value,
    link: linkImg.value
  }
  const newCard = new Card(doNewCardRender, cardTemplate, handleCardClick);
  
  listCards.prepend(newCard.createCard());
  togglePopup(popupAdd);
});

// Обработчики на открытие попапов редактирования профиля и добавления карточки
btnEditOpenPopup.addEventListener("click", function () {
  const resetPopupEdit = new FormValidator(validateObj, formEditProfile);
  resetPopupEdit.enableValidation();
  togglePopup(popupEdit);
  profileDataImpot();
});

btnAddOpenPopup.addEventListener("click", function () {
  const resetPopupAdd = new FormValidator(validateObj, formCardAdd);
  resetPopupAdd.enableValidation();
  togglePopup(popupAdd);
});

// Обработчки на все попапы (закрытие по крестику и клику на фон 👍)
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          togglePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        togglePopup(popup)
      }
  })
});