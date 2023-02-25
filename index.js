const content = document.querySelector('.content');
const profileEditButton = content.querySelector('.profile__edit-button');

const profileEditPopup = document.querySelector('.popup');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__close');


profileEditButton.addEventListener('click', (event) => {
  const profileName = content.querySelector('.profile__name').textContent;
  profileEditPopup.querySelector('.form__info input[name=name]').value = profileName;
  const profileAbout = content.querySelector('.profile__about').textContent;
  profileEditPopup.querySelector('.form__info input[name=about]').value = profileAbout;

  profileEditPopup.classList.add('popup_opened');
});

profileEditPopupCloseButton.addEventListener('click', (event) => profileEditPopup.classList.remove('popup_opened'));
