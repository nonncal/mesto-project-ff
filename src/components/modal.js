const escHandler = (evt) => {
  if (evt.key === "Escape"){
    const popup = document.querySelector('.popup.popup_is-opened');
    if (popup) {
      closePopup(popup);
    }
  }
};

export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    };
  });
  popup.addEventListener('keydown', escHandler);
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.removeEventListener('click', () => closePopup(popup));
  popup.removeEventListener('keydown', escHandler);
};