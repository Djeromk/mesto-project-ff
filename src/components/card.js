function createCard(cardData, cardFunctions) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const removeButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  const cardImage = cardItem.querySelector(".card__image");
  cardItem.querySelector(".card__title").textContent = cardData.name;
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;

  cardImage.addEventListener("click", cardFunctions.openImagePopup);
  removeButton.addEventListener("click", cardFunctions.deleteCard);
  likeButton.addEventListener("click", cardFunctions.likeCard);
  return cardItem;
}

function deleteCard(e) {
  const card = e.target.closest(".places__item");
  card.remove();
}

function likeCard(e) {
  e.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
