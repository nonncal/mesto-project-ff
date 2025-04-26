// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const cardContentTemplate = cardTemplate.querySelector('.card').cloneNode(true);
const cardsList = document.querySelector('.places__list');

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
