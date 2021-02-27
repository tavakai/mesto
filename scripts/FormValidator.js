export default class FormValidator {
  constructor(validateObject, formSelector) {
    this.inputSelector = validateObject.inputSelector;
    this.submitButtonSelector = validateObject.submitButtonSelector;
    this.inactiveButtonClass = validateObject.inactiveButtonClass;
    this.inputErrorClass = validateObject.inputErrorClass;
    this.errorClass = validateObject.errorClass;
    this.formSelector = formSelector;
  }

enableValidation(validateObject, item) {
    // Обработчик события для каждой формы и запрет на submit
    item.addEventListener("submit", (evt) => evt.preventDefault());

    // Наложение обработчиков на поля форм
    this._doInputsValidation(item, validateObject.inputSelector, validateObject.errorClass, validateObject.inputErrorClass);

    this._doCardValidation(
      item,
      validateObject.inputSelector,
      validateObject.submitButtonSelector,
      validateObject.inactiveButtonClass
    );
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
_doCardValidation (item, selector, btnClass, removeClass) {
  const btnForms = item.querySelector(btnClass);
  const inputs = item.querySelectorAll(selector);
  const nodesArray = Array.from(inputs);
  const checkAvailability = (elem) => elem.validity.valid;

  nodesArray.forEach((arr) => {
    arr.addEventListener("input", (evt) => {
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