const popups = document.querySelectorAll('.popup');

function addCloseOnOverlay(popup) {
  function closeOnOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
      popup.removeEventListener('click', closeOnOverlay);
    }
  }
  popup.addEventListener('click', closeOnOverlay);
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
  addCloseOnOverlay(popup);
  popup.classList.add('popup_opened');
}

popups.forEach(popup => {
  popup.querySelector('.popup__close').addEventListener('click', (evt) =>
    closePopup(popup));
});
