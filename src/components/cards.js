import { cardContentTemplate, cardsList } from "../scripts/index.js";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export const createCard = (cardName, cardLink, deleteCard, setLike, openImagePopup) => {
  
  const cardContent = cardContentTemplate.cloneNode(true);
  const cardTitle = cardContent.querySelector('.card__title');
  const cardImage = cardContent.querySelector('.card__image');
  const cardDeleteButton = cardContent.querySelector('.card__delete-button');
  const likeButton = cardContent.querySelector('.card__like-button');

  likeButton.addEventListener('click', () => setLike(cardContent));
  cardDeleteButton.addEventListener('click', () => deleteCard(cardContent));
  cardImage.addEventListener('click', () => openImagePopup(cardLink, cardName));
  
  cardTitle.textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  
  return cardContent;
}

export const deleteCard = (card) => {
  cardsList.removeChild(card);
}

export const setLike = (card) => {
  card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
};