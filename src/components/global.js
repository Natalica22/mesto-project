export const page = document.querySelector('.page');
export const content = page.querySelector('.content');

//поиск текущих значений профиля
export const profileAvatar = content.querySelector('.profile__avatar');
export const profileName = content.querySelector('.profile__name');
export const profileAbout = content.querySelector('.profile__about');

export const avatarEditPopup = page.querySelector('#avatar-popup');
export const avatarEditForm = avatarEditPopup.querySelector('.form');
export const avatarEditFormUrlInput = avatarEditForm.querySelector('input[name=avatarUrl]');
export const avatarEditFormSubmitButton = avatarEditForm.querySelector('.form__save-button');

// поиск popup для профиля
export const profileEditPopup = page.querySelector('#profile-popup');

// поиск кнопки редактирования профиля
export const profileEditButton = content.querySelector('.profile__edit-button');

//поиск формы и полей для профиля
export const profileEditForm = profileEditPopup.querySelector('.form');
export const profileEditFormNameInput = profileEditForm.querySelector('input[name=name]');
export const profileEditFormAboutInput = profileEditForm.querySelector('input[name=about]');
export const profileEditFormSubmitButton = profileEditForm.querySelector('.form__save-button');

// поиск popup места
export const placePopup = page.querySelector('#place-popup');

//поиск кнопки открытия формы добавления места
export const placeButton = content.querySelector('.profile__add-place-button');

//поиск формы создаения карточки
export const placeForm = placePopup.querySelector('.form');
export const placeFormNameInput = placeForm.querySelector('input[name=name]');
export const placeFormImageInput = placeForm.querySelector('input[name=imageUrl]');
export const placeFormSubmitButton = placeForm.querySelector('.form__save-button');

//поиск шаблона карточки места
export const placeTemplate = content.querySelector('#place').content;
export const placesSection = content.querySelector('.places');
export const imagePopup = page.querySelector('#popup-image');
export const imagePopupImage = imagePopup.querySelector('.popup__image');
export const imagePopupImageTitle = imagePopup.querySelector('.popup__image-title');

export const formValidationConfig = {
  formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__text-error_active'
};
