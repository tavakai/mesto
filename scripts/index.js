const btnOpenPopup = document.querySelector('.profile__button-edit');
const btnClosePopup = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

// Свяжем текстовое содержимое полей
let profileName = document.querySelector('#profile__name').textContent;
let profileCurrent = document.querySelector('#profile__current').textContent;
let nameInput = document.querySelector('#popup_name');
let jobInput = document.querySelector('#popup_current');
nameInput.value = profileName;
jobInput.value = profileCurrent;

// Окрытие и закрытие попапа
const popupToggle = function () {
    popup.classList.toggle('popup_opened');
}

btnOpenPopup.addEventListener('click', popupToggle);
btnClosePopup.addEventListener('click', popupToggle);

// Закрытие попапа по клику на фон

const onClickPopupLayout = function (event) {
    if (event.target == event.currentTarget) {
        popupToggle();
    }
}

popup.addEventListener('click', onClickPopupLayout);

// Находим форму в DOM
let formElement = document.querySelector('#popup_form');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    nameInput = document.querySelector('#popup_name').value; // Воспользуйтесь инструментом .querySelector()
    jobInput = document.querySelector('#popup_current').value; // Воспользуйтесь инструментом .querySelector()
    // Получите значение полей из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей
    profileName = document.querySelector('#profile__name');
    profileCurrent = document.querySelector('#profile__current');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput;
    profileCurrent.textContent = jobInput;
    popupToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);