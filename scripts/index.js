//Загрузка стартовых карточек
const renderCards = () => {
  const items = initialCards.map(element => getCards(element));

  listCards.append(...items);
};

//Обработка одной карточки от массива
const getCards = (data) => {
  const cardTemplate = document.querySelector('.cards').content;
  const cardElement = cardTemplate.cloneNode(true);

  const cardImgFullScreen = document.querySelector(".popup__img-card");
  const cardSubscribe = document.querySelector(".popup__subscribe");

  cardElement.querySelector('.elements__img').src = data.link;
  cardElement.querySelector('.elements__title').innerText = data.name;
  cardElement.querySelector('.elements__img').alt = data.alt;

  // Функция лайка карточки
  cardElement.querySelector('.elements__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button-like_active');
  });
  // Функция удаления карточки через иконку
  cardElement.querySelector('.elements__delete').addEventListener("click", function(evt){
    evt.target.closest('.elements__element').remove();
  });
  // Попытка сделать открытие карточки
  cardElement.querySelector('.elements__img').addEventListener("click", function() {
    togglePopup(popupCard);
    cardSubscribe.textContent = data.name;
    cardImgFullScreen.src = data.link;
    cardImgFullScreen.alt = data.name;
  });
  return cardElement;
}

// Открытие/закрытие попапа
const togglePopup = function (popup) {
  popup.classList.toggle('popup_opened');
}

// Закрытие попапа по клику на фон
const onClickPopupLayout = function (event) {
  if (event.target == event.currentTarget) {
    togglePopup();
  }
};

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
  const item = getCards({
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

renderCards();