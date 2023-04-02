const popups = document.querySelectorAll('.popup');

function closeOnClick(evt, popup) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(popup);
  }
}

function addCloseOnEsc(popup) {
  function closeOnEsc(evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
      document.removeEventListener('keydown', closeOnEsc);
    }
  }
  document.addEventListener('keydown', closeOnEsc);
}

//закрытие popup
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

export function openPopup(popup) {
  addCloseOnEsc(popup);
  popup.classList.add('popup_opened');
}

popups.forEach(popup => {
  popup.addEventListener('click', evt => closeOnClick(evt, popup));
});
