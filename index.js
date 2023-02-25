const content = document.querySelector('.content');

const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');

const profileEditButton = content.querySelector('.profile__edit-button');

const profileEditPopup = document.querySelector('.popup');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__close');
const profileEditForm = profileEditPopup.querySelector('.form');
const profileEditFormNameInput = profileEditForm.querySelector('input[name=name]');
const profileEditFormAboutInput = profileEditForm.querySelector('input[name=about]');

function createPlaceObject(name, link) {
  return {
    name: name,
    link: link
  }
}

const initialPlaces = [
  createPlaceObject('Архыз', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'),
  createPlaceObject('Челябинская область', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'),
  createPlaceObject('Иваново', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'),
  createPlaceObject('Камчатка', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'),
  createPlaceObject('Холмогорский район', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'),
  createPlaceObject('Байкал', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg')
];

function closeProfileEditPopup() {
  profileEditPopup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', (evt) => {
  profileEditFormNameInput.value = profileName.textContent;
  profileEditFormAboutInput.value = profileAbout.textContent;

  profileEditPopup.classList.add('popup_opened');
});

profileEditPopupCloseButton.addEventListener('click', closeProfileEditPopup);

profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = profileEditFormNameInput.value;
  profileAbout.textContent = profileEditFormAboutInput.value;

  closeProfileEditPopup();
});

const placeTemplate = content.querySelector('#place').content;
const placesSection = content.querySelector('.places');

initialPlaces.forEach((place) => {
  const placeCard = placeTemplate.querySelector('.place').cloneNode(true);
  const placeCardImage = placeCard.querySelector('.place__image');
  placeCardImage.src = place.link;
  placeCardImage.alt = place.name;
  placeCard.querySelector('.place__title').textContent = place.name;
  placesSection.prepend(placeCard);
});
