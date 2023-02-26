import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._imagePreview = this._popup.querySelector('.popup__open-image');
        this._imageTitle = this._popup.querySelector('.popup__image-title');
    }
    open(name, link) {
        this._imagePreview.src = link;
        this._imagePreview.alt = name;
        this._imageTitle.textContent = name;
        super.open();
    };
};

export default PopupWithImage;