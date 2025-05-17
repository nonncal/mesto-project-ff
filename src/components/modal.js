const escHandler = (evt) => {
  if (evt.key === "Escape"){
    const popup = document.querySelector('.popup.popup_is-opened');
    if (popup) {
      closeModal(popup);
    }
  }
};

export const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escHandler);
};

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escHandler);
};