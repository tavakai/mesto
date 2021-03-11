export default class FormValidator {
  constructor(validateObject, formSelector) {
    this._inputSelector = validateObject.inputSelector;
    this._submitButtonSelector = validateObject.submitButtonSelector;
    this._inactiveButtonClass = validateObject.inactiveButtonClass;
    this._inputErrorClass = validateObject.inputErrorClass;
    this._errorClass = validateObject.errorClass;
    this._formSelector = formSelector;
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    this._btnForm = this._formSelector.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    // Обработчик события для каждой формы и запрет на submit
    this._formSelector.addEventListener("submit", (evt) => evt.preventDefault());
    // Вызов валидации полей
    this._doInputsValidation();
    // Вызов валидации кнопки
    this._doBtnValidation();
  }

  // ** Показать ошибку под полем
  _showErrorsText(inputAttribute) {
    const visibleErrorMessage = this._searchErrorMessages(inputAttribute);
    visibleErrorMessage.textContent = inputAttribute.validationMessage;
    visibleErrorMessage.classList.add(this._errorClass);
    inputAttribute.classList.add(this._inputErrorClass);
  };
  // ** Скрыть ошибку под полем
  _hideErrorsText(inputAttribute) {
    const invisibleErrorMessage = this._searchErrorMessages(inputAttribute);
    invisibleErrorMessage.textContent = inputAttribute.validationMessage;
    invisibleErrorMessage.classList.remove(this._errorClass);
    inputAttribute.classList.remove(this._inputErrorClass);
  };
  // ** Поиск переменной содержащее нужное поле ошибки
  _searchErrorMessages(inputAttribute) {
    const inputName = inputAttribute.getAttribute("name");
    const errorMessage = document.getElementById(`${inputName}-error`);
    return errorMessage;
  }
  // Валидация кнопки
  _doBtnValidation() {
    const nodesArray = Array.from(this._inputList);
    const checkAvailability = (elem) => elem.validity.valid;
    this._btnForm.setAttribute("disabled", "disabled");
    nodesArray.forEach((arr) => {
      arr.addEventListener("input", () => {
        if (nodesArray.every(checkAvailability)) {
          this._btnForm.classList.remove(this._inactiveButtonClass);
          this._btnForm.removeAttribute("disabled");
        } else {
          this._btnForm.classList.add(this._inactiveButtonClass);
          this._btnForm.setAttribute("disabled", "disabled");
        }
      });
    });
  };
  // Очистка полей ошибок после закрытия попапа
  resetValidation() {
    this._inputList.forEach((element) => {
      this._hideErrorsText(element);
    });
    const inputListMessage = Array.from(this._formSelector.querySelectorAll('.popup__message'));
    inputListMessage.forEach((element) => {
      element.classList.remove(this._errorClass);
    })
    this._btnForm.classList.add(this._inactiveButtonClass);
    this._doBtnValidation();
  }
  // Обработчики на поля форм
  _doInputsValidation() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        // ** проверка валидности введенных данных
        if (input.validity.valid) {
          // ** Скрыть ошибку под полем
          this._hideErrorsText(input);
        } else {
          // ** Показать ошибку под полем
          this._showErrorsText(input);
        }
      });
    });
  };
}