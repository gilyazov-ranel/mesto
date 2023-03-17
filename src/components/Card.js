class Card {

    constructor({ item, handleCardClick, handleLikeClick, deleteOpenPopup }, templateSelector, currentUserId) {
        this.item = item;
        this._id = item._id;
        this._link = item.link;
        this._name = item.name;
        this._likes = item.likes;
        this._templateSelector = templateSelector;
        this._handleLikeClick = handleLikeClick;
        this._handleCardClick = handleCardClick;
        this._isOwner = item.owner._id === currentUserId;
        this._currentUserId = currentUserId
        this._deleteOpenPopup = deleteOpenPopup;
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
        this._card = this._getTemplate();

        this._cardImage = this._card.querySelector('.card__image');
        this._cardTitle = this._card.querySelector('.card__title');
        this.likeButton = this._card.querySelector('.card__button');
        this._deleteButton = this._card.querySelector('.card__delete');
        this._likeCard = this._card.querySelector('.card__counter');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;

        if (!this._isOwner) {
            this._deleteButton.remove();
        }
        
        this._displayLike();
        this.counterLike(this._likes)

        this._initCardListeners();

        return this._card;
    };

    _initCardListeners() {
        this.likeButton.addEventListener('click', () => {
            this._handleLikeClick(this._id);
        });

        this._deleteButton.addEventListener('click', () => {
            this._deleteOpenPopup(this._id)
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    };

    toggleLike() {
        this.likeButton.classList.toggle('card__button_active');
    };

    counterLike(like) {
        this._likeCard.textContent = like.length;
    }

    checkLike() {
        return this.likeButton.classList.contains('card__button_active')
    }

    _displayLike() {
         this.item.likes.forEach(element => {
            if (element._id === this._currentUserId) {
                this.likeButton.classList.add('card__button_active')
            }
        })

    };

    handleDeleteCard() {
        this._card.remove();
      }
    
}

export default Card;