// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
}

const popupName = document.querySelector('.popup_name');
const popupAvatar = document.querySelector('.popup_avatar')
const editingProfile = document.querySelector('.profile__info-button');
const addingCard = document.querySelector('.profile__button');
const buttonEditAvatar = document.querySelector('.profile__shell');

const editForm = popupName.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_text_name');
const jobInput = editForm.querySelector('.popup__input_text_job');

const formAvatar = popupAvatar.querySelector('.popup__form');
const editAvatar = formAvatar.querySelector('.popup__input_text_link')

const popupMesto = document.querySelector('.popup_mesto');

export {
  popupName,
  editingProfile,
  addingCard,
  popupMesto,
  nameInput,
  jobInput,
  config,
  editAvatar,
  popupAvatar,
  buttonEditAvatar,
};  

