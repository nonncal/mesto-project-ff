import '../pages/index.css';
import { closeModal, openModal } from '../components/modal.js';
import { createCard, removeCard, showLike } from '../components/card.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, deleteCard, putLike, removeLike } from '../components/api.js';

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const cardsList = document.querySelector('.places__list'); 

const editProfileButton = document.querySelector('.profile__edit-button');
const createCardButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const createCardPopup = document.querySelector('.popup_type_new-card');
const allPopups = document.querySelectorAll('.popup');

const cardForm = document.forms['new-place'];
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardForm.querySelector('.popup__input_type_url');

const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupImage = imagePopup.querySelector('.popup__image');

editProfileButton.addEventListener('click',() => {
  openModal(editProfilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfilePopup, {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
  });
});

createCardButton.addEventListener('click',() => {
  openModal(createCardPopup);
});

const handleFormSubmitProfile = (evt) => {
  evt.preventDefault();
  updateUserInfo(nameInput.value, jobInput.value).then((newUserInfo) => {
    profileName.textContent = newUserInfo.name;
    profileDescription.textContent = newUserInfo.about;
    closeModal(editProfilePopup);
  });
};

editProfileForm.addEventListener('submit', handleFormSubmitProfile);


const handleFormSubmitCard = (evt) => {
  evt.preventDefault();
  addNewCard(cardNameInput.value, cardLinkInput.value).then((newCard) => {
    cardsList.prepend(createCard({cardName: newCard.name, cardLink: newCard.link, cardLikes: newCard.likes, cardId: newCard._id, removeCard, deleteCard, showLike, putLike, removeLike, openImagePopup, cardTemplate}));
    closeModal(createCardPopup);
  });
  cardForm.reset();
  clearValidation(createCardPopup, {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
  });
};

cardForm.addEventListener('submit', handleFormSubmitCard);

const openImagePopup = (imageSrc, imageName) => {
  //@fix исправляет показ предыдущей картинки при открытии попапа
  imagePopupImage.src = '';
  imagePopupImage.alt = '';
  imagePopupImage.src = imageSrc;
  imagePopupImage.alt = imageName;
  imagePopupCaption.textContent = imageName;
  openModal(imagePopup);
};

allPopups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    };
  });
  const popupCloseButton =  popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => {
    closeModal(popup);
  });
});


Promise.all([getUserInfo(), getInitialCards()]).then(([userInfo, cards]) => {
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  cards.forEach((card) => {
    cardsList.append(createCard({cardName: card.name, cardLink: card.link, cardLikes: card.likes, cardId: card._id, userId: userInfo._id, ownerId: card.owner._id, removeCard, deleteCard, showLike, putLike, removeLike, openImagePopup, cardTemplate}));
  })
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 