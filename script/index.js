import { Card } from './Card.js';
import { initialCards } from './constants.js';
import './FormValidator.js';

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
    }
  });
});

function closePopupByEsc(evt) { //закрытие popup по клавише "Escape"
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};

function removeActiveButton(formElement) {
  const buttonElement = formElement.querySelector('.popup__button');
  buttonElement.classList.add('popup__button_inactive');
  buttonElement.setAttribute("disabled", true);
}

const addCard = (evt) => { //функция добавления новой карточки
  evt.preventDefault();

  const newCard = new Card({
    name: mestoInput.value,
    link: linkInput.value
  }, '#card');
  const cardElement = newCard.createCard();

  formElementMesto.reset();
  insertCard(cardElement);
  removeActiveButton(evt.target);
  closePopup(popupMesto);
};

initialCards.forEach((item) => { //функция добавления карточки из массива
  const card = new Card(item, '#card');
  const cardElement = card.createCard();
  document.querySelector('.cards').append(cardElement);
})

formElementMesto.addEventListener('submit', addCard);
editForm.addEventListener('submit', processProfileForm);

export { closePopupByEsc };
