const popupName = document.querySelector('.popup_name');
const editingProfile = document.querySelector('.profile__info-button');
const addingCard = document.querySelector('.profile__button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_text_name');
const jobInput = formElement.querySelector('.popup__input_text_job');
const nameInfo = document.querySelector('.profile__title');
const jobInfo = document.querySelector('.profile__subtitle');

const popupMesto = document.querySelector('.popup_mesto');
const formElementMesto = popupMesto.querySelector('.popup__form');
const mestoInput = formElementMesto.querySelector('.popup__input_text_mesto');
const linkInput = formElementMesto.querySelector('.popup__input_text_link');

const cardTemplate = document.querySelector('#card').content;
const cardsElement = document.querySelector('.cards');

const openedImage = document.querySelector('.popup_image');
const imagePreview = openedImage.querySelector('.popup__open-image');
const imageTitle = openedImage.querySelector('.popup__image-title');

const closeButtons = document.querySelectorAll('.popup__close');

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(popupName);
};

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

function insertCards(card) { //функция добавление карточки
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
 
  getCard(cardElement);

  return cardElement;
}

function renderCards(cards) { //функция добавления карточки из массива
  cards.reverse().forEach(item => {
    const newCard = insertCards(item);
    createCard(newCard);
  });
};

function addCard(evt) { //функция добавления новой карточки
  evt.preventDefault();
  const newCard = insertCards({
    name: mestoInput.value,
    link: linkInput.value
  });
  formElementMesto.reset();
  createCard(newCard);
  
  closePopup(popupMesto);
};

function createCard(card) { //функция вставки карточки
  cardsElement.prepend(card);
};

function openPopap(element) { //функция открытия popup
  element.classList.add('popup_opened');
};

function closePopup(element) { //функция закрытия popup
  element.classList.remove('popup_opened');
};

function activateLike(event) { //функция активации Like
  event.target.classList.toggle('card__button_active');
}

function deleteCard(event) { //функция удаления карточки
  event.target.closest('.card').remove();
}

function getCard(card) {
  const likeButton = card.querySelector('.card__button');// активация лайка
  likeButton.addEventListener('click', activateLike);

  const deleteButton = card.querySelector('.card__delete'); //удаление карточки
  deleteButton.addEventListener('click', deleteCard);

  const openImages = card.querySelector('.card__image'); //открытие popup "Просмотр фото"
  const openImageTitle = card.querySelector('.card__title');
  openImages.addEventListener('click', () => {
    imagePreview.src = openImages.src;
    imagePreview.alt = openImages.src;
    imageTitle.textContent = openImageTitle.textContent;
    openPopap(openedImage);
  });
};

editingProfile.addEventListener('click', () => { //открываем popup "Редактировать профиль"
  openPopap(popupName);
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
});

addingCard.addEventListener('click', () => { //открываем popup "Добавить карточку"
  openPopap(popupMesto);
});

closeButtons.forEach(item => { //закрытие popup
  const popup = item.closest('.popup');
  item.addEventListener('click', () => closePopup(popup));
});

formElement.addEventListener('submit', handleFormSubmit);
formElementMesto.addEventListener('submit', addCard);
renderCards(initialCards);
