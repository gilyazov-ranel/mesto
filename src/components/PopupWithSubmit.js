import Popup from './Popup.js';

class PopupWithSubmit extends Popup {

    constructor(popup, submitForm) {
        super(popup);
        this._submitForm = submitForm;
        this._deletebutton = this._popup.querySelector('.popup__button-avatar');
    }

    open(card, id) {
        super.open();
        this._card = card;
        this._id = id;
    }

    setEventListeners() {
        super.setEventListeners();
        this._deletebutton.addEventListener("click", (evt) => {
            evt.preventDefault();
            this._submitForm(this._card, this._id);
            this.close();
        })
    }

}

export default PopupWithSubmit;