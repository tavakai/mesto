import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Popups
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");

// Popups button open
const btnEditOpenPopup = document.querySelector(".profile__button-edit");
const btnAddOpenPopup = document.querySelector(".profile__button-add");

// Popups button close
const btnEditClosePopup = popupEdit.querySelector(".popup__close");
const btnAddClosePopup = popupAdd.querySelector(".popup__close");

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

// Все поля форм
const inputsForms = document.querySelectorAll('.popup__input');
const inputsMessage = document.querySelectorAll('.popup__message');

// Поля попапа добавления карточки
const cardTitle = document.querySelector(".popup__input_value_title");
const linkImg = document.querySelector(".popup__input_value_img");

// Привязка шаблона карточки
const cardTemplate = document.querySelector(".card_view-popup");

// Функция занесения данных профиля в попап редактирования
const profileDataImpot = function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCurrent.textContent;
}

// Очистка полей и ошибок после закрытия окон
const resetInputs = function() {
  const forms = Array.from(document.querySelectorAll(".popup__form"));
    forms.forEach((form) => {
      form.reset();
  });
  const inputsMessages = Array.from(inputsMessage);
  const inputsAllForms = Array.from(inputsForms);

  inputsMessages.forEach((mess) => {
    mess.classList.remove(validateObj["errorClass"]);
  });
  inputsAllForms.forEach((form) => {
    form.classList.remove(validateObj["inputErrorClass"]);
  });
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

const cards = initialCards.map(item => {
  const newCard = new Card(item.name, item.title, item.link, cardTemplate);
  return newCard.createCard();
});
listCards.append(...cards);

formsList.forEach((item) => {
  const enemyForm = new FormValidator(validateObj, item);
  return enemyForm.enableValidation(validateObj, item);
});
  
// Закрытие попапа по клику Escape
const toggleEvtEsc = function (evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.code == "Escape") {
    togglePopup(openedPopup);
  }
};

// Открытие/закрытие попапа
const togglePopup = function (popup) {
  popup.classList.toggle("popup_opened");
  if (popup.classList.contains("popup_opened")) {
    // Обработчик на Escape
    document.addEventListener("keydown", toggleEvtEsc);
    profileDataImpot();
  } else {
    resetInputs();
    document.removeEventListener("keydown", toggleEvtEsc);
}
};

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
  const item = new Card(
    cardTitle.value,
    cardTitle.value,
    linkImg.value,
    cardTemplate
  );
  cardTitle.value = item.name;
  linkImg.value = item.link;
  listCards.prepend(item.createCard());
  togglePopup(popupAdd);
});

// Обработчики на открытие попапов редактирования профиля и добавления карточки
btnEditOpenPopup.addEventListener("click", function () {
  togglePopup(popupEdit);
});
btnAddOpenPopup.addEventListener("click", function () {
  togglePopup(popupAdd);
});

// Обработчики на закрытие попапов
btnEditClosePopup.addEventListener("click", function () {
  togglePopup(popupEdit);
});

btnAddClosePopup.addEventListener("click", function () {
  togglePopup(popupAdd);
});

// Закрытие попапа по клику на фон
popupEdit.addEventListener("click", function (event) {
  if (event.target == event.currentTarget) {
    togglePopup(popupEdit);
  }
});
popupAdd.addEventListener("click", function (event) {
  if (event.target == event.currentTarget) {
    togglePopup(popupAdd);
  }
});