export default class Card {
  constructor({
    data,
    handleCardClick,
    addLikeClick,
    handleDeleteIconClick,
  }, cardSelector, user) {
    this._name = data.name;
    this._src = data.link;
    this._owner = data.owner;
    this._likes = data.likes;
    this._likesCards = Array.from(this._likes).map(i => {
      return i._id
    })
    this._idCard = data.cardId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._addLikeClick = addLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._user = user;
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
    this._likes_quantity = this._cardElement.querySelector(".card__like-quantity");
    this._likes_quantity.textContent = this._likesCards.length;
    this._searchLikeInPosts();
    this.checkCart();

    // Слушатель клика на картинку карточки
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._src);
    });

    // Слушатель для лайка карточки
    this._cardLikeBtn.addEventListener("click", () => {
      this._addLikeClick(
        this._likesCards,
        this._user._id, this._idCard, this._toggleLike()
      );
    });

    // Слушатель для удаления карточки
    this._cardDeleteIcon.addEventListener("click", () => {
      if (this.checkCart()) {
        this._handleDeleteIconClick(this._idCard, () => {
          this._deleteCard();
        });
      }
    });

    return this._cardElement;
  }
  // Проверка наличия лайка во всех постах
  _searchLikeInPosts() {
    if (this._likesCards.includes(this._user._id)) {
      this._toggleLike();
    }
  }
  // Окрашиваем лайк поста
  _toggleLike() {
    this._cardLikeBtn.classList.toggle("card__button-like_active");
  }
  // Счетчик лайка поста, получаем актуальные данные от сервера
  likeAmount(data) {
    this._likes_quantity.textContent = data.likes.length;
  }
  // Метод удаления карточки из DOM
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  // Проверка автора поста, ставим иконку удаления
  checkCart() {
    if (this._owner._id == this._user._id) {
      this._cardDeleteIcon.classList.add("card__delete_show");
      return true;
    }
  }
}