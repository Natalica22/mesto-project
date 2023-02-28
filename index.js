const page = document.querySelector('.page');
const content = page.querySelector('.content');

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

//поиск текущих значений профиля
const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');

// поиск popup для профиля
const profileEditPopup = page.querySelector('#profile-popup');
addCloseListener(profileEditPopup);

// поиск кнопки редактирования профиля
const profileEditButton = content.querySelector('.profile__edit-button');

//поиск формы и полей для профиля
const profileEditForm = profileEditPopup.querySelector('.form');
const profileEditFormNameInput = profileEditForm.querySelector('input[name=name]');
const profileEditFormAboutInput = profileEditForm.querySelector('input[name=about]');

//открытие редактирования профиля
profileEditButton.addEventListener('click', (evt) => {
  profileEditFormNameInput.value = profileName.textContent;
  profileEditFormAboutInput.value = profileAbout.textContent;

  openPopup(profileEditPopup);
});

//сохранение введеных данных в форму редактирования профиля
profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = profileEditFormNameInput.value;
  profileAbout.textContent = profileEditFormAboutInput.value;

  closePopup(profileEditPopup);
});

// поиск popup места
const placePopup = page.querySelector('#place-popup');
addCloseListener(placePopup);

//поиск кнопки открытия формы добавления места
const placeButton = content.querySelector('.profile__add-place-button');

//поиск формы создаения карточки
const placeForm = placePopup.querySelector('.form');
const placeFormNameInput = placeForm.querySelector('input[name=name]');
const placeFormImageInput = placeForm.querySelector('input[name=imageUrl]');

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
    createPlaceObject(placeFormNameInput.value, placeFormImageInput.value)));

  closePopup(placePopup);
});

//создание объекта для описания места
function createPlaceObject(name, link) {
  return {
    name: name,
    link: link
  }
}

//поиск шаблона карточки места
const placeTemplate = content.querySelector('#place').content;
const placesSection = content.querySelector('.places');
const imagePopup = page.querySelector('#popup-image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupImageTitle = imagePopup.querySelector('.popup__image-title');

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

//закрытие popup места
addCloseListener(imagePopup);

//места по умолчанию
const initialPlaces = [
  createPlaceObject('Архыз', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'),
  createPlaceObject('Челябинская область', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'),
  createPlaceObject('Иваново', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'),
  createPlaceObject('Камчатка', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'),
  createPlaceObject('Холмогорский район', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'),
  createPlaceObject('Байкал', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg')
];

//создание карточек на основе мест по умолчанию
initialPlaces.map(createPlaceCard).forEach(addPlaceCard);
