import { openModal } from "./modal";
import { deleteCardById, putLike, deleteLike } from "./api";

let cardToDeleteId = null;
let cardToDeleteElement = null;
const deleteCardPopup = document.querySelector(".popup_type_delete-card");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, cardFunctions, currentUser) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const removeButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  const likeCounter = cardItem.querySelector(".card__like-count");
  const cardImage = cardItem.querySelector(".card__image");
  cardItem.querySelector(".card__title").textContent = cardData.name;
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;
  likeCounter.classList.add("card__like-count_is-active");
  likeCounter.textContent = cardData.likes.length;
  if (cardData.likes.some((like) => like._id === currentUser._id)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  if (cardData.owner._id === currentUser._id) {
    removeButton.addEventListener("click", () => {
      cardToDeleteId = cardData._id;
      cardToDeleteElement = cardItem;
      openModal(deleteCardPopup);
    });
  } else {
    removeButton.remove();
  }
  cardImage.addEventListener("click", cardFunctions.openImagePopup);
  likeButton.addEventListener("click", (event) =>
    cardFunctions.likeCard(cardData._id, event)
  );
  return cardItem;
}

function deleteCard(cardId) {
  return deleteCardById(cardId)
    .then(() => {
      if (cardToDeleteElement) {
        cardToDeleteElement.remove();
      }
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
}

function likeCard(cardId, event) {
  const likeCounter = event.target
    .closest(".card")
    .querySelector(".card__like-count");
  if (event.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((updatedCard) => {
        event.target.classList.remove("card__like-button_is-active");
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.error("Ошибка при удалении лайка:", err);
      });
  } else {
    putLike(cardId)
      .then((updatedCard) => {
        event.target.classList.add("card__like-button_is-active");
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.error("Ошибка при добавлении лайка:", err);
      });
  }
}

export { createCard, deleteCard, likeCard, cardToDeleteId };
