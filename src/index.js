import './pages/index.css';
import { closePopup, openPopup } from './components/modal';
import { createPlaceCard } from './components/card';
import { enableValidation, resetForm, disableSubmitButton } from './components/validate';
import { getUser, getInitialCards, editUser, createCard, editAvatar, handleApiError } from './components/api';
import * as global from './components/global';

function updateProfile(user) {
  global.profileName.textContent = user.name;
  global.profileAbout.textContent = user.about;
  global.profileAvatar.src = user.avatar;
}

function openImagePopup(place) {
  global.imagePopupImage.src = place.link;
  global.imagePopupImage.alt = place.name;
  global.imagePopupImageTitle.textContent = place.name;

  openPopup(global.imagePopup);
}

function prependPlaceCard(placeCard) {
  global.placesSection.prepend(placeCard);
}

function appendPlaceCard(placeCard) {
  global.placesSection.append(placeCard);
}

function resetFormSubmitButton(button, text) {
  button.textContent = text;
}

global.profileAvatar.addEventListener('click', () => {
  resetFormSubmitButton(global.avatarEditFormSubmitButton, 'Сохранить');
  resetForm(global.avatarEditForm, global.formValidationConfig);
  disableSubmitButton(global.avatarEditForm, global.formValidationConfig);
  openPopup(global.avatarEditPopup);
});

global.avatarEditForm.addEventListener('submit', evt => {
  evt.preventDefault();

  global.avatarEditFormSubmitButton.textContent = 'Сохранение...';
  editAvatar(global.avatarEditFormUrlInput.value)
    .then(user => {
      updateProfile(user);
      closePopup(global.avatarEditPopup);
    })
    .catch(error => {
      resetFormSubmitButton(global.avatarEditFormSubmitButton, 'Сохранить');
      handleApiError(error);
    });
});

//открытие редактирования профиля
global.profileEditButton.addEventListener('click', () => {
  resetFormSubmitButton(global.profileEditFormSubmitButton, 'Сохранить');
  resetForm(global.profileEditForm, global.formValidationConfig);
  global.profileEditFormNameInput.value = global.profileName.textContent;
  global.profileEditFormAboutInput.value = global.profileAbout.textContent;
  openPopup(global.profileEditPopup);
});

//сохранение введеных данных в форму редактирования профиля
global.profileEditForm.addEventListener('submit', evt => {
  evt.preventDefault();

  global.profileEditFormSubmitButton.textContent = 'Сохранение...';
  editUser(global.profileEditFormNameInput.value, global.profileEditFormAboutInput.value)
    .then(user => {
      updateProfile(user);
      closePopup(global.profileEditPopup);
    })
    .catch(error => {
      resetFormSubmitButton(global.profileEditFormSubmitButton, 'Сохранить');
      handleApiError(error);
    });
});

//открытие формы создания места
global.placeButton.addEventListener('click', () => {
  resetFormSubmitButton(global.placeFormSubmitButton, 'Создать');
  resetForm(global.placeForm, global.formValidationConfig);
  disableSubmitButton(global.placeForm, global.formValidationConfig);
  openPopup(global.placePopup);
});

enableValidation(global.formValidationConfig);

getUser()
  .then(user => {
    updateProfile(user);

    getInitialCards()
      .then(cards => {
        cards.forEach(card => appendPlaceCard(createPlaceCard(card, global.placeTemplate, openImagePopup, user._id)));
      })
      .catch(handleApiError);

    //добавление карточки
    global.placeForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      global.placeFormSubmitButton.textContent = 'Сохранение...';
      createCard(global.placeFormNameInput.value, global.placeFormImageInput.value)
        .then(card => {
          prependPlaceCard(createPlaceCard(card, global.placeTemplate, openImagePopup, user._id));
          closePopup(global.placePopup);
        })
        .catch(error => {
          resetFormSubmitButton(global.placeFormSubmitButton, 'Создать');
          handleApiError(error);
        });
    });
  })
  .catch(handleApiError);


