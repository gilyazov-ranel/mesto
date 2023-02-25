class Card {

    constructor(data, templateSelector, handleCardClick) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    };

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    };

    createCard() {
        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector('.card__image');
        this._cardTitle = this._element.querySelector('.card__title');
        this._likeButton = this._element.querySelector('.card__button');
        this._deleteButton = this._element.querySelector('.card__delete');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;

        this._initCardListeners();
        return this._element;
    };

    _initCardListeners() {
        this._likeButton.addEventListener('click', () => {
            this._activateLike();
        });

        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    };

    _activateLike() {
        this._likeButton.classList.toggle('card__button_active');
    };

    _deleteCard() {
        this._element.remove();
    };
};

export default Card;