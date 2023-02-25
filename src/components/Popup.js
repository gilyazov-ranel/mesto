class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    };

    open() {
        document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
        this._popupSelector.classList.add('popup_opened');
    }

    close() {
        document.removeEventListener('keyup', (evt) => this._handleEscClose(evt));
        this._popupSelector.classList.remove('popup_opened');
    };

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        };
    };

    setEventListeners() {
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
                this.close();
            };
        });
    };
};

export default Popup;