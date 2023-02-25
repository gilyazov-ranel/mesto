import Popup from './Popup.js';

class PopupWithImage extends Popup {
    open(name, link) {
        this._imagePreview.src = link;
        this._imagePreview.alt = name;
        this._imageTitle.textContent = name;
        super.open();
    };
};

export default PopupWithImage;