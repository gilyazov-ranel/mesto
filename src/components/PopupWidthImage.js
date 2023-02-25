import Popup from './Popup.js';
import { imagePreview, imageTitle } from '../utils/constants.js';

class PopupWithImage extends Popup {
    open(name, link) {
        imagePreview.src = link;
        imagePreview.alt = name;
        imageTitle.textContent = name;
        super.open();
    };
};

export default PopupWithImage;