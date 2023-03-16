import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popup, submitForm) {
        super(popup);
        this._submitForm = submitForm;
        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._popupForm = this._popup.querySelector('.popup__form');
        this._saveButtonValue = this._popup.querySelector('.popup__button');
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
    
    resetInput() {
        this._popupForm.reset();
    };

    waitDownloads(isLoading) {
        if (isLoading) {
            this._saveButtonValue.value = "Сохранение..."
        } else if (this._popup.classList.contains('popup_mesto'))  {
            this._saveButtonValue.value = "Создать"
        } else {
            this._saveButtonValue.value = "Сохранить"
        }
        
    }


};

export default PopupWithForm;