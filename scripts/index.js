// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsList = document.querySelector('.places__list');


const createCard = (cardName, cardLink, deleteCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardContent = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardContent.querySelector('.card__delete-button');
  cardContent.querySelector('.card__title').textContent = cardName;
  cardContent.querySelector('.card__image').src = cardLink;
  
  cardDeleteButton.addEventListener('click', () => deleteCard(cardContent));
  
  return cardContent;
}

const deleteCard = (card) => {
  cardsList.removeChild(card);
}

initialCards.forEach((card) => {
  cardsList.append(createCard(card.name, card.link, deleteCard));
});

