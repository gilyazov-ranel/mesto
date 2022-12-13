const popup = document.querySelector('.popup');
const editingProfile = document.querySelector('.profile__info-button');
const popupClose = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__text_name');
const jobInput = formElement.querySelector('.popup__text_job');
const nameInfo = document.querySelector('.profile__title');
const jobInfo = document.querySelector('.profile__subtitle');

function editingProfileClick() {
    popup.classList.add('popup_opened');
    nameInput.value = nameInfo.textContent;
    jobInput.value = jobInfo.textContent;
};

function buttonClose() {
    popup.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameInfo.textContent = nameInput.value;
    jobInfo.textContent = jobInput.value;
    console.log(1);
    buttonClose();
};

popupClose.addEventListener('click', buttonClose);
editingProfile.addEventListener('click', editingProfileClick);
formElement.addEventListener('submit', handleFormSubmit);