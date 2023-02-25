const content = document.querySelector('.content');
const profileEditButton = content.querySelector('.profile__edit-button');

const profileEditPopup = document.querySelector('.popup');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__close');


profileEditButton.addEventListener('click', (event) => profileEditPopup.classList.add('popup_opened'));
profileEditPopupCloseButton.addEventListener('click', (event) => profileEditPopup.classList.remove('popup_opened'));
