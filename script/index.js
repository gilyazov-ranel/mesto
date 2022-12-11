let popupOpened = document.querySelector('.popup');
let editingProfile = document.querySelector('.info__button');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container')
let nameInput = popupOpened.querySelector('.popup__name');
let jobInput = popupOpened.querySelector('.popup__job');
let buttonSave = document.querySelector('.popup__button');
let nameInfo = document.querySelector('.info__title');
let jobInfo = document.querySelector('.info__subtitle');

function editingProfileClick() {
    popupOpened.classList.add('popup__opened');
};

function buttonClick() {
    popupOpened.classList.remove('popup__opened');
    function handleFormSubmit(evt) {
        evt.preventDefault();
        nameInfo.textContent = nameInput.value;
        jobInfo.textContent = jobInput.value;
    };
    formElement.addEventListener('submit', handleFormSubmit);
};

function buttonCloseClick(e) {
    e.preventDefault();
    popupOpened.classList.remove('popup__opened');
    nameInput.value = nameInfo.textContent;
    jobInput.value = jobInfo.textContent;
};

buttonSave.addEventListener('click', buttonClick);
popupClose.addEventListener('click', buttonCloseClick);
editingProfile.addEventListener('click', editingProfileClick);
