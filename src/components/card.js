export function createPlaceCard(place, placeTemplate, openImagePopup) {
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
