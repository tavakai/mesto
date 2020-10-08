const btnOpenPopup = document.querySelector(".profile__button-edit");
const btnClosePopup = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");
// Свяжем текстовое содержимое полей
let profileName = document.querySelector(".profile__name");
let profileCurrent = document.querySelector(".profile__current-info");
let nameInput = document.querySelector(".popup__input_value_name");
let jobInput = document.querySelector(".popup__input_value_current");
// Окрытие попапа, запись значений в инпуты
const popupOpen = function () {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileCurrent.textContent;
};
// Закрытие попапа
const popupClose = function () {
  popup.classList.remove("popup_opened");
};
// Закрытие попапа по клику на фон
const onClickPopupLayout = function (event) {
  if (event.target == event.currentTarget) {
    popupClose();
  }
};
// Находим форму в DOM
let formElement = document.querySelector(".popup__form");

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileName.textContent = nameInput.value;
  profileCurrent.textContent = jobInput.value;
  popupClose();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
btnOpenPopup.addEventListener("click", popupOpen);
btnClosePopup.addEventListener("click", popupClose);
popup.addEventListener("click", onClickPopupLayout);
