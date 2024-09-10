import { openModal, closeModal } from "./modal";
import { deleteCardById, putLike, deleteLike } from "./api";

// cardData = {
//"_id": "66da09728318c905b35f88cc",
//"name": "Пятигорск",
//"link": "https://avatars.mds.yandex.net/i?id=1b1a25f9ddaa1442b29a2fe9bea232f36f5378ed-7593536-images-thumbs&n=13",
//"owner": {
//    "name": "Olga M",
//    "about": "JS researcher",
//    "avatar": "https://static.tildacdn.com/tild3664-3638-4339-b262-613335303339/image15.png",
//    "_id": "18224dc979a1237fbf3f98ed",
//    "cohort": "wff-cohort-22"
//},
//}

function createCard(cardData, cardFunctions, currentUser) {
  const cardTemplate = document.querySelector("#card-template").content;
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
      cardFunctions.deleteCard(cardItem, cardData._id);
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

function deleteCard(cardElement, cardId) {
  const deleteCardPopup = document.querySelector(".popup_type_delete-card");
  const deleteConfirmButton = deleteCardPopup.querySelector(".button");

  function handleDeleteConfirm() {
    deleteConfirmButton.textContent = "Удаление...";
    deleteCardById(cardId)
      .then(() => {
        cardElement.remove();
        closeModal(deleteCardPopup);
        deleteConfirmButton.textContent = "Да";
      })
      .catch((err) => {
        console.error("Ошибка при удалении карточки:", err);
      })
      .finally(() => {
        deleteConfirmButton.removeEventListener("click", handleDeleteConfirm);
      });
  }

  deleteConfirmButton.addEventListener("click", handleDeleteConfirm);
  openModal(deleteCardPopup);
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

export { createCard, deleteCard, likeCard };
