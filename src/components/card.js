export const createCard = ({cardName, cardLink, cardLikes, cardId, userId, ownerId, removeCard, deleteHandler, showLike, putLike, removeLike, openImagePopup, showModal, cardTemplate}) => {
  
  const cardContent = cardTemplate.cloneNode(true);
  const cardTitle = cardContent.querySelector('.card__title');
  const cardImage = cardContent.querySelector('.card__image');
  const cardDeleteButton = cardContent.querySelector('.card__delete-button');
  const likeButton = cardContent.querySelector('.card__like-button');
  const likeCount = cardContent.querySelector('.card__like-button-count');

  likeButton.addEventListener('click', () => showLike(cardId, likeButton, putLike, removeLike, likeCount));

  if (userId === ownerId){
    cardDeleteButton.addEventListener('click', () =>  removeCard(cardContent, deleteHandler, cardId));
  } else {
    cardDeleteButton.style.display = 'none';
  };

  if (cardLikes.some((user) => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  };

  cardImage.addEventListener('click', () => openImagePopup(cardLink, cardName));
  
  cardTitle.textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  likeCount.textContent = cardLikes.length;
  return cardContent;
};

export const removeCard = (card, deleteHandler, cardId) => {
  deleteHandler(card, cardId);
};

export const showLike = (cardId, likeButton, putLike, removeLike, likeCount) => {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    removeLike(cardId).then((cardInfo) => {
      likeCount.textContent = cardInfo.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    });
  } else {
    putLike(cardId).then((cardInfo) => {
      likeCount.textContent = cardInfo.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    });
  }
};