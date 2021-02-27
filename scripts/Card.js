export default class Card {
  static popupCard() {
    const cardOpened = document.querySelector(".popup_card");
    return cardOpened;
  }

  constructor(name, alt, link, cardSelector) {
    this.cardSelector = cardSelector;
    this.name = name;
    this.alt = alt;
    this.link = link;
    this.cardImgFullScreen = document.querySelector(".popup__img-card");
    this.cardSubscribe = document.querySelector(".popup__subscribe");
    this.cardCloseIcon = Card.popupCard().querySelector(".popup__close");
    this.cardOpenedModificator = "popup_opened";
  }

  // Публичный метод генерации готовой карточки
  createCard() {
    const cardElement = this.cardSelector.content.querySelector('.card__element').cloneNode(true);
    const cardImg = cardElement.querySelector(".card__img");
    const cardLikeBtn = cardElement.querySelector(".card__button-like");
    const cardDeleteIcon = cardElement.querySelector(".card__delete");
    const cardImgLink = cardImg.src = this.link;
    const cardTitle = cardElement.querySelector(".card__title").innerText = this.name;

    // Слушатель для лайка карточки
    cardLikeBtn.addEventListener("click", () => {
      this._setLike(cardLikeBtn);
    });

    // Слушатель для удаления карточки
    cardDeleteIcon.addEventListener("click", () => {
      this._deleteCard(cardElement);
    });

    // Слушатель открытия карточки
    cardImg.addEventListener("click", () => {
      this._doOpenCard(cardTitle, cardImgLink);
    });

    return cardElement;
  }
  
  // Метод лайка
  _setLike(item) {
    item.classList.toggle("card__button-like_active");
  }

    // Метод открытия карточки
  _doOpenCard(itemName, itemImgLink) {

    this.cardSubscribe.textContent = itemName;
    this.cardImgFullScreen.src = itemImgLink;
    this.cardImgFullScreen.alt = itemName;

    Card.popupCard().classList.add(this.cardOpenedModificator);

    // Слушатель на закрытие карточки по клику на фон
    Card.popupCard().addEventListener('click', (evt) => {
      if (evt.target == evt.currentTarget) {
        this._doCloseCard();
      }
    });

    // Слушатель на закрытие по клику на иконку закрытия (крестик)
    this.cardCloseIcon.addEventListener('click', () => {
      this._doCloseCard();
    })

    // Метод, в котором навешивается слушатель при открытой карточке
    // и удаляется после закрытия
    this._doCloseThroughEsc();
  }

  // Метод навешивания и удаления слушателя на Esc
  _doCloseThroughEsc() {
    if(Card.popupCard().classList.contains(this.cardOpenedModificator)) {
      document.addEventListener("keydown", this._doCloseCardEsc);
    }
  }

  // Метод закрытия карточки
  _doCloseCard() {
    Card.popupCard().classList.remove(this.cardOpenedModificator);
  }

  // Стрелочная функция закрытия через Esc
  _doCloseCardEsc = (evt) => {
      if (evt.code == 'Escape') {
        this._doCloseCard();
        document.removeEventListener("keydown", this._doCloseCardEsc);
    }
}

  // Метод удаления карточки
  _deleteCard(item) {
    item.remove();
  }
}

