const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22/',
  headers: {
    authorization: 'caf54788-8208-42fc-aa9a-a977658e0cb2',
    'Content-Type': 'application/json'
  }
}

function callApi(resource, method = 'GET', obj) {
  const request = {
    method: method,
    headers: config.headers
  }
  if (obj) {
    request.body = JSON.stringify(obj);
  }
  return fetch(config.baseUrl + resource, request)
    .then(res => res.json());
}

export function getUser() {
  return callApi('users/me');
}

export function editUser(name, about) {
  return callApi('users/me', 'PATCH', { 'name': name, 'about': about });
}

export function getInitialCards() {
  return callApi('cards');
}

export function createCard(name, link) {
  return callApi('cards', 'POST', { 'name': name, 'link': link });
}

export function deleteCard(cardId) {
  return callApi('cards/' + cardId, 'DELETE');
}

export function likeCard(cardId) {
  return callApi('cards/likes/' + cardId, 'PUT');
}

export function deleteLikeCard(cardId) {
  return callApi('cards/likes/' + cardId, 'DELETE');
}

export function editAvatar(avatarUrl) {
  return callApi('users/me/avatar', 'PATCH', { 'avatar': avatarUrl });
}
