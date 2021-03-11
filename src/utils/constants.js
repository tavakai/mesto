// Popups
export const popupEdit = document.querySelector(".popup_edit");
export const popupAdd = document.querySelector(".popup_add");

// Popups button open
export const btnEditOpenPopup = document.querySelector(".profile__button-edit");
export const btnAddOpenPopup = document.querySelector(".profile__button-add");

// Свяжем текстовое содержимое полей
export const nameInput = document.querySelector(".popup__input_value_name");
export const jobInput = document.querySelector(".popup__input_value_current");
export const listCards = document.querySelector(".elements");
export const openedCard = document.querySelector('.popup_card');

// Находим форму в DOM
export const formCardAdd = document.querySelector(".popup__form_add");
export const formEditProfile = document.querySelector(".popup__form_edit");

// Привязка шаблона карточки
export const cardTemplate = document.querySelector(".card_view-popup");

// Стартовый массив с карточками
export const initialCards = [{
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
        alt: "Картинка Архыз",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
        alt: "Картинка Челябинская область",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
        alt: "Картинка Иваново",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
        alt: "Картинка Камчатка",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
        alt: "Картинка Холмогорский район",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
        alt: "Картинка Байкал",
    },
];