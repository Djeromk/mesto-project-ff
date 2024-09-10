const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "a3db599c-e4ce-4d85-a961-b7a4dffab843",
    "Content-Type": "application/json",
  },
};

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    if (res.ok) return res.json();
    else return Promise.reject(res.status);
  });
}

function getUsers() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    if (res.ok) return res.json();
    else return Promise.reject(res.status);
  });
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(res.status);
    })
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
  }).then((res) => {
    if (res.ok) return res.json();
    else return Promise.reject(res.status);
  });
}

function postCard(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then((res) => {
    if (res.ok) return res.json();
    else return Promise.reject(res.status);
  });
}

function deleteCardById(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else return Promise.reject(res.status);
  });
}

function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) return res.json();
    else return Promise.reject(res.status);
  });
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) return res.json();
    else return Promise.reject(res.status);
  });
}

export {
  getCards,
  getUsers,
  patchUserProfile,
  postCard,
  deleteCardById,
  putLike,
  deleteLike,
  patchUserAvatar,
};
