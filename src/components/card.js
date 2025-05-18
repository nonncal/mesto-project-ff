export const createCard = ({cardName, cardLink, deleteCard, setLike, openImagePopup, cardTemplate}) => {
  
  const cardContent = cardTemplate.cloneNode(true);
  const cardTitle = cardContent.querySelector('.card__title');
  const cardImage = cardContent.querySelector('.card__image');
  const cardDeleteButton = cardContent.querySelector('.card__delete-button');
  const likeButton = cardContent.querySelector('.card__like-button');

  likeButton.addEventListener('click', () => setLike(likeButton));
  cardDeleteButton.addEventListener('click', () => deleteCard(cardContent));
  cardImage.addEventListener('click', () => openImagePopup(cardLink, cardName));
  
  cardTitle.textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  
  return cardContent;
}

export const deleteCard = (card) => {
  card.remove();
}

export const setLike = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
};