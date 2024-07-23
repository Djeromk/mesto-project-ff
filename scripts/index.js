const placesList = document.querySelector(".places__list");

function deleteCard(e) {
  const card = e.target.closest("li");
  card.remove();
}

function addCard(cardData, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const removeButton = cardItem.querySelector(".card__delete-button");
  cardItem.querySelector(".card__image").setAttribute("src", cardData.link);
  cardItem.querySelector(".card__title").append(cardData.name);
  removeButton.addEventListener("click", deleteCard);
  placesList.append(cardItem);
}

initialCards.forEach((card) => addCard(card, deleteCard));

