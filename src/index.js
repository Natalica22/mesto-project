import './pages/index.css';
import {initialPlaces} from './places';
import { closePopup, openPopup } from './components/modal';
import { createPlaceCard } from './components/card';

const page = document.querySelector('.page');
const content = page.querySelector('.content');

//поиск текущих значений профиля
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
  if (!validateForm(profileEditForm, formValidationConfig)) {
    return false;
  }

  profileName.textContent = profileEditFormNameInput.value;
  profileAbout.textContent = profileEditFormAboutInput.value;

  closePopup(profileEditPopup);
});

//открытие формы создания места
placeButton.addEventListener('click', (evt) => {
  resetForm(placeForm, formValidationConfig);

  openPopup(placePopup);
});

//добавление карточки
placeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!validateForm(placeForm, formValidationConfig)) {
    return false;
  }

  addPlaceCard(createPlaceCard(
    {
      name: placeFormNameInput.value,
      link: placeFormImageInput.value
    }, placeTemplate, openImagePopup));

  closePopup(placePopup);
});

//создание карточек на основе мест по умолчанию
initialPlaces.map(place => createPlaceCard(place, placeTemplate, openImagePopup))
  .forEach(addPlaceCard);

// добавление класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// удаление класса с ошибкой
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// проверка валидности
const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputElements) => {
  return Array.from(inputElements).some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// включение и выключение кнопки
const toggleButtonState = (inputElements, submitButton, config) => {
  if (hasInvalidInput(inputElements)) {
    submitButton.classList.add(config.inactiveButtonClass);
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
  }
}

const addValidationOnInput = (formElement, inputElements, submitButton, config) => {
  inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputElements, submitButton, config);
    });
  });
};

function enableValidation(config) {
  document.querySelectorAll(config.formSelector).forEach(form => {
    const inputs = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);
    addValidationOnInput(form, inputs, submitButton, config);
  });
}

function resetForm(form, config) {
  form.querySelectorAll(config.inputSelector).forEach(input => {
    hideInputError(form, input, config);
  });
  const submitButton = form.querySelector(config.submitButtonSelector);
  submitButton.classList.remove(config.inactiveButtonClass);
  form.reset();
}

enableValidation(formValidationConfig);

function validateForm(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  inputs.forEach(input => {
    checkInputValidity(form, input, config);
  });
  toggleButtonState(inputs, submitButton, config);
  return !hasInvalidInput(inputs);
}
