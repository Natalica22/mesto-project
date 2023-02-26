const page = document.querySelector('.page');
const content = page.querySelector('.content');

const popupTemplate = document.querySelector('#popup').content;

//создание формы popup
function createPopup(title, formName, fields) {
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);
  popup.querySelector('.popup__title').textContent = title;
  popup.querySelector('.form').name = formName;

  const formInfo = popup.querySelector('.form__info');
  fields.forEach((field) => {
    const input = document.createElement('input');
    input.type = field.type;
    input.name = field.name;
    input.placeholder = field.placeholder;
    input.classList.add('form__text');
    formInfo.append(input);
  });
  page.append(popup);
  return popup;
}

//поиск текущих значений профиля
const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');

//создание формы для профиля
const profileEditPopup = createPopup('Редактировать профиль', 'profile',
  [
    {type: 'text', name: 'name', placeholder: 'Имя'},
    {type: 'text', name: 'about', placeholder: 'О себе'}
  ]);

// поиск кнопки редактирования профиля
const profileEditButton = content.querySelector('.profile__edit-button');
//поиск кнопки закрытия popup
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__close');

//поиск формы и полей для профиля
const profileEditForm = profileEditPopup.querySelector('.form');
const profileEditFormNameInput = profileEditForm.querySelector('input[name=name]');
const profileEditFormAboutInput = profileEditForm.querySelector('input[name=about]');

//закрытие popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//открытие редактирования профиля
profileEditButton.addEventListener('click', (evt) => {
  profileEditFormNameInput.value = profileName.textContent;
  profileEditFormAboutInput.value = profileAbout.textContent;

  profileEditPopup.classList.add('popup_opened');
});

//закрытие редактирования профиля
profileEditPopupCloseButton.addEventListener('click', (evt) => closePopup(profileEditPopup));

//сохранение введеных данных в форму редактирования профиля
profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = profileEditFormNameInput.value;
  profileAbout.textContent = profileEditFormAboutInput.value;

  closePopup(profileEditPopup);
});

//создание формы добавления места
const createPlacePopup = createPopup('Новое место', 'place',
[
  {type: 'text', name: 'name', placeholder: 'Название'},
  {type: 'url', name: 'imageUrl', placeholder: 'Ссылка на картинку'}
]);

//поиск кнопки открытия формы добавления места
const createPlaceButton = content.querySelector('.profile__add-place-button');
//поиск кнопки закрытия формы добавления места
const createPlacePopupCloseButton = createPlacePopup.querySelector('.popup__close');

//поиск формы создаения карточки
const createPlaceForm = createPlacePopup.querySelector('.form');
const createPlaceFormNameInput = createPlaceForm.querySelector('input[name=name]');
const createPlaceFormImageInput = createPlaceForm.querySelector('input[name=imageUrl]');

//открытие формы создания места
createPlaceButton.addEventListener('click', (evt) => {
  //очистка полей формы
  createPlaceFormNameInput.value = '';
  createPlaceFormImageInput.value = '';

  createPlacePopup.classList.add('popup_opened');
});

//закрытие формы создания места
createPlacePopupCloseButton.addEventListener('click', (evt) => closePopup(createPlacePopup));

//создание объекта для описания места
function createPlaceObject(name, link) {
  return {
    name: name,
    link: link
  }
}

//места по умолчанию
const initialPlaces = [
  createPlaceObject('Архыз', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'),
  createPlaceObject('Челябинская область', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'),
  createPlaceObject('Иваново', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'),
  createPlaceObject('Камчатка', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'),
  createPlaceObject('Холмогорский район', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'),
  createPlaceObject('Байкал', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg')
];

//поиск шаблона карточки места
const placeTemplate = content.querySelector('#place').content;
const placesSection = content.querySelector('.places');

function createPlaceCard(place) {
  const placeCard = placeTemplate.querySelector('.place').cloneNode(true);
  const placeCardImage = placeCard.querySelector('.place__image');
  placeCardImage.src = place.link;
  placeCardImage.alt = place.name;
  placeCard.querySelector('.place__title').textContent = place.name;
//лайк карточки
  placeCard.querySelector('.place__like-button').addEventListener('click', (evt) =>
    evt.target.classList.toggle('place__like-button_active'));

  placesSection.prepend(placeCard);
}

//создание карточек на основе мест по умолчанию
initialPlaces.forEach(createPlaceCard);

//добавление карточки
createPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  createPlaceCard(
    createPlaceObject(createPlaceFormNameInput.value, createPlaceFormImageInput.value));

  closePopup(createPlacePopup);
});
