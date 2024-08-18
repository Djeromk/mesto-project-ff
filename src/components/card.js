function createCard(cardData, deleteCard, likeCard, openCardPopup) {
  const placesList = document.querySelector(".places__list");
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const removeButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  const cardImage = cardItem.querySelector(".card__image");

  cardItem.querySelector(".card__title").append(cardData.name);
  cardItem.querySelector(".card__image").setAttribute("src", cardData.link);

  cardImage.addEventListener("click", openCardPopup);
  removeButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCard);
  console.log(cardItem);
  return cardItem;
}

function deleteCard(e) {
  const card = e.target.closest(".places__item");
  card.remove();
}

function likeCard(e) {
  if (e.target.classList.contains("card__like-button_is-active")) {
    e.target.classList.remove("card__like-button_is-active");
  } else e.target.classList.add("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
