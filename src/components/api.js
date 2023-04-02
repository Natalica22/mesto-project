function callApi(resource) {
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-22/' + resource, {
    headers: {
      authorization: 'caf54788-8208-42fc-aa9a-a977658e0cb2'
    }
  })
    .then(res => res.json());
}

export function getUser() {
  return callApi('users/me');
}

export function getCards() {
  return callApi('cards');
}
