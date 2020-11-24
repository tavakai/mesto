// Popups
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupCard = document.querySelector(".popup_card");

// Popups button open
const btnEditOpenPopup = document.querySelector(".profile__button-edit");
const btnAddOpenPopup = document.querySelector(".profile__button-add");
const btnCardOpenPopup = document.querySelector(".elements__img");

// Popups button close
const btnEditClosePopup = popupEdit.querySelector(".popup__close");
const btnAddClosePopup = popupAdd.querySelector(".popup__close");
const btnCardClosePopup = popupCard.querySelector(".popup__close");

// Свяжем текстовое содержимое полей
let profileName = document.querySelector(".profile__name");
let profileCurrent = document.querySelector(".profile__current-info");
let nameInput = document.querySelector(".popup__input_value_name");
let jobInput = document.querySelector(".popup__input_value_current");
const listCards = document.querySelector(".elements");

// Находим форму в DOM
let formElement = document.querySelector(".popup__form");
const formCardAdd = document.querySelector(".popup__form_add");

// Поля попапа добавления карточки
const cardTitle = document.querySelector(".popup__input_value_title");
const linkImg = document.querySelector(".popup__input_value_img");

// Привязка шаблона карточки
const cardTemplate = document.querySelector('.cards_view-popup').content;

// Элементы открытой карточки
const cardImgFullScreen = document.querySelector(".popup__img-card");
const cardSubscribe = document.querySelector(".popup__subscribe");

// Функция лайка
const setLike = function(btnItem) {
  btnItem.classList.toggle('elements__button-like_active');
};

// Функция открытия карточки
const doOpenCard = function(itemName, itemImgLink) {
  cardSubscribe.textContent = itemName;
  cardImgFullScreen.src = itemImgLink;
  cardImgFullScreen.alt = itemName;
};

// Стартовый массив с карточками
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Картинка Архыз'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'Картинка Челябинская область'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'Картинка Иваново'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'Картинка Камчатка'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'Картинка Холмогорский район'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'Картинка Байкал'
    }
  ];

//Обработка одной карточки от массива
const createCards = (data) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImg = cardElement.querySelector('.elements__img');
  const cardLikeBtn = cardElement.querySelector('.elements__button-like');
  const cardImgLink = cardElement.querySelector('.elements__img').src = data.link;
  const cardName = cardElement.querySelector('.elements__title').innerText = data.name;

  // Функция лайка карточки
  cardLikeBtn.addEventListener("click", function() {
    setLike(cardLikeBtn);
  });

  // Удаление карточки через иконку
  cardElement.querySelector('.elements__delete').addEventListener("click", function(evt){
    evt.target.closest('.elements__element').remove();
  });
  // Открытие карточки
  cardImg.addEventListener("click", function() {
    togglePopup(popupCard);
    doOpenCard(cardName, cardImgLink);
  });
  return cardElement;
}

//Загрузка стартовых карточек
const renderCards = () => {
  const items = initialCards.map(element => createCards(element));

  listCards.append(...items);
};

// Открытие/закрытие попапа
const togglePopup = function (popup) {
  popup.classList.toggle('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", function(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileCurrent.textContent = jobInput.value;
  togglePopup(popupEdit);
});

// Добавление карточки через попап
formCardAdd.addEventListener("submit", function(evt) {
  evt.preventDefault();
  const item = createCards({
    name: cardTitle.value,
    link: linkImg.value
  });
  listCards.prepend(item);
  togglePopup(popupAdd);
});


// Обработчики на открытие попапов редактирования профиля и добавления карточки
btnEditOpenPopup.addEventListener("click", function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCurrent.textContent;
  togglePopup(popupEdit);
});
btnAddOpenPopup.addEventListener("click", function() {
  togglePopup(popupAdd);
});

// Обработчики на закрытие попапов
btnEditClosePopup.addEventListener("click", function() {
  togglePopup(popupEdit);
});

btnAddClosePopup.addEventListener("click", function() {
  togglePopup(popupAdd);
});

btnCardClosePopup.addEventListener("click", function() {
  togglePopup(popupCard);
});

// Закрытие попапа по клику на фон
popupEdit.addEventListener("click", function(event) {
  if (event.target == event.currentTarget) {
    togglePopup(popupEdit);
  }
});
popupAdd.addEventListener("click", function(event) {
  if (event.target == event.currentTarget) {
    togglePopup(popupAdd);
  }
});
popupCard.addEventListener("click", function(event) {
  if (event.target == event.currentTarget) {
    togglePopup(popupCard);
  }
});

// Закрытие попапа по клику Escape
document.addEventListener('keydown', evt => {
  popups.forEach(pop => {
    if (evt.code == 'Escape' && pop.classList.contains('popup_opened')) {
      pop.classList.remove('popup_opened');
    }
  })
})

renderCards();