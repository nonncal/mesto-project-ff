import '../pages/index.css';
import { closePopup, openPopup } from '../components/modal.js';
import { initialCards, createCard, deleteCard, setLike } from '../components/cards.js';


const cardTemplate = document.querySelector('#card-template').content;
export const cardContentTemplate = cardTemplate.querySelector('.card').cloneNode(true);
export const cardsList = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button');
const createCardButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const createCardPopup = document.querySelector('.popup_type_new-card');

const cardForm = document.forms['new-place'];
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardForm.querySelector('.popup__input_type_url');

const formElement = document.forms['edit-profile'];
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupImage = imagePopup.querySelector('.popup__image');


editProfileButton.addEventListener('click',() => {
  openPopup(editProfilePopup);
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
});

createCardButton.addEventListener('click',() => openPopup(createCardPopup));

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const name = document.querySelector('.profile__title');
  const job = document.querySelector('.profile__description');
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(editProfilePopup);
};

formElement.addEventListener('submit', handleFormSubmit);


const handleFormSubmitCard = (evt) => {
  evt.preventDefault();
  const cardContent = cardContentTemplate.cloneNode(true);
  const cardTitle = cardContent.querySelector('.card__title');
  const cardImage = cardContent.querySelector('.card__image');
  cardTitle.textContent = cardNameInput.value;
  cardImage.src = cardLinkInput.value;
  cardImage.alt = cardNameInput.value;
  cardsList.prepend(createCard(cardNameInput.value, cardLinkInput.value, deleteCard, setLike, openImagePopup));
  closePopup(createCardPopup);
};

cardForm.addEventListener('submit', handleFormSubmitCard);

const openImagePopup = (imageSrc, imageName) => {
  imagePopupImage.src = '';
  imagePopupImage.alt = '';
  imagePopupCaption.textContent = '';

  imagePopupImage.src = imageSrc;
  imagePopupImage.alt = imageName;
  imagePopupCaption.textContent = imageName;
  openPopup(imagePopup);
};

initialCards.forEach((card) => {
  cardsList.append(createCard(card.name, card.link, deleteCard, setLike, openImagePopup));
});