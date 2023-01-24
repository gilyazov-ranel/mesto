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

const cardTemplate = document.querySelector('#card').content;
const cardsElement = document.querySelector('.cards');

const openedImage = document.querySelector('.popup_image');
const imagePreview = openedImage.querySelector('.popup__open-image');
const imageTitle = openedImage.querySelector('.popup__image-title');

const storagePopups = document.querySelectorAll('.popup');

function processProfileForm(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(popupName);
};

function createCard(card) { //функция добавление карточки
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  initCardListeners(cardElement);

  return cardElement;
}

function renderCards(cards) { //функция добавления карточки из массива
  cards.reverse().forEach(item => {
    const newCard = createCard(item);
    insertCard(newCard);
  });
};

function addCard(evt) { //функция добавления новой карточки
  evt.preventDefault();
  const newCard = createCard({
    name: mestoInput.value,
    link: linkInput.value
  });
  formElementMesto.reset();
  insertCard(newCard);
  removeActiveButton(evt.target);
  closePopup(popupMesto);
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

function activateLike(event) { //функция активации Like
  event.target.classList.toggle('card__button_active');
}

function deleteCard(event) { //функция удаления карточки
  event.target.closest('.card').remove();
}

function initCardListeners(card) {
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
    openPopup(openedImage);
  });
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

editForm.addEventListener('submit', processProfileForm);
formElementMesto.addEventListener('submit', addCard);
renderCards(initialCards);

function removeActiveButton(formElement) {
  const buttonElement = formElement.querySelector('.popup__button');
  buttonElement.classList.add('popup__button_inactive');
  buttonElement.setAttribute("disabled", true);
}