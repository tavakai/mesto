const validateObj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// ** Показать ошибку под полем
const showErrorsText = function(inputAttribute,specialClass,inputError) {
    const showErrorMessage = searchErrorMessages(inputAttribute);
    showErrorMessage.textContent = inputAttribute.validationMessage;
    showErrorMessage.classList.add(specialClass);
    inputAttribute.classList.add(inputError);
}
// ** Скрыть ошибку под полем
const hideErrorsText = function(inputAttribute,specialClass,inputError) {
    const hideErrorMessage = searchErrorMessages(inputAttribute);
    hideErrorMessage.textContent = inputAttribute.validationMessage;
    hideErrorMessage.classList.remove(specialClass);
    inputAttribute.classList.remove(inputError);
}
// ** Поиск переменной содержащее нужное поле ошибки
function searchErrorMessages(inputAttribute) {
    const inputName = inputAttribute.getAttribute('name');
    const errorMessage = document.getElementById(`${inputName}-error`);
    return errorMessage;
}
// ** Валидация кнопки (вынесение в отдельную функцию)
const btnCreateCardValidation = function(item, selector, btnClass, removeClass) {
    const btnForms = item.querySelector(btnClass);
    const inputs = item.querySelectorAll(selector);
    const nodesArray = Array.from(inputs);
    const checkAvailability = (elem) => elem.validity.valid;
    
    nodesArray.forEach(arr => {
        arr.addEventListener('input', evt => {
            if (nodesArray.every(checkAvailability)) {
                btnForms.classList.remove(removeClass);
                btnForms.removeAttribute('disabled');
            } else {
                btnForms.classList.add(removeClass);
                btnForms.setAttribute('disabled', 'disabled');
            }
        })
    })
}

// Обработчики на поля форм (вынесение в отдельную функцию)
const inputsValidation = function(item, selector, errorSelector, inputErrorClass) {
    const inputs = item.querySelectorAll(selector);
        inputs.forEach(input => {
            input.addEventListener("input", evt => {
            // ** проверка валидности введенных данных
            if (input.validity.valid) {
                // ** Скрыть ошибку под полем
                hideErrorsText(input, errorSelector, inputErrorClass);
            } else {
                // ** Показать ошибку под полем
                showErrorsText(input, errorSelector, inputErrorClass);
            }
            })
        })
}

function enableValidation({formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass}) {
        // Начало процесса валидации
        const forms = Array.from(document.querySelectorAll(formSelector));
        forms.forEach(form => {
            // Обработчик события для каждой формы и запрет на submit
            form.addEventListener("submit", evt => evt.preventDefault());
            
            // Наложение обработчиков на поля форм
            inputsValidation(form, inputSelector, errorClass, inputErrorClass);
           
            btnCreateCardValidation(form, inputSelector, submitButtonSelector, inactiveButtonClass)
        });
        
}

enableValidation(validateObj);