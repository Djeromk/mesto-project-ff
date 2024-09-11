const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "a3db599c-e4ce-4d85-a961-b7a4dffab843",
    "Content-Type": "application/json",
  },
};

function handleResponse(res) {
  if (res.ok) return res.json();
  else return Promise.reject(res.status);
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
}

function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
}

function patchUserProfile(user) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  })
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function patchUserAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar.link,
    }),
  }).then(handleResponse);
}

function postCard(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then(handleResponse);
}

function deleteCardById(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

export {
  getCards,
  getUser,
  patchUserProfile,
  postCard,
  deleteCardById,
  putLike,
  deleteLike,
  patchUserAvatar,
};
