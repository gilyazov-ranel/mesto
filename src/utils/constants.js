const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupName = document.querySelector('.popup_name');
const editingProfile = document.querySelector('.profile__info-button');
const addingCard = document.querySelector('.profile__button');

const editForm = popupName.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_text_name');
const jobInput = editForm.querySelector('.popup__input_text_job');

const nameInfo = document.querySelector('.profile__title');
const jobInfo = document.querySelector('.profile__subtitle');

const openedImage = document.querySelector('.popup_image');
const imagePreview = openedImage.querySelector('.popup__open-image');
const imageTitle = openedImage.querySelector('.popup__image-title');

const popupMesto = document.querySelector('.popup_mesto');
const cardsElement = document.querySelector('.cards');

export {
  initialCards,
  popupName,
  editingProfile,
  addingCard,
  nameInput,
  jobInput,
  nameInfo,
  jobInfo,
  popupMesto,
  cardsElement,
  openedImage,
  imagePreview,
  imageTitle,
};  