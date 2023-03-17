import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popup, submitForm) {
        super(popup);
        this._submitForm = submitForm;
        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._popupForm = this._popup.querySelector('.popup__form');
        this._saveButtonValue = this._popup.querySelector('.popup__button');
        this._originalButtonName = this._saveButtonValue.value;
    };

    _getInputValues() {
        const data = {};
        this._inputs.forEach((input) => {
            data[input.name] = input.value;
        });
        return data;
    };

    setEventListeners() {
        super.setEventListeners();
        this._popupForm
            .addEventListener("submit", (evt) => {
                evt.preventDefault();
                const data = this._getInputValues();
                this._submitForm(data);
            });
    };
    
    close() {
        super.close()
        this._popupForm.reset();
    };

    waitDownloads(isLoading) {
        if (isLoading) {
            this._saveButtonValue.value = "Сохранение..."
        } else {
            this._saveButtonValue.value = this._originalButtonName;
        }
        
    }


};

export default PopupWithForm;