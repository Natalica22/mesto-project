import { deleteCard } from "./api";

export function createPlaceCard(place, placeTemplate, openImagePopup) {
  const placeCard = placeTemplate.querySelector('.place').cloneNode(true);
  const placeCardImage = placeCard.querySelector('.place__image');
  const placeLikeCount = placeCard.querySelector('.place__like-count');
  placeCardImage.src = place.link;
  placeCardImage.alt = place.name;
  placeLikeCount.textContent = place.likes.length;
  placeCard.querySelector('.place__title').textContent = place.name;
  //лайк карточки
  placeCard.querySelector('.place__like-button').addEventListener('click', (evt) =>
    evt.target.classList.toggle('place__like-button_active'));
  //удаление карточки
  placeCard.querySelector('.place__delete-button').addEventListener('click', (evt) => {
    deleteCard(place._id)
      .then(() => placeCard.remove());
  });
  //открытие карточки
  placeCardImage.addEventListener('click', () => openImagePopup(place));

  return placeCard;
}
