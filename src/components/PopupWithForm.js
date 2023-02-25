import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popup, submitForm) {
        super(popup);
        this._submitForm = submitForm;
    };

    _getInputValues(evt) {
        evt.preventDefault();
        const data = {};
        const inputs = this._popupSelector.querySelectorAll('.popup__input');
        inputs.forEach((input) => {
            data[input.name] = input.value;
        });
        this._submitForm(data);
    };

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector
            .querySelector('.popup__form')
            .addEventListener("submit", (evt) => {
                this._getInputValues(evt);
            });
    };

    close() {
        super.close();
        this._popupSelector.querySelector('.popup__form').reset();
    };
};

export default PopupWithForm;