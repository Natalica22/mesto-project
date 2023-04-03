const apiUrl = 'https://mesto.nomoreparties.co/v1/plus-cohort-22/';
const authorization = 'caf54788-8208-42fc-aa9a-a977658e0cb2';

function getApi(resource) {
  return fetch(apiUrl + resource, {
    headers: {
      authorization: authorization
    }
  })
    .then(res => res.json());
}

function callApi(resource, method, obj) {
  return fetch(apiUrl + resource, {
    method: method,
    headers: {
      authorization: authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => res.json());
}

function patchApi(resource, obj) {
  return callApi(resource, 'PATCH', obj);
}

function postApi(resource, obj) {
  return callApi(resource, 'POST', obj);
}

export function getUser() {
  return getApi('users/me');
}

export function editUser(name, about) {
  return patchApi('users/me', { 'name': name, 'about': about });
}

export function getCards() {
  return getApi('cards');
}

export function createCard(name, link) {
  return postApi('cards', { 'name': name, 'link': link });
}