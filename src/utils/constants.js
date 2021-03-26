// Popups
export const popupEdit = document.querySelector(".popup_edit");
export const popupAdd = document.querySelector(".popup_add");
export const popupAvatar = document.querySelector(".popup_avatar");
export const popupConfirm = document.querySelector(".popup_confirm");

// Popups button open
export const btnEditOpenPopup = document.querySelector(".profile__button-edit");
export const btnAddOpenPopup = document.querySelector(".profile__button-add");

// Свяжем текстовое содержимое полей
export const nameInput = document.querySelector(".popup__input_value_name");
export const jobInput = document.querySelector(".popup__input_value_current");
export const listCards = document.querySelector(".elements");
export const openedCard = document.querySelector('.popup_card');

export const userName = document.querySelector(".profile__name");
export const UserCurrentInfo = document.querySelector(".profile__current_info");
export const avatarPencil = document.querySelector(".profile__pencil-icon");
export const cardDeleteIcon = document.querySelector(".card__delete");
export const userInputs = {
    name: ".profile__name",
    info: ".profile__current-info",
    avatar: ".profile__img"
}
// Находим форму в DOM
export const formCardAdd = document.querySelector(".popup__form_add");
export const formEditProfile = document.querySelector(".popup__form_edit");
export const formEditAvatar = document.querySelector(".popup__form_avatar");

// Привязка шаблона карточки
export const cardTemplate = document.querySelector(".card_view-popup");

// Вынесение в константу значение Escape
export const btnEscape = "Escape";