const popupName = document.querySelector('.popup_name');
const editingProfile = document.querySelector('.profile__info-button');
const addingCard = document.querySelector('.profile__button');
const popupClose = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_text_name');
const jobInput = formElement.querySelector('.popup__input_text_job');
const nameInfo = document.querySelector('.profile__title');
const jobInfo = document.querySelector('.profile__subtitle');

const popupMesto = document.querySelector('.popup_mesto');
const popupCloseMesto = popupMesto.querySelector('.popup__close');
const formElementMesto = popupMesto.querySelector('.popup__form');
const mestoInput = formElementMesto.querySelector('.popup__input_text_mesto');
const linkInput = formElementMesto.querySelector('.popup__input_text_link');

const cardTemplate = document.querySelector('#card').content;
const cardsElement = document.querySelector('.cards');

const openedImage = document.querySelector('.popup_image');
const popupCloseImage = openedImage.querySelector('.popup__close-image');

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
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

function newCardsen(card) { //функция добавление карточки
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	cardElement.querySelector('.card__image').src = card.link;
	cardElement.querySelector('.card__title').textContent = card.name;
	cardsElement.prepend(cardElement);
  
  getCard(cardElement);

  return cardElement;
  }
  
  function renderCards(cards) { //функция добавление карточки из массива
	cards.forEach(item => {
	  const newCarder = newCardsen(item);
    newCarder.name = mestoInput.value;
    newCarder.link = linkInput.value;
	  cardsElement.append(newCarder);
	});
  };

  function addCard(card) { //функция добавление новой карточки
    card.preventDefault();
    const newCard = newCardsen(card);
    newCard.querySelector('.card__title').textContent = mestoInput.value;
    newCard.querySelector('.card__image').src = linkInput.value;
    formElementMesto.reset();
    cardsElement.prepend(newCard);
    closePopup(popupMesto);
    };
    
  function openPopap(element) { //функция открытия popup
    element.classList.add('popup_opened');
  };

  function closePopup(element) { //функция закрытия popup
    element.classList.remove('popup_opened');
  };

  function activeLike(event) { //функция активации Like
    event.target.classList.toggle('card__button_active');
  }

  function deleteCard(event) { //функция удаления карточки
    event.target.closest('.card').remove();
  }

  function getCard(card) {
    const likeButton = card.querySelector('.card__button');// активация лайка
    likeButton.addEventListener('click', activeLike);

    const deleteButton = card.querySelector('.card__delete'); //удаление карточки
    deleteButton.addEventListener('click', deleteCard);

    const openImages = card.querySelector('.card__image'); //открытие popup "Просмотр фото"
    const openImageTitle = card.querySelector('.card__title'); 
    openImages.addEventListener('click',  () => { 
      openedImage.querySelector('.popup__open-image').src = openImages.src;
      openedImage.querySelector('.popup__image-title').textContent = openImageTitle.textContent;
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

  popupClose.addEventListener('click', () => { //закрываем popup "Редактировать профиль"
    closePopup(popupName);
  });

  popupCloseMesto.addEventListener('click', () => { //закрываем popup "Добавить карточку"
    closePopup(popupMesto);
  });

  popupCloseImage.addEventListener('click', () => { //закрываем popup "Просмотр картинки"
    closePopup(openedImage);
  });

  formElement.addEventListener('submit', handleFormSubmit);
  formElementMesto.addEventListener('submit', addCard);
  renderCards(initialCards);
