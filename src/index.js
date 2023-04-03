import './pages/index.css';
import { closePopup, openPopup } from './components/modal';
import { createPlaceCard } from './components/card';
import { enableValidation, resetForm, validateForm, disableSubmitButton } from './components/validate';
import { getUser, getCards, editUser } from './components/api';

const page = document.querySelector('.page');
const content = page.querySelector('.content');

//поиск текущих значений профиля
const profileAvatar = content.querySelector('.profile__avatar');
const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');

// поиск popup для профиля
const profileEditPopup = page.querySelector('#profile-popup');

// поиск кнопки редактирования профиля
const profileEditButton = content.querySelector('.profile__edit-button');

//поиск формы и полей для профиля
const profileEditForm = profileEditPopup.querySelector('.form');
const profileEditFormNameInput = profileEditForm.querySelector('input[name=name]');
const profileEditFormAboutInput = profileEditForm.querySelector('input[name=about]');

// поиск popup места
const placePopup = page.querySelector('#place-popup');

//поиск кнопки открытия формы добавления места
const placeButton = content.querySelector('.profile__add-place-button');

//поиск формы создаения карточки
const placeForm = placePopup.querySelector('.form');
const placeFormNameInput = placeForm.querySelector('input[name=name]');
const placeFormImageInput = placeForm.querySelector('input[name=imageUrl]');

//поиск шаблона карточки места
const placeTemplate = content.querySelector('#place').content;
const placesSection = content.querySelector('.places');
const imagePopup = page.querySelector('#popup-image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupImageTitle = imagePopup.querySelector('.popup__image-title');

const formValidationConfig = {
  formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__text-error_active'
};

function openImagePopup(place) {
  imagePopupImage.src = place.link;
  imagePopupImage.alt = place.name;
  imagePopupImageTitle.textContent = place.name;

  openPopup(imagePopup);
}

function addPlaceCard(placeCard) {
  placesSection.prepend(placeCard);
}

//открытие редактирования профиля
profileEditButton.addEventListener('click', (evt) => {
  resetForm(profileEditForm, formValidationConfig);
  profileEditFormNameInput.value = profileName.textContent;
  profileEditFormAboutInput.value = profileAbout.textContent;
  openPopup(profileEditPopup);
});

//сохранение введеных данных в форму редактирования профиля
profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  editUser(profileEditFormNameInput.value, profileEditFormAboutInput.value)
    .then(user => {
      profileName.textContent = user.name;
      profileAbout.textContent = user.about;
      closePopup(profileEditPopup);
    });
});

//открытие формы создания места
placeButton.addEventListener('click', (evt) => {
  resetForm(placeForm, formValidationConfig);
  disableSubmitButton(placeForm, formValidationConfig);
  openPopup(placePopup);
});

//добавление карточки
placeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  addPlaceCard(createPlaceCard(
    {
      name: placeFormNameInput.value,
      link: placeFormImageInput.value
    }, placeTemplate, openImagePopup));

  closePopup(placePopup);
});

enableValidation(formValidationConfig);

getUser()
  .then(user => {
    profileName.textContent = user.name;
    profileAbout.textContent = user.about;
    profileAvatar.src = user.avatar;
  });

//создание карточек на основе мест по умолчанию
getCards()
  .then(cards => {
    cards.map(card => createPlaceCard(card, placeTemplate, openImagePopup))
      .forEach(addPlaceCard);
  });
