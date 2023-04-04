import { deleteCard } from "./api";
import { closePopup, openPopup } from "./modal";

export function createPlaceCard(place, placeTemplate, openImagePopup, userId, confirmPopup) {
  const placeCard = placeTemplate.querySelector('.place').cloneNode(true);
  const placeCardImage = placeCard.querySelector('.place__image');
  const placeLikeCount = placeCard.querySelector('.place__like-count');
  const deleteButton = placeCard.querySelector('.place__delete-button');
  placeCardImage.src = place.link;
  placeCardImage.alt = place.name;
  placeLikeCount.textContent = place.likes.length;
  placeCard.querySelector('.place__title').textContent = place.name;
  //лайк карточки
  placeCard.querySelector('.place__like-button').addEventListener('click', (evt) =>
    evt.target.classList.toggle('place__like-button_active'));
  if (place.owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      confirmPopup.querySelector('.form').addEventListener('submit', (evt) => {
        evt.preventDefault();

        deleteCard(place._id)
          .then(() => placeCard.remove())
          .then(() => closePopup(confirmPopup));
      });
      openPopup(confirmPopup);
    });
  } else {
    deleteButton.remove();
  }
  //открытие карточки
  placeCardImage.addEventListener('click', () => openImagePopup(place));

  return placeCard;
}
