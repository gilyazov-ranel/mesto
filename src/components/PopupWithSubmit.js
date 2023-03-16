import Popup from './Popup.js';

class PopupWithSubmit extends Popup {

    constructor(popup) {
        super(popup);
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
            this.clickButton(this._card, this._id)
        })
    }

    pressYesButton(func) {
       this.clickButton = func;
    }

}

export default PopupWithSubmit;