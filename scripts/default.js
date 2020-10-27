// Popups
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