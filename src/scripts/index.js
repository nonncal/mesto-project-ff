import '../pages/index.css';
import { closeModal, openModal } from '../components/modal.js';
import { createCard, deleteCard, setLike } from '../components/card.js';
import { initialCards } from './cards.js';
import { enableValidation, clearValidation } from '../components/validation.js';

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

const formsList = Array.from(document.querySelectorAll('.popup__form'));

editProfileButton.addEventListener('click',() => {
  openModal(editProfilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  enableValidation(editProfilePopup);
});

createCardButton.addEventListener('click',() => {
  openModal(createCardPopup);
  enableValidation(createCardPopup);
});

const handleFormSubmitProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopup);
};

editProfileForm.addEventListener('submit', handleFormSubmitProfile);


const handleFormSubmitCard = (evt) => {
  evt.preventDefault();
  cardsList.prepend(createCard({cardName: cardNameInput.value, cardLink: cardLinkInput.value, deleteCard, setLike, openImagePopup, cardTemplate}));
  closeModal(createCardPopup);
  cardForm.reset();
};

cardForm.addEventListener('submit', handleFormSubmitCard);

const openImagePopup = (imageSrc, imageName) => {
  imagePopupImage.src = imageSrc;
  imagePopupImage.alt = imageName;
  imagePopupCaption.textContent = imageName;
  openModal(imagePopup);
};

allPopups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
      clearValidation(popup);
    };
  });
  const popupCloseButton =  popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => {
    closeModal(popup);
    clearValidation(popup);
  });
});

initialCards.forEach((card) => {
  cardsList.append(createCard({cardName: card.name, cardLink: card.link, deleteCard, setLike, openImagePopup, cardTemplate}));
});
