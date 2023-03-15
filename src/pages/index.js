import Card from '../components/Card.js';
import {
  popupName,
  editingProfile,
  addingCard,
  nameInfo,
  jobInfo,
  popupMesto,
  nameInput,
  jobInput,
  config,
  avatarImg,
  editAvatar,
  popupAvatar,
  buttonEditAvatar,
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js'
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import Api from '../components/Api.js';

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-61', '34621976-6065-469d-b8be-70c78381e0b0')

let currentUserId;

const cardContainer = new Section({
  renderer: (item) => {
    cardContainer.addItem(createCard(item));
  }
}, '.cards');

Promise.all([api.getCard(), api.getCurrentUser()])
  .then(([items, user]) => {
    currentUserId = user._id;
    userName.setUserInfo(user);
    userName.installAvatar(user);
    cardContainer.renderItems(items);
  })
  .catch((err) => {
    console.log(err);
  });

const validatorAddCard = new FormValidator(config, popupMesto);
validatorAddCard.enableValidation();

const validatorChangeName = new FormValidator(config, popupName);
validatorChangeName.enableValidation();

const validatorLinkAvatar = new FormValidator(config, popupAvatar);
validatorLinkAvatar.enableValidation();

const previewPopup = new PopupWithImage('.popup_image');// Открываем popup "Просмотр изображения"
previewPopup.setEventListeners();

const eventNamePopup = new PopupWithForm('.popup_name', processProfileForm);
eventNamePopup.setEventListeners();

const eventMestoPopup = new PopupWithForm('.popup_mesto', addCard);
eventMestoPopup.setEventListeners();

const eventAvatarPopup = new PopupWithForm('.popup_avatar', changeAvatar)
eventAvatarPopup.setEventListeners();

const userName = new UserInfo({
  name: nameInfo,
  about: jobInfo,
  avatar: avatarImg
});

function processProfileForm(user) { //функция редактирования блока "О себе"
  eventNamePopup.waitDownloads(true);
  api.editingProfiles(user).then((user) => {
    userName.setUserInfo(user);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {eventNamePopup.waitDownloads(false)})
  eventNamePopup.close();
};

function addCard(item) { //функция добавления новой карточки
  const newCard = {
    name: item.formMesto,
    link: item.formLink
  };
  eventMestoPopup.waitDownloads(true);
  api.createCard(newCard).then((item) => {
    cardContainer.prependItem(createCard(item));
  }).catch((err) => {
    console.log(err);
  })
  .finally(() => {eventMestoPopup.waitDownloads(false)});
  eventMestoPopup.close();
};

function changeAvatar(item) { //функция изменения аватарки
  eventAvatarPopup.waitDownloads(true);
  api.instalAvatar(item).then((item) => {
    userName.installAvatar(item);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {eventAvatarPopup.waitDownloads(false)});
  eventAvatarPopup.closePopupAvatar();
}

editingProfile.addEventListener('click', () => { //открываем popup "Редактировать профиль"
  eventNamePopup.open();
  const { name, about } = userName.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  validatorChangeName.resetValidation();
});

addingCard.addEventListener('click', () => { //открываем popup "Добавить карточку"
  eventMestoPopup.open();
  validatorAddCard.resetValidation();
});

buttonEditAvatar.addEventListener('click', () => { //открываем Popup "Редактирование карточки"
  eventAvatarPopup.open();
  const { avatar } = userName.linkAvatar();
  editAvatar.value = avatar;
  validatorLinkAvatar.resetValidation();
})


function createCard(item) {
  const card = new Card(
    {
      item,
      handleCardClick: (name, link) => {
        previewPopup.open(name, link);
      },
      handleLikeClick: (cardId) => {
        if (!card.checkLike()) {
          api.likeCard(cardId).then((item) => {
            card.counterLike(item.likes)
          })
          .catch((err) => {
            console.log(err);
          })
        } else if (card.checkLike()) {
          api.removeLike(cardId).then((item) => {
            card.counterLike(item.likes);
          })
          .catch((err) => {
            console.log(err);
          })
        }
      },
      deleteOpenPopup: (card, id) => {
        popupDelete.open(card, id);
      }
    },
    '#card',
    currentUserId,
  );

  const cardElement = card.createCard();

  return cardElement;
};

function deleteCard(card, id) {
  api.deleteCard(id).then(() => {
    card.remove();
  }).catch((err) => {
    console.log(err);
  });
}

const popupDelete = new PopupWithSubmit('.popup_delete', deleteCard);
popupDelete.setEventListeners();
