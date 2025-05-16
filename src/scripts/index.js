import '../pages/index.css';
import { initialCards } from './cards';


const cardTemplate = document.querySelector('#card-template').content;
const cardContentTemplate = cardTemplate.querySelector('.card').cloneNode(true);
const cardsList = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const createCardButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup__close');
const editProfilePopup = document.querySelector('.popup_type_edit');
const createCardPopup = document.querySelector('.popup_type_new-card');


const createCard = (cardName, cardLink, deleteCard) => {
  
  const cardContent = cardContentTemplate.cloneNode(true);
  const cardTitle = cardContent.querySelector('.card__title');
  const cardImage = cardContent.querySelector('.card__image');
  const cardDeleteButton = cardContent.querySelector('.card__delete-button');
  
  cardDeleteButton.addEventListener('click', () => deleteCard(cardContent));
  
  cardTitle.textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  
  return cardContent;
}

const deleteCard = (card) => {
  cardsList.removeChild(card);
}

initialCards.forEach((card) => {
  cardsList.append(createCard(card.name, card.link, deleteCard));
});

const escHandler = (evt) => {
  if (evt.key === "Escape"){
    const popup = document.querySelector('.popup.popup_is-opened');
    if (popup) {
      closePopup(popup);
    }
  }
};

const openPopup = (popup) => {
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

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  popupCloseButton.removeEventListener('click', () => closePopup(popup));
  popup.removeEventListener('keydown', escHandler);
};

editProfileButton.addEventListener('click',() => openPopup(editProfilePopup));
createCardButton.addEventListener('click',() => openPopup(createCardPopup));

