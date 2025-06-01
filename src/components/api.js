const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: '73334757-50e9-4abd-ad9b-7777318a7216',
    'Content-Type': 'application/json'
  },
  handleResponse: res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  }).then(config.handleResponse)
  .catch(err => console.log(err));
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  }).then(config.handleResponse)
  .catch(err => console.log(err));
};

export const updateUserInfo = (profileName, profileDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileDescription
    })
  }).then(config.handleResponse)
  .catch(err => console.log(err));
};

export const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  }).then(config.handleResponse)
  .catch(err => console.log(err));
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method:'DELETE',
    headers: config.headers
  }).then(config.handleResponse)
  .catch(err => console.log(err));
};

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }).then(config.handleResponse)
  .catch(err => console.log(err));
};

export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(config.handleResponse)
  .catch(err => console.log(err));
};

export const updateAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  }).then(config.handleResponse)
  .catch(err => console.log(err));
};

