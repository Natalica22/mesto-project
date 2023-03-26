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
const profileEditSubmitButton = profileEditForm.querySelector('.form__save-button');

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//закрытие popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function addCloseListener(popup) {
  popup.querySelector('.popup__close').addEventListener('click', (evt) => closePopup(popup));
}

function openImagePopup(place) {
  imagePopupImage.src = place.link;
  imagePopupImage.alt = place.name;
  imagePopupImageTitle.textContent = place.name;

  openPopup(imagePopup);
}

function createPlaceCard(place) {
  const placeCard = placeTemplate.querySelector('.place').cloneNode(true);
  const placeCardImage = placeCard.querySelector('.place__image');
  placeCardImage.src = place.link;
  placeCardImage.alt = place.name;
  placeCard.querySelector('.place__title').textContent = place.name;
  //лайк карточки
  placeCard.querySelector('.place__like-button').addEventListener('click', (evt) =>
    evt.target.classList.toggle('place__like-button_active'));
  //удаление карточки
  placeCard.querySelector('.place__delete-button').addEventListener('click', (evt) =>
    placeCard.remove());
  //открытие карточки
  placeCardImage.addEventListener('click', () => openImagePopup(place));

  return placeCard;
}

function addPlaceCard(placeCard) {
  placesSection.prepend(placeCard);
}

//открытие редактирования профиля
profileEditButton.addEventListener('click', (evt) => {
  profileEditFormNameInput.value = profileName.textContent;
  profileEditFormAboutInput.value = profileAbout.textContent;
  hideInputError(profileEditForm, profileEditFormNameInput);
  hideInputError(profileEditForm, profileEditFormAboutInput);
  toggleButtonState([profileEditFormNameInput, profileEditFormAboutInput], profileEditSubmitButton);
  openPopup(profileEditPopup);
});

//сохранение введеных данных в форму редактирования профиля
profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = profileEditFormNameInput.value;
  profileAbout.textContent = profileEditFormAboutInput.value;

  closePopup(profileEditPopup);
});

//открытие формы создания места
placeButton.addEventListener('click', (evt) => {
  //очистка полей формы
  placeFormNameInput.value = '';
  placeFormImageInput.value = '';

  openPopup(placePopup);
});

//добавление карточки
placeForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  addPlaceCard(createPlaceCard(
    {
      name: placeFormNameInput.value,
      link: placeFormImageInput.value
    }));

  closePopup(placePopup);
});

addCloseListener(profileEditPopup);

addCloseListener(placePopup);

//закрытие popup места
addCloseListener(imagePopup);

//создание карточек на основе мест по умолчанию
initialPlaces.map(createPlaceCard).forEach(addPlaceCard);

// добавление класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__text_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__text-error_active');
};

// удаление класса с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__text_type_error');
  errorElement.classList.remove('form__text-error_active');
  errorElement.textContent = '';
};

// проверка валидности
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputElements) => {
  return inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// включение и выключение кнопки
const toggleButtonState = (inputElements, submitButton) => {
  if (hasInvalidInput(inputElements)) {
    submitButton.classList.add('form__save-button_inactive');
  } else {
    submitButton.classList.remove('form__save-button_inactive');
  }
}

const addValidationOnInput = (formElement, inputElements, submitButton) => {
  inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputElements, submitButton);
    });
  });
};

addValidationOnInput(
  profileEditForm,
  [profileEditFormNameInput, profileEditFormAboutInput],
  profileEditSubmitButton);
