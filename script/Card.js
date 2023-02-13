import { closePopupByEsc } from './index.js';

const openedImage = document.querySelector('.popup_image');
const imagePreview = openedImage.querySelector('.popup__open-image');
const imageTitle = openedImage.querySelector('.popup__image-title');

class Card {

    constructor(data, templateSelector) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    createCard() {
        this._element = this._getTemplate();
        this._initCardListeners();

        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__image').alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;

        return this._element;
    }


    _initCardListeners() {
        this._element.querySelector('.card__button').addEventListener('click', () => {
            this._activateLike();
        });

        this._element.querySelector('.card__delete').addEventListener('click', () => {
            this._deleteCard();
        })

        this._element.querySelector('.card__image').addEventListener('click', (item) => {
            imagePreview.src = this._element.querySelector('.card__image').src;
            imagePreview.alt = this._element.querySelector('.card__title').src;
            imageTitle.textContent = this._element.querySelector('.card__title').textContent;
            this._openPopup();
        })
    }

    _activateLike() {
        this._element.querySelector('.card__button').classList.toggle('card__button_active');
    }

    _deleteCard() {
        this._element.querySelector('.card__delete').closest('.card').remove();
    }

    _openPopup() {
        document.addEventListener('keyup', closePopupByEsc);
        openedImage.classList.add('popup_opened');
    }
}

export { Card };