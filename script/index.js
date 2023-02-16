import { Card } from './Card.js';
import { initialCards } from './constants.js';
import { FormValidator } from './FormValidator.js';

const popupName = document.querySelector('.popup_name');
const editingProfile = document.querySelector('.profile__info-button');
const addingCard = document.querySelector('.profile__button');
const editForm = popupName.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_text_name');
const jobInput = editForm.querySelector('.popup__input_text_job');
const nameInfo = document.querySelector('.profile__title');
const jobInfo = document.querySelector('.profile__subtitle');

const popupMesto = document.querySelector('.popup_mesto');
const formElementMesto = popupMesto.querySelector('.popup__form');
const mestoInput = formElementMesto.querySelector('.popup__input_text_mesto');
const linkInput = formElementMesto.querySelector('.popup__input_text_link');

const cardsElement = document.querySelector('.cards');
const storagePopups = document.querySelectorAll('.popup');

const openedImage = document.querySelector('.popup_image');
const imagePreview = openedImage.querySelector('.popup__open-image');
const imageTitle = openedImage.querySelector('.popup__image-title');

const validatorAddCard = new FormValidator({ //валидация формы "Место"
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
}, '.popup_mesto');

validatorAddCard.enableValidation();

const validatorchangeName = new FormValidator({ //валидация формы "Имя" и "О себе"
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
}, '.popup_name');

validatorchangeName.enableValidation();

function processProfileForm(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(popupName);
};

function insertCard(card) { //функция вставки карточки
  cardsElement.prepend(card);
};

function openPopup(element) { //функция открытия popup
  document.addEventListener('keyup', closePopupByEsc);
  element.classList.add('popup_opened');
  validatorAddCard.inactiveButton();
};

function closePopup(element) { //функция закрытия popup
  document.removeEventListener('keyup', closePopupByEsc);
  element.classList.remove('popup_opened');
};

editingProfile.addEventListener('click', () => { //открываем popup "Редактировать профиль"
  openPopup(popupName);
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
});

addingCard.addEventListener('click', () => { //открываем popup "Добавить карточку"
  openPopup(popupMesto);
});

storagePopups.forEach(item => { //закрытие popup
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closePopup(item);
    };
  });
});

function closePopupByEsc(evt) { //закрытие popup по клавише "Escape"
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};

function handleCardClick(name, link) {
  imagePreview.src = link;
  imagePreview.alt = name;
  imageTitle.textContent = name;
  openPopup(openedImage);
};

function createCard(item) {
  const card = new Card(item, '#card', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
};

function addCard(evt) { //функция добавления новой карточки
  evt.preventDefault();

  const newCard = {
    name: mestoInput.value,
    link: linkInput.value
  };

  formElementMesto.reset();
  insertCard(createCard(newCard));
  closePopup(popupMesto);
};

initialCards.forEach((item) => { //функция добавления карточки из массива
  cardsElement.append(createCard(item));
});

formElementMesto.addEventListener('submit', addCard);
editForm.addEventListener('submit', processProfileForm);
