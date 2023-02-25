class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._imagePreview = this._popup.querySelector('.popup__open-image');
        this._imageTitle = this._popup.querySelector('.popup__image-title');
    };

    open() {
        document.addEventListener('keyup', this._handleEscClose);
        this._popup.classList.add('popup_opened');
    }

    close() {
        document.removeEventListener('keyup', this._handleEscClose);
        this._popup.classList.remove('popup_opened');
    };

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        };
    };

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
                this.close();
            };
        });
    };
};

export default Popup;