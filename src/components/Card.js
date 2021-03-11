export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._alt = data.name;
    this._src = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // Публичный метод генерации готовой карточки
  createCard() {
    this._cardElement = this._cardSelector.content.querySelector('.card__element').cloneNode(true);
    this._cardImg = this._cardElement.querySelector(".card__img");
    this._cardLikeBtn = this._cardElement.querySelector(".card__button-like");
    this._cardDeleteIcon = this._cardElement.querySelector(".card__delete");
    this._cardImg.src = this._src;
    this._cardTitle = this._cardElement.querySelector(".card__title").innerText = this._name;
    this._cardImg.alt = `Картинка ${this._cardTitle}`;

    this._setEventListeners();

    return this._cardElement;
  }

  // Слушатель для лайка, удаления и клика на карточку
  _setEventListeners() {
    // Слушатель для лайка карточки
    this._cardLikeBtn.addEventListener("click", () => {
      this._setLike(this._cardLikeBtn);
    });

    // Слушатель для удаления карточки
    this._cardDeleteIcon.addEventListener("click", () => {
      this._deleteCard(this._cardElement);
    });

    // Слушатель клика на картинку карточки
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._src);
    });
  }

  // Метод лайка
  _setLike(item) {
    item.classList.toggle("card__button-like_active");
  }

  // Метод удаления карточки
  _deleteCard(item) {
    item.remove();
    item = null;
  }
}