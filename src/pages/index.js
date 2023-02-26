import Card from '../components/Card.js';
import {
  initialCards,
  popupName,
  editingProfile,
  addingCard,
  nameInfo,
  jobInfo,
  popupMesto,
  nameInput,
  jobInput,
  config,
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';

const validatorAddCard = new FormValidator(config, popupMesto);

validatorAddCard.enableValidation();

const validatorChangeName = new FormValidator(config, popupName);

validatorChangeName.enableValidation();

const previewPopup = new PopupWithImage('.popup_image');// Открываем popup "Просмотр изображения"
previewPopup.setEventListeners();

const eventNamePopup = new PopupWithForm('.popup_name', processProfileForm);
eventNamePopup.setEventListeners();

const eventMestoPopup = new PopupWithForm('.popup_mesto', addCard);
eventMestoPopup.setEventListeners();

const userName = new UserInfo({
  name: nameInfo,
  job: jobInfo
});

function processProfileForm(userData) {
  userName.setUserInfo(userData);
  eventNamePopup.close();
};

editingProfile.addEventListener('click', () => { //открываем popup "Редактировать профиль"
  eventNamePopup.open();
  const { name, job } = userName.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  validatorChangeName.resetValidation();
});

addingCard.addEventListener('click', () => { //открываем popup "Добавить карточку"
  eventMestoPopup.open();
  validatorAddCard.resetValidation();
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
    renderingItems.addItem(createCard(item));
  }
}, '.cards');

function addCard(item) { //функция добавления новой карточки
  const newCard = {
    name: item.formMesto,
    link: item.formLink
  };
  renderingItems.prependItem(createCard(newCard));
  eventMestoPopup.close();
};

renderingItems.renderItems();

