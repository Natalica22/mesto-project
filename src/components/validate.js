// добавление класса с ошибкой
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// удаление класса с ошибкой
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

// проверка валидности
function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputElements) {
  return Array.from(inputElements).some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// включение и выключение кнопки
function toggleButtonState(inputElements, submitButton, config) {
  if (hasInvalidInput(inputElements)) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function addValidationOnInput(formElement, inputElements, submitButton, config) {
  inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputElements, submitButton, config);
    });
  });
}

export function enableValidation(config) {
  document.querySelectorAll(config.formSelector).forEach(form => {
    const inputs = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);
    addValidationOnInput(form, inputs, submitButton, config);
  });
}

export function resetForm(form, config) {
  form.querySelectorAll(config.inputSelector).forEach(input => {
    hideInputError(form, input, config);
  });
  const submitButton = form.querySelector(config.submitButtonSelector);
  submitButton.classList.remove(config.inactiveButtonClass);
  form.reset();
}

export function validateForm(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  inputs.forEach(input => {
    checkInputValidity(form, input, config);
  });
  toggleButtonState(inputs, submitButton, config);
  return !hasInvalidInput(inputs);
}

export function disableSubmitButton(form, config) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  submitButton.classList.add(config.inactiveButtonClass);
  submitButton.disabled = true;
}
