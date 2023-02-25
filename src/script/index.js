import Card from '../components/Card.js';
import {
  initialCards,
  popupName,
  editingProfile,
  addingCard,
  nameInfo,
  jobInfo,
  popupMesto,
  cardsElement,
  openedImage
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWidthImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';

const validatorAddCard = new FormValidator({ //валидация формы "Место"
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
}, '.popup_mesto');

validatorAddCard.enableValidation();

const validatorChangeName = new FormValidator({ //валидация формы "Имя" и "О себе"
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
}, '.popup_name');

validatorChangeName.enableValidation();

const previewPopup = new PopupWithImage(openedImage);// Открываем popup "Просмотр изображения"
previewPopup.setEventListeners();

const eventNamePopup = new PopupWithForm(popupName, processProfileForm);
eventNamePopup.setEventListeners();

const eventMestoPopup = new PopupWithForm(popupMesto, addCard);
eventMestoPopup.setEventListeners();

const userName = new UserInfo({
  name: nameInfo,
  job: jobInfo
});

function processProfileForm(items) {
  nameInfo.textContent = items.formName;
  jobInfo.textContent = items.formJob;
  eventNamePopup.close();
};

function insertCard(card) { //функция вставки карточки
  cardsElement.prepend(card);
};

editingProfile.addEventListener('click', () => { //открываем popup "Редактировать профиль"
  eventNamePopup.open();
  userName.setUserInfo();// здес техтсонтент....
});

addingCard.addEventListener('click', () => { //открываем popup "Добавить карточку"
  eventMestoPopup.open();
  validatorAddCard.inactiveButton();
});

function handleCardClick(name, link) {
  previewPopup.open(name, link);
};

function createCard(item) {
  const card = new Card(item, '#card', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
};

const renderingItems = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card', handleCardClick);
    const cardElement = card.createCard();
    renderingItems.addItem(cardElement);
  }
}, '.cards');

function addCard(item) { //функция добавления новой карточки
  const newCard = {
    name: item.formMesto,
    link: item.formLink
  };
  insertCard(createCard(newCard));
  eventMestoPopup.close();
};

renderingItems.renderItems();

