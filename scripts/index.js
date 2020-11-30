// Popups
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupCard = document.querySelector(".popup_card");

// Popups button open
const btnEditOpenPopup = document.querySelector(".profile__button-edit");
const btnAddOpenPopup = document.querySelector(".profile__button-add");

// Popups button close
const btnEditClosePopup = popupEdit.querySelector(".popup__close");
const btnAddClosePopup = popupAdd.querySelector(".popup__close");
const btnCardClosePopup = popupCard.querySelector(".popup__close");

// Свяжем текстовое содержимое полей
const profileName = document.querySelector(".profile__name");
const profileCurrent = document.querySelector(".profile__current-info");
const nameInput = document.querySelector(".popup__input_value_name");
const jobInput = document.querySelector(".popup__input_value_current");
const listCards = document.querySelector(".elements");

// Находим форму в DOM
const formElement = document.querySelector(".popup__form");
const formCardAdd = document.querySelector(".popup__form_add");

// Все поля форм
const inputsForms = document.querySelectorAll('.popup__input');
const inputsMessage = document.querySelectorAll('.popup__message');

// Поля попапа добавления карточки
const cardTitle = document.querySelector(".popup__input_value_title");
const linkImg = document.querySelector(".popup__input_value_img");

// Привязка шаблона карточки
const cardTemplate = document.querySelector(".cards_view-popup").content;

// Элементы открытой карточки
const cardImgFullScreen = document.querySelector(".popup__img-card");
const cardSubscribe = document.querySelector(".popup__subscribe");

// Функция занесения данных профиля в попап редактирования
const profileDataImpot = function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCurrent.textContent;
}

// Функция лайка
const setLike = function (btnItem) {
  btnItem.classList.toggle("elements__button-like_active");
};

// Функция открытия карточки
const doOpenCard = function (itemName, itemImgLink) {
  cardSubscribe.textContent = itemName;
  cardImgFullScreen.src = itemImgLink;
  cardImgFullScreen.alt = itemName;
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

//Обработка одной карточки от массива
const createCard = (data) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImg = cardElement.querySelector(".elements__img");
  const cardLikeBtn = cardElement.querySelector(".elements__button-like");
  cardImg.src = data.link;
  const cardName = (cardElement.querySelector(".elements__title").innerText =
    data.name);

  // Функция лайка карточки
  cardLikeBtn.addEventListener("click", function () {
    setLike(cardLikeBtn);
  });

  // Удаление карточки через иконку
  cardElement.querySelector(".elements__delete").addEventListener("click", function (evt) {
      evt.target.closest(".elements__element").remove();
    });
  // Открытие карточки
  cardImg.addEventListener("click", function () {
    togglePopup(popupCard);
    doOpenCard(cardName, cardImg.src);
  });
  return cardElement;
};

//Загрузка стартовых карточек
const renderCards = () => {
  const items = initialCards.map((element) => createCard(element));

  listCards.append(...items);
};

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
  const item = createCard({
    name: cardTitle.value,
    link: linkImg.value,
  });
  listCards.prepend(item);
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

btnCardClosePopup.addEventListener("click", function () {
  togglePopup(popupCard);
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
popupCard.addEventListener("click", function (event) {
  if (event.target == event.currentTarget) {
    togglePopup(popupCard);
  }
});

renderCards();
