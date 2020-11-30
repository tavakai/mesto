const validateObj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// Очистка полей и ошибок после закрытия окон
const resetInputs = function() {
  const forms = Array.from(document.querySelectorAll(".popup__form"));
    forms.forEach((form) => {
      form.reset();
  });
  const inputsMessages = Array.from(inputsMessage);
  const inputsAllForms = Array.from(inputsForms);

  inputsMessages.forEach((mess) => {
    mess.classList.remove(validateObj["errorClass"]);
  });
  inputsAllForms.forEach((form) => {
    form.classList.remove(validateObj["inputErrorClass"]);
  });
}
// ** Показать ошибку под полем
const showErrorsText = function (inputAttribute, specialClass, inputError) {
  const visibleErrorMessage = searchErrorMessages(inputAttribute);
  visibleErrorMessage.textContent = inputAttribute.validationMessage;
  visibleErrorMessage.classList.add(specialClass);
  inputAttribute.classList.add(inputError);
};
// ** Скрыть ошибку под полем
const hideErrorsText = function (inputAttribute, specialClass, inputError) {
  const invisibleErrorMessage = searchErrorMessages(inputAttribute);
  invisibleErrorMessage.textContent = inputAttribute.validationMessage;
  invisibleErrorMessage.classList.remove(specialClass);
  inputAttribute.classList.remove(inputError);
};
// ** Поиск переменной содержащее нужное поле ошибки
function searchErrorMessages(inputAttribute) {
  const inputName = inputAttribute.getAttribute("name");
  const errorMessage = document.getElementById(`${inputName}-error`);
  return errorMessage;
}
// ** Валидация кнопки (вынесение в отдельную функцию)
const doCardValidation = function (item, selector, btnClass, removeClass) {
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
const doInputsValidation = function (
  item,
  selector,
  errorSelector,
  inputErrorClass
) {
  const inputs = item.querySelectorAll(selector);
  inputs.forEach((input) => {
    input.addEventListener("input", (evt) => {
      // ** проверка валидности введенных данных
      if (input.validity.valid) {
        // ** Скрыть ошибку под полем
        hideErrorsText(input, errorSelector, inputErrorClass);
      } else {
        // ** Показать ошибку под полем
        showErrorsText(input, errorSelector, inputErrorClass);
      }
    });
  });
};

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  // Начало процесса валидации
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    // Обработчик события для каждой формы и запрет на submit
    form.addEventListener("submit", (evt) => evt.preventDefault());

    // Наложение обработчиков на поля форм
    doInputsValidation(form, inputSelector, errorClass, inputErrorClass);

    doCardValidation(
      form,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass
    );
  });
}

enableValidation(validateObj);
