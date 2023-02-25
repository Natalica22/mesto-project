const content = document.querySelector('.content');

const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');

const profileEditButton = content.querySelector('.profile__edit-button');

const profileEditPopup = document.querySelector('.popup');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__close');
const profileEditForm = profileEditPopup.querySelector('.form__info');
const profileEditFormNameInput = profileEditForm.querySelector('input[name=name]');
const profileEditFormAboutInput = profileEditForm.querySelector('input[name=about]');



profileEditButton.addEventListener('click', (event) => {
  profileEditFormNameInput.value = profileName.textContent;
  profileEditFormAboutInput.value = profileAbout.textContent;

  profileEditPopup.classList.add('popup_opened');
});

profileEditPopupCloseButton.addEventListener('click', (event) => profileEditPopup.classList.remove('popup_opened'));
