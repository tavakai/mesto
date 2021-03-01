export default class FormValidator {
  constructor(validateObject, formSelector) {
    this._inputSelector = validateObject.inputSelector;
    this._submitButtonSelector = validateObject.submitButtonSelector;
    this._inactiveButtonClass = validateObject.inactiveButtonClass;
    this._inputErrorClass = validateObject.inputErrorClass;
    this._errorClass = validateObject.errorClass;
    this._formSelector = formSelector;
    this._inputList = [this._inputSelector];
  }

enableValidation() {
    // Обработчик события для каждой формы и запрет на submit
    this._formSelector.addEventListener("submit", (evt) => evt.preventDefault());

    // Наложение обработчиков на поля форм
    this._doInputsValidation(this._formSelector, this._inputSelector, this._errorClass, this._inputErrorClass);

    this._doBtnValidation(
      this._formSelector,
      this._inputSelector,
      this._submitButtonSelector,
      this._inactiveButtonClass
    );

    this._resetValidation();
}

// ** Показать ошибку под полем
_showErrorsText (inputAttribute, specialClass, inputError) {
  const visibleErrorMessage = this._searchErrorMessages(inputAttribute);
  visibleErrorMessage.textContent = inputAttribute.validationMessage;
  visibleErrorMessage.classList.add(specialClass);
  inputAttribute.classList.add(inputError);
};
// ** Скрыть ошибку под полем
_hideErrorsText (inputAttribute, specialClass, inputError) {
  const invisibleErrorMessage = this._searchErrorMessages(inputAttribute);
  invisibleErrorMessage.textContent = inputAttribute.validationMessage;
  invisibleErrorMessage.classList.remove(specialClass);
  inputAttribute.classList.remove(inputError);
};
// ** Поиск переменной содержащее нужное поле ошибки
_searchErrorMessages(inputAttribute) {
  const inputName = inputAttribute.getAttribute("name");
  const errorMessage = document.getElementById(`${inputName}-error`);
  return errorMessage;
}

// ** Валидация кнопки (вынесение в отдельную функцию)
_doBtnValidation (item, selector, btnClass, removeClass) {
  const btnForms = item.querySelector(btnClass);
  const inputs = item.querySelectorAll(selector);
  const nodesArray = Array.from(inputs);
  const checkAvailability = (elem) => elem.validity.valid;
  btnForms.setAttribute("disabled", "disabled");

  nodesArray.forEach((arr) => {
    arr.addEventListener("input", () => {
      if (nodesArray.every(checkAvailability)) {
        btnForms.classList.remove(removeClass);
        btnForms.removeAttribute("disabled");
      } else {
        btnForms.classList.add(removeClass);
        btnForms.setAttribute("disabled", "disabled");
      }
    });
  });
};

// Очистить все ошибки перед открытием попапа
_removeErrorsPopup() {
  const inputList = Array.from(document.querySelectorAll(this._inputSelector));
  inputList.forEach((element) => {
    element.classList.remove(this._inputErrorClass);
  });
  const inputListMessage = Array.from(document.querySelectorAll('.popup__message'));
  inputListMessage.forEach((element) => {
    element.classList.remove(this._errorClass);
  })

  const btnList = Array.from(document.querySelectorAll(this._submitButtonSelector));
  btnList.forEach((element) => {
    element.classList.add(this._inactiveButtonClass);
  })
}

// Очистка полей ошибок после закрытия попапа
_resetValidation() {
  const forms = Array.from(document.querySelectorAll(".popup__form"));
    forms.forEach((form) => {
      form.reset();
  });
  this._removeErrorsPopup();
}

// Обработчики на поля форм (вынесение в отдельную функцию)
_doInputsValidation (item,
  selector,
  errorSelector,
  inputErrorClass) {
    const inputs = item.querySelectorAll(selector);
    inputs.forEach((input) => {
      input.addEventListener("input", (evt) => {
        // ** проверка валидности введенных данных
        if (input.validity.valid) {
          // ** Скрыть ошибку под полем
          this._hideErrorsText(input, errorSelector, inputErrorClass);
        } else {
          // ** Показать ошибку под полем
          this._showErrorsText(input, errorSelector, inputErrorClass);
        }
      });
    });
  };
}