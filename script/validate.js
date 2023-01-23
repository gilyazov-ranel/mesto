enableValidation({
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
});

function showInputError(formElement, inputElement, errrorMessage, config) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  formError.textContent = errrorMessage;
  formError.classList.add(config.errorClass);
};

function hideInputError(formElement, inputElement, config) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  formError.textContent = ""
  formError.classList.remove(config.errorClass);
};

function isValid(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  };
};

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    toggleButtonState(inputList, formElement, config);
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, formElement, config);
    });
  });
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, formElement, config) {
  if (!hasInvalidInput(inputList)) {
    removeInactivaButton(formElement, config);
  } else {
    addInactiveButton(formElement, config);
  };
};

function addInactiveButton(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
};

function removeInactivaButton(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
};
