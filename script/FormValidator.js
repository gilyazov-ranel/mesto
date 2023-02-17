class FormValidator {

  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this.inputList = Array.from(document.querySelector(this._formElement).querySelectorAll(this._config.inputSelector));
    this.buttonElement = document.querySelector(this._formElement).querySelector(this._config.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  };

  _setEventListeners() {
    this._resetValidation();
  };

  _resetValidation() {
    this.inputList.forEach((inputElement) => {
      this._toggleButtonState();
      this._hideError(inputElement);
    });
  }

  _hideInputError(inputElement) {
    const formError = document.querySelector(this._formElement).querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    formError.textContent = "";
    formError.classList.remove(this._config.errorClass);
  }

  _showInputError(inputElement, errrorMessage) {
    const formError = document.querySelector(this._formElement).querySelector(`.${inputElement.id}-error`);
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

  _hideError(inputElement) {
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
      this._toggleButtonState();
    });
  }

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (!this._hasInvalidInput()) {
      this._activeButton();
    } else {
      this.inactiveButton();
    };
  };

  inactiveButton() {
    this.buttonElement.classList.add(this._config.inactiveButtonClass);
    this.buttonElement.setAttribute("disabled", true);
  }

  _activeButton() {
    this.buttonElement.classList.remove(this._config.inactiveButtonClass);
    this.buttonElement.removeAttribute("disabled", true);
  }
};




export { FormValidator };


