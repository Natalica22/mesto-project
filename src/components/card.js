import { deleteCard, deleteLikeCard, handleApiError, likeCard } from "./api";

function setLikes(place, likeButton, likeCount, userId) {
  likeCount.textContent = place.likes.length;

  if (place.likes.some(userLike => userLike._id === userId)) {
    likeButton.classList.add('place__like-button_active');
  } else {
    likeButton.classList.remove('place__like-button_active');
  }
}

export function createPlaceCard(place, placeTemplate, openImagePopup, userId) {
  const placeCard = placeTemplate.querySelector('.place').cloneNode(true);
  const placeCardImage = placeCard.querySelector('.place__image');
  const placeLikeCount = placeCard.querySelector('.place__like-count');
  const deleteButton = placeCard.querySelector('.place__delete-button');
  const likeButton = placeCard.querySelector('.place__like-button');

  placeCardImage.src = place.link;
  placeCardImage.alt = place.name;

  placeCard.querySelector('.place__title').textContent = place.name;
  setLikes(place, likeButton, placeLikeCount, userId);
  //лайк карточки

  likeButton.addEventListener('click', () => {
    (likeButton.classList.contains('place__like-button_active') ? deleteLikeCard(place._id) : likeCard(place._id))
      .then(place => setLikes(place, likeButton, placeLikeCount, userId))
      .catch(handleApiError);
  });

  if (place.owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      deleteCard(place._id)
        .then(() => placeCard.remove())
        .catch(handleApiError);
    });
  } else {
    deleteButton.remove();
  }
  //открытие карточки
  placeCardImage.addEventListener('click', () => openImagePopup(place));

  return placeCard;
}
