const formAddCard = Array.from(document.querySelectorAll('.popup__form'));

class FormValidator {

  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  enableValidation() {
    this.formList = Array.from(document.querySelectorAll(this._config.formSelector));
    this.formList.forEach(() => {
      this._setEventListeners();
    });
  };

  _hideInputError(inputElement) {
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    formError.textContent = "";
    formError.classList.remove(this._config.errorClass);

  }

  _showInputError(inputElement, errrorMessage) {
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    formError.textContent = errrorMessage;
    formError.classList.add(this._config.errorClass);
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  }

  _setEventListeners() {
    this.buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this.inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this.inputList.forEach((inputElement) => {
      this._toggleButtonState();
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (!this._hasInvalidInput(this.inputList)) {
      this.buttonElement.classList.remove(this._config.inactiveButtonClass);
      this.buttonElement.removeAttribute("disabled", true);
    } else {
      this.buttonElement.classList.add(this._config.inactiveButtonClass);
      this.buttonElement.setAttribute("disabled", true);
    };
  };
};

formAddCard.forEach((item) => {

  const validatorAddCard = new FormValidator({
    formSelector: '.popup',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_type_active'
  }, item);

  validatorAddCard.enableValidation();
})

export { FormValidator };


