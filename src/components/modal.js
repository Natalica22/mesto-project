const popups = document.querySelectorAll('.popup');

function closeOnClick(evt, popup) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(popup);
  }
}

function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function addCloseOnEsc() {
  document.addEventListener('keydown', closeOnEsc);
}

//закрытие popup
export function closePopup(popup) {
  document.removeEventListener('keydown', closeOnEsc);
  popup.classList.remove('popup_opened');
}

export function openPopup(popup) {
  addCloseOnEsc();
  popup.classList.add('popup_opened');
}

popups.forEach(popup => {
  popup.addEventListener('click', evt => closeOnClick(evt, popup));
});
